import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Alert,
    Image,
    ToastAndroid,
    ActivityIndicator,
    TextInput
} from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING, FIELD_BACK_COLOR, GRAY_COLOR, LOADING_GRAY_COLOR } from '../../../Global';
import { Text, Icon, Input, Button, Modal, Select, IndexPath, SelectItem } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import { addFarmer, getFarmerById, updateFarmerById, uploadPicture } from '../../services/FarmerApi';
import { Image as Compressor } from 'react-native-compressor';
import CustomImageViewer from '../../components/ImageViewer';

class AddPartyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            fatherName: '',
            cnic: '',
            contact: '',
            address: '',
            desc: '',
            keyboardSize: 0,
            contactError1: false,
            cnicError1: false,
            fNameError: false,
            lNameError: false,
            cnicError: false,
            contactError: false,
            addressError: false,
            docImageError: false,
            images: [],
            docImages: [],
            loading: false,
            chr: 13,
            sImage: [],
            imageModalVisible: false,
            data: [
                { id: 1, val: 'Form 7' },
                { id: 2, val: 'Passbook' },
                { id: 3, val: 'Dhal Receipt' },
                { id: 4, val: 'Partal Report' },
                { id: 5, val: 'Others' },
            ],
            selectedIndex: new IndexPath(0),
            selectId: 1,
        }
    }

    componentDidMount() {
        const { farmerId } = this.props;
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({ keyboardSize: e.endCoordinates.height })
        })

        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({ keyboardSize: e.endCoordinates.height })
        })
        if (farmerId) {
            this.getFarmerDetails();
        }
    }

    componentWillUnmount() {
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
    }

    askFromWhereToPickImage = (addTo) => {
        Alert.alert(
            'Select image from',
            '',
            [
                { text: 'Gallery', onPress: () => this.pickImage('GALLERY', addTo) },
                { text: 'Camera', onPress: () => this.pickImage('CAMERA', addTo) },
            ],
            { cancelable: true },
        );
    };

    pickImage = async (location, addTo) => {
        if (location === 'GALLERY') {
            ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo',
                cropping: true,
                freeStyleCropEnabled: true
            })
                .then(async (image) => {
                    const compressedUri = await Compressor.compress(image.path, {
                        compressionMethod: 'auto',
                    });
                    // console.log('Selected Image: ', image);
                    // console.log('Compression: ', compressedUri);
                    const imageObj = {
                        uri: compressedUri,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    if (addTo === 'images') {
                        this.setState({ images: [...this.state.images, imageObj] })
                    }
                    else if (addTo === 'docImages') {
                        this.setState({ docImages: [...this.state.docImages, imageObj] })
                    }
                })
                .catch((e) => console.log(e));
        } else if (location === 'CAMERA') {
            ImagePicker.openCamera({
                multiple: false,
                mediaType: 'photo',
                cropping: true,
                freeStyleCropEnabled: true
            })
                .then(async (image) => {
                    const compressedUri = await Compressor.compress(image.path, {
                        compressionMethod: 'auto',
                    });
                    // console.log('Selected Image: ', image);
                    // console.log('Compression: ', compressedUri);
                    const imageObj = {
                        uri: compressedUri,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    if (addTo === 'images') {
                        this.setState({ images: [...this.state.images, imageObj] })
                    }
                    else if (addTo === 'docImages') {
                        this.setState({ docImages: [...this.state.docImages, imageObj] })
                    }
                })
                .catch((e) => console.log(e));
        }
    };

    checkPhoneRegex(val) {
        const regex = RegExp(/^(3)([0-9]{9})$/gm);
        var value = val.replace(/[^0-9]+/g, '')
        this.setState({
            contact: value
        },
            () => {
                const result = regex.test(value);
                result ? this.setState({ contactError1: false }) : this.setState({ contactError1: true })
            }
        )
    }

    formateCNIC(val) {
        const regex = RegExp(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
        var val1 = val.replace(/[^0-9]+/g, '')
        var value = val1.replace(/^(\d{5})(\d{7})(\d{1}).*/, '$1-$2-$3')
        this.setState({ cnic: value },
            () => {
                const result = regex.test(value);
                result ? this.setState({ cnicError1: false, chr: 15 }) : this.setState({ cnicError1: true, chr: 13 })
            }
        )
    }

    getFarmerDetails() {
        const { farmerId } = this.props;
        this.setState({ loading: true })
        getFarmerById(farmerId)
            .then((res) => {
                if (res.success) {
                    // console.log('RES: ', res.data)
                    this.setState({
                        name: res.data.name,
                        fatherName: res.data.fatherName,
                        cnic: res.data.cnic,
                        contact: res.data.phone,
                        address: res.data.address,
                        desc: res.data.description,
                        images: [res.data.avatar],
                        docImages: [res.data.document],
                        selectId: res.data.documentId,
                        selectedIndex: new IndexPath(res.data.documentId - 1),
                        chr: 15
                    })
                    this.setState({ loading: false })
                }
                else {
                    // ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({ loading: false })
                }
                // this.setState({farmerDetails: res})
            }).catch((err) => {
                console.log('[ERR]: ', err)
                this.setState({ loading: false })
            })
    }

    validateForm() {
        const { name, fatherName, cnic, contact, address, docImages } = this.state
        if (name && fatherName && cnic && contact && address && docImages.length > 0) {
            this.setState({
                fNameError: false,
                lNameError: false,
                cnicError: false,
                contactError: false,
                addressError: false,
                docImageError: false
            })
            return true
        }
        else {
            if (!name) {
                this.setState({ fNameError: true })
            }
            else {
                this.setState({ fNameError: false })
            }
            if (!fatherName) {
                this.setState({ lNameError: true })
            }
            else {
                this.setState({ lNameError: false })
            }
            if (!cnic) {
                this.setState({ cnicError: true })
            }
            else {
                this.setState({ cnicError: false })
            }
            if (!contact) {
                this.setState({ contactError: true })
            }
            if (!address) {
                this.setState({ addressError: true })
            }
            else {
                this.setState({ addressError: false })
            }
            if (docImages.length == 0) {
                this.setState({ docImageError: true })
            }
            else {
                this.setState({ docImageError: false })
            }
        }
    }

    addNewFarmer() {
        const { toggleModal } = this.props;
        const { name, fatherName, cnic, contact, address, desc, images, docImages, selectId } = this.state;
        // console.log('Images: ', images);
        // console.log('Doc Images: ', docImages)
        // console.log('All Images: ', allImages)
        const validateForm = this.validateForm();
        if (validateForm) {
            this.setState({ loading: true })
            if (images.length > 0) {
                const allImages = [images[0], docImages[0]]
                uploadPicture(allImages)
                    .then((res) => {
                        if (res.success) {
                            ToastAndroid.show(res.message, ToastAndroid.LONG)
                            console.log('ID: ', res.data)
                            addFarmer(name, fatherName, cnic, contact, address, desc, res.data[0].id, res.data[1].id, selectId)
                                .then((res) => {
                                    if (res.success) {
                                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                                        this.setState({ loading: false })
                                        toggleModal();
                                    }
                                    else {
                                        this.setState({ loading: false })
                                    }
                                })
                                .catch((err) => {
                                    console.log('[ERR]: ', err)
                                    this.setState({ loading: false })
                                })
                        }
                        else {
                            this.setState({ loading: false })
                        }
                    })
                    .catch((err) => {
                        console.log('[ERR]: ', err)
                    })
            }
            else {
                uploadPicture(docImages)
                    .then((res) => {
                        if (res.success) {
                            ToastAndroid.show(res.message, ToastAndroid.LONG)
                            console.log('ID: ', res.data)
                            addFarmer(name, fatherName, cnic, contact, address, desc, null, res.data[0].id, selectId)
                                .then((res) => {
                                    if (res.success) {
                                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                                        this.setState({ loading: false })
                                        toggleModal();
                                    }
                                    else {
                                        this.setState({ loading: false })
                                    }
                                })
                                .catch((err) => {
                                    console.log('[ERR]: ', err)
                                    this.setState({ loading: false })
                                })
                        }
                        else {
                            this.setState({ loading: false })
                        }
                    })
                    .catch((err) => {
                        console.log('[ERR]: ', err)
                    })
            }
        }
    }

    updateFarmer() {
        const { toggleModal, farmerId } = this.props;
        const { name, fatherName, cnic, contact, address, desc, selectId } = this.state;
        // console.log('ID BATAUN..? ', selectedId)
        const validateForm = this.validateForm();
        if (validateForm) {
            this.setState({ loading: true })
            updateFarmerById(farmerId, name, fatherName, cnic, contact, address, desc, selectId)
                .then((res) => {
                    if (res.success) {
                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                        this.setState({ loading: false })
                        toggleModal();
                    }
                    else {
                        // ToastAndroid.show(res.message, ToastAndroid.LONG)
                        this.setState({ loading: false })
                    }
                })
                .catch((err) => {
                    console.log('[ERR]: ', err)
                })
        }
    }

    toggleImageModal = (sImage) => {
        const { imageModalVisible } = this.state;
        this.setState({
            imageModalVisible: !imageModalVisible,
            sImage: sImage
        },
            () => console.log('Image: ', sImage)
        )
    }

    displayValue = () => {
        const { selectedIndex, data } = this.state;
        return (
            <Text>{data[selectedIndex.row].val}</Text>
        )
    }


    renderSelectOption = (options) => (
        <SelectItem key={options.id} title={options.val} />
    );

    render() {
        const { visible, toggleModal, type, farmerId } = this.props;
        const {
            name,
            fatherName,
            cnic,
            contact,
            address,
            desc,
            keyboardSize,
            images,
            docImages,
            loading,
            fNameError,
            lNameError,
            cnicError1,
            contactError1,
            addressError,
            cnicError,
            contactError,
            docImageError,
            chr,
            imageModalVisible,
            selectedIndex,
            sImage,
            data,
        } = this.state;
        return (
            <>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <Modal
                        backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
                        visible={visible}
                    >
                        <View style={styles.centeredView}>
                            <View style={[styles.modalView, { marginBottom: keyboardSize + 50 }]}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={toggleModal}
                                >
                                    <Icon
                                        style={{
                                            width: 30,
                                            height: 30
                                        }}
                                        fill={BACK_COLOR}
                                        name='close-outline'
                                    />
                                </TouchableOpacity>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.modalHeader}>{farmerId ? 'Edit' : 'Add'} Farmer</Text>
                                </View>
                                <ScrollView>
                                    {
                                        (images.length > 0 && images[0] != null) ?
                                            <Images image={images[0]} toggle={this.toggleImageModal} />
                                            :
                                            <TouchableOpacity
                                                style={styles.uploadBtn}
                                                onPress={() => this.askFromWhereToPickImage('images')}
                                            >
                                                <Icon
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        margin: 5
                                                    }}
                                                    fill={BASE_COLOR}
                                                    name='plus-circle-outline'
                                                />
                                                <Text style={[styles.lableStyle, { marginTop: 0, marginBottom: 5 }]}>Upload Profile Picture</Text>
                                            </TouchableOpacity>
                                    }
                                    <Input
                                        defaultValue={name}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Full Name</Text>
                                            )
                                        }}
                                        caption={() => (
                                            fNameError ?
                                                <Text style={styles.captionText}>Full Name Required</Text>
                                                : null
                                        )}
                                        maxLength={25}
                                        placeholder='Enter Full Name'
                                        onChangeText={nextValue => this.setState({ name: nextValue })}
                                    />
                                    <Input
                                        defaultValue={fatherName}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Father's Name</Text>
                                            )
                                        }}
                                        caption={() => (
                                            lNameError ?
                                                <Text style={styles.captionText}>Father's Name Required</Text>
                                                : null
                                        )}
                                        maxLength={25}
                                        placeholder="Enter Father's Name"
                                        onChangeText={nextValue => this.setState({ fatherName: nextValue })}
                                    />
                                    <Input
                                        value={cnic}
                                        defaultValue={cnic}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>CNIC</Text>
                                            )
                                        }}
                                        placeholder='XXXXX-XXXXXXX-X'
                                        keyboardType='number-pad'
                                        maxLength={chr}
                                        caption={() => (
                                            cnicError ?
                                                (<Text style={styles.captionText}>CNIC Required</Text>) :
                                                cnicError1 ?
                                                    <>
                                                        <Text style={styles.captionText}>Insert without '-'{'\n'}Should contain 13 numbers</Text>
                                                    </>
                                                    : null
                                        )}
                                        onChangeText={nextValue => this.formateCNIC(nextValue)}
                                    />
                                    <Input
                                        value={contact}
                                        defaultValue={contact}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Contact No</Text>
                                            )
                                        }}
                                        placeholder='3XX-XXXXXXX'
                                        keyboardType='number-pad'
                                        maxLength={10}
                                        accessoryLeft={() => (
                                            <Text>+92</Text>
                                        )}
                                        caption={() => (
                                            contactError ?
                                                (<Text style={styles.captionText}>Contact No Required</Text>) :
                                                contactError1 ?
                                                    <Text style={styles.captionText}>Should start with 3 and contain 10 numbers</Text>
                                                    : null
                                        )}
                                        onChangeText={nextValue => {
                                            this.checkPhoneRegex(nextValue)
                                        }
                                        }
                                    />
                                    <Input
                                        defaultValue={address}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Address</Text>
                                            )
                                        }}
                                        placeholder='Enter Address'
                                        maxLength={150}
                                        caption={() => (
                                            addressError ?
                                                <Text style={styles.captionText}>Address Required</Text>
                                                : null
                                        )}
                                        onChangeText={nextValue => this.setState({ address: nextValue })}
                                    />
                                    <Select
                                        style={styles.select}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Other Documents</Text>
                                            )
                                        }}
                                        placeholder='Default'
                                        value={this.displayValue}
                                        selectedIndex={selectedIndex}
                                        onSelect={index => this.setState({
                                            selectedIndex: index,
                                            selectId: index.row + 1,
                                        }, () => console.log('ID: ', this.state.selectId))}>
                                        {data.map(this.renderSelectOption)}
                                    </Select>
                                    {
                                        (docImages.length > 0 && docImages[0] != null) ?
                                            <Images image={docImages[0]} toggle={this.toggleImageModal} />
                                            :
                                            <TouchableOpacity
                                                style={styles.uploadBtn}
                                                onPress={() => this.askFromWhereToPickImage('docImages')}
                                            >
                                                <Icon
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        margin: 5
                                                    }}
                                                    fill={BASE_COLOR}
                                                    name='plus-circle-outline'
                                                />
                                                <Text style={[styles.lableStyle, { marginTop: 0, marginBottom: 5 }]}>Upload Document Picture</Text>
                                            </TouchableOpacity>
                                    }
                                    {
                                        docImageError ?
                                            <Text style={styles.captionText}>Document Image Required</Text> :
                                            null
                                    }
                                    <Input
                                        defaultValue={desc}
                                        label={() => {
                                            return (
                                                <Text style={styles.lableStyle}>Description</Text>
                                            )
                                        }}
                                        multiline={true}
                                        textStyle={{ minHeight: 65, maxHeight: 65 }}
                                        placeholder='Description'
                                        maxLength={150}
                                        onChangeText={nextValue => this.setState({ desc: nextValue })}
                                    />
                                </ScrollView>
                                <TouchableOpacity style={{
                                    borderRadius: 50,
                                    backgroundColor: BASE_COLOR,
                                    width: '100%',
                                    height: '10%',
                                    marginTop: '5%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                    onPress={() => {
                                        farmerId ?
                                            this.updateFarmer() :
                                            this.addNewFarmer()
                                    }}
                                >
                                    <Text style={{ color: 'white' }}>{farmerId ? 'Update' : 'Add'}</Text>
                                </TouchableOpacity>
                                {
                                    loading ?
                                        <View style={
                                            [
                                                {
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: LOADING_GRAY_COLOR,
                                                    borderRadius: 20
                                                },
                                                StyleSheet.absoluteFill
                                            ]}>
                                            <ActivityIndicator size='large' color='white' />
                                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Please Wait...</Text>
                                        </View> :
                                        null
                                }
                            </View>
                        </View>
                        {

                            (imageModalVisible &&
                                <CustomImageViewer
                                    image={sImage}
                                    visible={true}
                                    closeModal={this.toggleImageModal}
                                />
                            )
                        }
                    </Modal>
                </KeyboardAvoidingView>
            </>
        )
    }
}


const Images = ({ image, toggle }) => {
    // console.log('Image: ', image)
    const currentImage = !image.uri ? { uri: image } : image
    return (
        <TouchableOpacity
            style={{ flex: 1, backgroundColor: FIELD_BACK_COLOR }}
            onPress={() => toggle(currentImage)}
        >
            <Image
                style={styles.image}
                source={{ uri: currentImage.uri }}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    modalView: {
        margin: 15,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BASE_COLOR,
        padding: 20,
        width: 350,
        // maxHeight: "90%"
        height: 450
    },
    modalHeader: {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: BASE_COLOR
    },
    closeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BASE_COLOR,
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: BASE_COLOR,
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 1
    },
    lableStyle: {
        color: BASE_COLOR,
        fontWeight: 'bold',
        marginTop: '5%',
        fontSize: DEAFULT_FONT_SIZE
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "red",
    },
    uploadBtn: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: BASE_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: FIELD_BACK_COLOR,
        marginTop: '5%',
    },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
})

export default AddPartyModal;