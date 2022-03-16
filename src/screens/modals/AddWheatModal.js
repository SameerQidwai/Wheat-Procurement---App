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
    ActivityIndicator
} from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, FIELD_BACK_COLOR, MAIN_HEADING, LOADING_GRAY_COLOR } from '../../../Global';
import { Text, Icon, Input, Button, Autocomplete, AutocompleteItem, Modal } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import {
    searchFarmerCnic,
} from '../../services/BardanaApi';
import { addProcureWheat, getWheatRecordById, updateWheatRecord } from '../../services/WheatApi';
import { uploadPicture } from '../../services/FarmerApi';
import { Image as Compressor } from 'react-native-compressor';
import CustomImageViewer from '../../components/ImageViewer';
class AddWheatModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardSize: 0,
            farmers: [],
            fFarmers: [],
            sFarmer: null,
            sFarmerName: '',
            sFarmerId: '',
            netWeight: '',
            pp: '',
            jute: '',
            billNo: '',
            billId: '',
            images: [],
            loading: false,
            farmerError: false,
            netWeightError: false,
            ppError: false,
            juteError: false,
            billNoError: false,
            billImageError: false,
            imageModalVisible: false
        }
    }

    componentDidMount() {
        const { recordId } = this.props
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({ keyboardSize: e.endCoordinates.height })
        });

        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({ keyboardSize: e.endCoordinates.height })
        });
        if (recordId) {
            this.getRecordById(recordId)
        }
    }

    componentWillUnmount() {
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
    }

    askFromWhereToPickImage = () => {
        Alert.alert(
            'Select image from',
            '',
            [
                { text: 'Gallery', onPress: () => this.pickImage('GALLERY') },
                { text: 'Camera', onPress: () => this.pickImage('CAMERA') },
            ],
            { cancelable: true },
        );
    };

    pickImage = async (location) => {
        if (location === 'GALLERY') {
            ImagePicker.openPicker({
                multiple: false,
                mediaType: 'photo',
            })
                .then(async (image) => {
                    // console.log('Selected Image: ', image);
                    const compressedUri = await Compressor.compress(image.path, {
                        compressionMethod: 'auto',
                    });
                    const imageObj = {
                        uri: compressedUri,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    this.setState({ images: [...this.state.images, imageObj] }
                    )
                })
                .catch((e) => console.log(e));
        } else if (location === 'CAMERA') {
            ImagePicker.openCamera({
                multiple: false,
                mediaType: 'photo',
            })
                .then(async (image) => {
                    // console.log('Selected Image: ', image);
                    const compressedUri = await Compressor.compress(image.path, {
                        compressionMethod: 'auto',
                    });
                    const imageObj = {
                        uri: compressedUri,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    this.setState({ images: [...this.state.images, imageObj] }
                    )
                })
                .catch((e) => console.log(e));
        }
    };

    onSelect = (index) => {
        const { fFarmers } = this.state;
        this.setState({
            sFarmer: fFarmers[index].cnic,
            sFarmerName: fFarmers[index].name,
            sFarmerId: fFarmers[index].id
        })
    };

    onChangeText = (query) => {
        this.setState({
            sFarmer: query,
            sFarmerId: ''
        })
        if (query.length > 3) {
            searchFarmerCnic(query)
                .then((res) => {
                    // console.log('[RES]: ', res.data)
                    this.setState({ fFarmers: res.data, sFarmerName: '' })
                })
        }
        else {
            this.setState({ fFarmers: [], sFarmerName: '' })
        }
    };

    renderOption = (item, index) => (
        <AutocompleteItem
            style={{ backgroundColor: '#dadce6' }}
            key={index + ''}
            title={() => (
                <View style={{ borderBottomWidth: 0.5, borderColor: BASE_COLOR }}>
                    <Text >{item.name}</Text>
                    <Text style={{ fontSize: 10 }}>{item.cnic}</Text>
                </View>
            )}
        />
    );

    addWheatProcure() {
        const { toggleModal } = this.props
        const { sFarmerId, pp, jute, netWeight, billNo, images } = this.state
        const validateForm = this.validateForm()
        if (validateForm) {
            this.setState({ loading: true })
            uploadPicture(images)
                .then((res) => {
                    if (res.success) {
                        console.log('ADD ID: ', res.data[0].id)
                        addProcureWheat(sFarmerId, pp, jute, netWeight, billNo, res.data[0].id)
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
                            })
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
    }

    getRecordById(id) {
        this.setState({ loading: true })
        getWheatRecordById(id)
            .then((res) => {
                if (res.success) {
                    console.log('RES: ', res.data)
                    // console.log('GET ID: ', res.data.billId)
                    this.setState({
                        sFarmerId: res.data.vendorId,
                        sFarmer: res.data.cnic,
                        sFarmerName: res.data.name,
                        netWeight: (res.data.wheatWeight).toString(),
                        pp: (res.data.bardanaPP).toString(),
                        jute: (res.data.bardanaJutt).toString(),
                        billNo: res.data.billNo,
                        billId: res.data.billId,
                        images: [res.data.bill],
                        loading: false
                    })
                }
                else {
                    // ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({ loading: false })
                }
            })
    }

    updateWheatProcure() {
        const { toggleModal, recordId } = this.props
        const { sFarmerId, pp, jute, netWeight, billNo, billId } = this.state
        console.log('UPDATE ID: ', billId)
        const validateForm = this.validateForm()
        if (validateForm) {
            this.setState({ loading: true })
            updateWheatRecord(recordId, sFarmerId, pp, jute, netWeight, billNo, billId)
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

    validateForm() {
        const { sFarmer, netWeight, pp, jute, billNo, sFarmerId, images } = this.state;
        if (sFarmer && netWeight && pp && jute && billNo && images.length > 0) {
            this.setState({
                farmerError: false,
                netWeightError: false,
                ppError: false,
                juteError: false,
                billNoError: false,
                billImageError: false
            })
            return true
        }
        else {
            if (!sFarmer) {
                this.setState({ farmerError: true })
            } else {
                this.setState({ farmerError: false })
            }
            if (!sFarmerId) {
                this.setState({ farmerError: true })
            } else {
                this.setState({ farmerError: false })
            }
            if (!netWeight) {
                this.setState({ netWeightError: true })
            } else {
                this.setState({ netWeightError: false })
            }
            if (!pp) {
                this.setState({ ppError: true })
            } else {
                this.setState({ ppError: false })
            }
            if (!jute) {
                this.setState({ juteError: true })
            } else {
                this.setState({ juteError: false })
            }
            if (!billNo) {
                this.setState({ billNoError: true })
            } else {
                this.setState({ billNoError: false })
            }
            if (images.length == 0) {
                this.setState({ billImageError: true })
            } else {
                this.setState({ billImageError: false })
            }
        }
    }

    toggleImageModal = () => {
        const { imageModalVisible } = this.state;
        this.setState({ imageModalVisible: !imageModalVisible })
    }

    render() {
        const { visible, toggleModal, type } = this.props;
        const { farmers, sFarmer, fFarmers, keyboardSize, netWeight, pp, jute, billNo, images, sFarmerName, loading, farmerError, netWeightError, ppError, juteError, billNoError, billImageError, imageModalVisible } = this.state;
        // console.log('TYPE: ', type)
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <Modal
                    visible={visible}
                    backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
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
                                <Text style={styles.modalHeader}>Procure Wheat</Text>
                            </View>
                            <ScrollView style={{ maxHeight: '90%' }}
                            // showsVerticalScrollIndicator={false}
                            >
                                <Autocomplete
                                    label={() => {
                                        return (
                                            <Text style={styles.lableStyle}>{sFarmerName ? 'Farmer (' + sFarmerName + ')' : 'Farmer'}</Text>
                                        )
                                    }}
                                    caption={() => (
                                        farmerError ?
                                            <Text style={styles.captionText}>Farmer Required</Text>
                                            : null
                                    )}
                                    placeholder='Select Grower'
                                    defaultValue={sFarmer}
                                    maxLength={15}
                                    keyboardType='number-pad'
                                    onSelect={this.onSelect}
                                    onChangeText={this.onChangeText}>
                                    {fFarmers.map(this.renderOption)}
                                </Autocomplete>
                                <Input
                                    defaultValue={netWeight}
                                    label={() => {
                                        return (
                                            <Text style={styles.lableStyle}>Net Weight (kg)</Text>
                                        )
                                    }}
                                    caption={() => (
                                        netWeightError ?
                                            <Text style={styles.captionText}>Net Weight Required</Text>
                                            : null
                                    )}
                                    keyboardType='number-pad'
                                    placeholder='Enter Weight'
                                    onChangeText={nextValue => this.setState({ netWeight: nextValue })}
                                />
                                <Input
                                    defaultValue={pp}
                                    label={() => {
                                        return (
                                            <Text style={styles.lableStyle}>No. of bags (PP)</Text>
                                        )
                                    }}
                                    caption={() => (
                                        ppError ?
                                            <Text style={styles.captionText}>No. of Bags Required</Text>
                                            : null
                                    )}
                                    keyboardType='number-pad'
                                    placeholder='Value'
                                    onChangeText={nextValue => this.setState({ pp: nextValue })}
                                />
                                <Input
                                    defaultValue={jute}
                                    label={() => {
                                        return (
                                            <Text style={styles.lableStyle}>No. of Bags (Jute)</Text>
                                        )
                                    }}
                                    caption={() => (
                                        juteError ?
                                            <Text style={styles.captionText}>No. of Bags Required</Text>
                                            : null
                                    )}
                                    keyboardType='number-pad'
                                    placeholder='Value'
                                    onChangeText={nextValue => this.setState({ jute: nextValue })}
                                />
                                <Input
                                    defaultValue={billNo}
                                    label={() => {
                                        return (
                                            <Text style={styles.lableStyle}>Bill Number</Text>
                                        )
                                    }}
                                    caption={() => (
                                        billNoError ?
                                            <Text style={styles.captionText}>Bill No. Required</Text>
                                            : null
                                    )}
                                    placeholder='Enter Bill No.'
                                    maxLength={50}
                                    onChangeText={nextValue => this.setState({ billNo: nextValue })}
                                />
                                <Text style={styles.lableStyle}>Bill Copy</Text>

                                {
                                    (images.length > 0 && images[0] != null) ?
                                        <Images image={images[0]} toggle={this.toggleImageModal} />
                                        :
                                        <TouchableOpacity
                                            style={styles.uploadBtn}
                                            onPress={this.askFromWhereToPickImage}
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
                                            <Text style={[styles.lableStyle, { marginTop: 0, marginBottom: 5 }]}>Upload Bill Copy</Text>
                                        </TouchableOpacity>
                                }
                                {
                                    billImageError ?
                                        <Text style={styles.captionText}>Bill Image Required</Text> :
                                        null
                                }
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
                                    type == 'Edit' ?
                                        this.updateWheatProcure() :
                                        this.addWheatProcure()
                                }}
                            >
                                <Text style={{ color: 'white' }}>{type == 'Edit' ? 'Update' : 'Add'}</Text>
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
                                image={images[0].uri}
                                visible={true}
                                closeModal={this.toggleImageModal}
                            />
                        )
                    }
                </Modal>
            </KeyboardAvoidingView>
        )
    }
}

const Images = ({ image, toggle }) => {
    // console.log('Image: ', image[0])
    const currentImage = !image.uri ? { uri: image } : image
    return (
        <TouchableOpacity
            style={{ flex: 1, backgroundColor: FIELD_BACK_COLOR }}
            onPress={() => toggle()}
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
    uploadBtn: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: BASE_COLOR,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: FIELD_BACK_COLOR
    },
    image: {
        height: 200,
        width: 200,
        alignSelf: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "red",
    },
})

export default AddWheatModal;