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
import { Text, Icon, Input, Button, Modal } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import UUIDGenerator from 'react-native-uuid-generator';
import { addFarmer, getFarmerById, updateFarmerById, uploadPicture } from '../../services/FarmerApi';

class AddPartyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
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
            images: [],
            loading: false
        }
    }

    componentDidMount(){
        const { farmerId } = this.props;
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
    
        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
        if(farmerId){
            this.getFarmerDetails();
        }
    }

    componentWillUnmount(){
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
    }

    askFromWhereToPickImage = () => {
        Alert.alert(
            'Select image from',
            '',
            [
            {text: 'Gallery', onPress: () => this.pickImage('GALLERY')},
            {text: 'Camera', onPress: () => this.pickImage('CAMERA')},
            ],
            {cancelable: true},
        );
    };

    pickImage = async (location) => {
        if (location === 'GALLERY') {
            ImagePicker.openPicker({
            multiple: false,
            mediaType: 'photo',
            })
            .then((image)=>{
                // console.log('Selected Image: ', image);
                UUIDGenerator.getRandomUUID((uuid) => {
                    const imageObj = {
                        uri: image.path,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    this.setState({images: [...this.state.images,imageObj]}
                    )
                })
            })
            .catch((e)=>console.log(e));
        } else if (location === 'CAMERA') {
            ImagePicker.openCamera({
            multiple: false,
            mediaType: 'photo',
            })
            .then((image)=>{
                // console.log('Selected Image: ', image);
                UUIDGenerator.getRandomUUID((uuid) => {
                    const imageObj = {
                        uri: image.path,
                        name: image.path.replace(/^.*[\\\/]/, ''),
                        type: image.mime,
                    };
                    this.setState({images: [...this.state.images,imageObj]}
                    )
                })
            })
            .catch((e)=>console.log(e));
        }
    };

    checkPhoneRegex(val){
        const regex = RegExp(/^(3)([0-9]{9})$/gm);
        this.setState({
            contact: val
        },
        () => {
            const result = regex.test(val);
            result ? this.setState({contactError1: false}) : this.setState({contactError1: true})
        }
        )
    }

    formateCNIC(val){
        const regex = RegExp(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
        var value = val.replace(/^(\d{5})(\d{7})(\d{1}).*/, '$1-$2-$3')
        this.setState({cnic: value},
            () => {
                const result = regex.test(value);
                result ? this.setState({cnicError1: false}) : this.setState({cnicError1: true})
            }
        )
    }

    getFarmerDetails (){
        const { farmerId } = this.props;
        this.setState({loading: true})
        getFarmerById(farmerId)
        .then((res)=>{
            if(res.success){
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    cnic: res.data.cnic,
                    contact: res.data.phone,
                    address: res.data.address,
                    desc: res.data.description,
                })
                this.setState({loading: false})
            }
            else{
                // ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
            // this.setState({farmerDetails: res})
        }).catch((err) => {
            console.log('[ERR]: ', err)
        })
    }

    validateForm(){
        const {firstName, lastName, cnic, contact, address } = this.state
        if(firstName && lastName && cnic && contact && address){
            this.setState({
                fNameError: false,
                lNameError: false,
                cnicError: false,
                contactError: false,
                addressError: false,
            })
            return true
        }
        else{if(!firstName){
                this.setState({fNameError: true})
            }
            else{
                this.setState({fNameError: false})
            }
            if(!lastName){
                this.setState({lNameError: true})
            }
            else{
                this.setState({lNameError: false})
            }
            if(!cnic){
                this.setState({cnicError: true})
            }
            else{
                this.setState({cnicError: false})
            }
            if(!contact){
                this.setState({contactError: true})
            }
            if(!address){
                this.setState({addressError: true})
            }
            else{
                this.setState({addressError: false})
            }
        }
    }
    
    addNewFarmer(){
        const { toggleModal } = this.props;
        const {firstName, lastName, cnic, contact, address, desc, images} = this.state;
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            if(images.length > 0){
                uploadPicture(images)
                .then((res)=>{
                    if(res.success){
                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                        // console.log('ID: ', res.data[0].id)
                        addFarmer(firstName, lastName, cnic, contact, address, desc, res.data[0].id)
                        .then((res)=>{
                            if(res.success){
                                ToastAndroid.show(res.message, ToastAndroid.LONG)
                                this.setState({loading: false})
                                toggleModal();
                            }
                            else{
                                this.setState({loading: false})
                            }
                        })
                        .catch((err)=>{
                            console.log('[ERR]: ', err)
                        })
                    }
                    else{
                        this.setState({loading: false})
                    }
                })
                .catch((err)=>{
                    console.log('[ERR]: ', err)
                })
            }
            else{
                addFarmer(firstName, lastName, cnic, contact, address, desc, null)
                .then((res)=>{
                    if(res.success){
                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                        this.setState({loading: false})
                        toggleModal();
                    }
                    else{
                        this.setState({loading: false})
                    }
                })
                .catch((err)=>{
                    console.log('[ERR]: ', err)
                })
            }
        }
    }

    updateFarmer(){
        const { toggleModal, farmerId } = this.props;
        const {firstName, lastName, cnic, contact, address, desc} = this.state;
        
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            updateFarmerById(farmerId, firstName, lastName, cnic, contact, address, desc)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    // ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    render(){
        const { visible, toggleModal, type, farmerId } = this.props;
        const { 
            firstName, 
            lastName, 
            cnic, 
            contact, 
            address, 
            desc, 
            keyboardSize, 
            images, 
            loading,
            fNameError, 
            lNameError, 
            cnicError1, 
            contactError1, 
            addressError, 
            cnicError, 
            contactError 
        } = this.state;
        return(
            <>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
            <Modal
                backdropStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, {marginBottom: keyboardSize + 50}]}>
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
                        <View style={{alignItems: 'center'}}>
                        <Text style={styles.modalHeader}>{farmerId ? 'Edit' : 'Add'} Farmer</Text>
                        </View>
                        <ScrollView>
                            {
                                images.length > 0 ?
                                    <Images image={images}/>
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
                                        <Text style={[styles.lableStyle, {marginTop: 0, marginBottom: 5}]}>Upload Profile Picture</Text>
                                    </TouchableOpacity> 
                            }
                            <Input
                                value={firstName}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>First Name</Text>
                                )}}
                                caption={()=>(
                                    fNameError ?
                                        <Text style={styles.captionText}>First Name Required</Text>
                                    : null
                                )}
                                maxLength={25}
                                placeholder='Enter First Name'
                                onChangeText={nextValue => this.setState({firstName: nextValue})}
                            />
                            <Input
                                value={lastName}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Last Name</Text>
                                )}}
                                caption={()=>(
                                    lNameError ?
                                        <Text style={styles.captionText}>Last Name Required</Text>
                                    : null
                                )}
                                maxLength={25}
                                placeholder='Enter Last Name'
                                onChangeText={nextValue => this.setState({lastName: nextValue})}
                            />
                            <Input
                                value={cnic}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>CNIC</Text>
                                )}}
                                placeholder='XXXXX-XXXXXXX-X'
                                keyboardType='number-pad'
                                maxLength={15}
                                caption={()=>(
                                    cnicError ?
                                    (<Text style={styles.captionText}>CNIC Required</Text>) :
                                    cnicError1 ?
                                        <Text style={styles.captionText}>Should contain 13 numbers</Text>
                                    : null
                                )}
                                onChangeText={nextValue => this.formateCNIC(nextValue)}
                            />
                            <Input
                                value={contact}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Contact No</Text>
                                )}}
                                placeholder='3XX-XXXXXXX'
                                keyboardType='number-pad'
                                maxLength={10}
                                accessoryLeft={()=>(
                                    <Text>+92</Text>
                                )}
                                caption={()=>(
                                    contactError ?
                                    (<Text style={styles.captionText}>Contact No Required</Text>) :
                                    contactError1 ?
                                        <Text style={styles.captionText}>Should start with 3 and contain 10 numbers</Text>
                                    : null
                                )}
                                onChangeText={nextValue => 
                                    {
                                        this.checkPhoneRegex(nextValue)
                                    }
                                }
                            />
                            <Input
                                value={address}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Address</Text>
                                )}}
                                placeholder='Enter Address'
                                maxLength={150}
                                caption={()=>(
                                    addressError ?
                                        <Text style={styles.captionText}>Address Required</Text>
                                    : null
                                )}
                                onChangeText={nextValue => this.setState({address: nextValue})}
                            />
                            <Input
                                value={desc}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Description</Text>
                                )}}
                                multiline={true}
                                textStyle={{ minHeight: 65, maxHeight: 65 }}
                                placeholder='Description'
                                maxLength={150}
                                onChangeText={nextValue => this.setState({desc: nextValue})}
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
                        onPress={()=> {
                            farmerId ?
                            this.updateFarmer() :
                            this.addNewFarmer()
                        }}
                        >
                            <Text style={{color: 'white'}}>{farmerId ? 'Update' : 'Add'}</Text>
                        </TouchableOpacity>
                        {
                            loading ?
                            <View style={
                                [
                                    {alignItems: 'center', 
                                    justifyContent: 'center', 
                                    backgroundColor: LOADING_GRAY_COLOR,
                                    borderRadius: 20
                                    },
                                    StyleSheet.absoluteFill
                                ]}>
                                <ActivityIndicator size='large' color= 'white'/>
                                <Text style={{color: 'white', fontWeight: 'bold'}}>Please Wait...</Text>
                            </View> :
                            null
                        }
                    </View>
                </View>
            </Modal>
            </KeyboardAvoidingView>
            </>
        )
    }
}

const Images = ({image}) => {
    // console.log('Image: ', image[0])
    const currentImage = image[0]
    return(
        <View style={{flex: 1, backgroundColor: FIELD_BACK_COLOR}}>
            <Image 
                style={styles.image} 
                source={{uri: currentImage.uri}}
            />
        </View>
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
    closeButton:{
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