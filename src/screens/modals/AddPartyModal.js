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
    Image 
} from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING, FIELD_BACK_COLOR } from '../../../Global';
import { Text, Icon, Input, Button, Modal } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import UUIDGenerator from 'react-native-uuid-generator';

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
            show: false,
            show1: false,
            images: []
        }
    }

    componentDidMount(){
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
    
        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
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
                        _id: uuid,
                        uri: image.path
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
                        _id: uuid,
                        uri: image.path
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
            result ? this.setState({show: false}) : this.setState({show: true})
        }
        )
    }

    formateCNIC(val){
        const regex = RegExp(/^[0-9]{5}-[0-9]{7}-[0-9]$/)
        var value = val.replace(/^(\d{5})(\d{7})(\d{1}).*/, '$1-$2-$3')
        this.setState({cnic: value},
            () => {
                const result = regex.test(value);
                result ? this.setState({show1: false}) : this.setState({show1: true})
            }
        )
    }

    render(){
        const { visible, toggleModal } = this.props;
        const { firstName, lastName, cnic, contact, address, desc, keyboardSize, show, images, show1 } = this.state;
        return(
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
                        <Text style={styles.modalHeader}>Add Farmer</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* <Text style={styles.lableStyle}>Profile Picture</Text> */}
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
                                placeholder='Enter First Name'
                                onChangeText={nextValue => this.setState({firstName: nextValue})}
                            />
                            <Input
                                value={lastName}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Last Name</Text>
                                )}}
                                placeholder='Enter Last Name'
                                onChangeText={nextValue => this.setState({lastName: nextValue})}
                            />
                            <Input
                                value={cnic}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>CNIC</Text>
                                )}}
                                placeholder='XXXXX-XXXXXXX-X'
                                caption={()=>(
                                    show1 ?
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
                                accessoryLeft={()=>(
                                    <Text>+92</Text>
                                )}
                                caption={()=>(
                                    show ?
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
                                onChangeText={nextValue => this.setState({desc: nextValue})}
                            />
                        </ScrollView>
                        <Button
                            style={{
                                borderRadius: 50,
                                backgroundColor: BASE_COLOR,
                                width: '100%',
                                marginTop: '5%',
                            }}
                            appearance='outline'
                            size='medium'
                            status='control'
                            >
                            Add
                        </Button>
                    </View>
                </View>
            </Modal>
            </KeyboardAvoidingView>
        )
    }
}

const Images = ({image}) => {
    console.log('Image: ', image[0])
    const currentImage = image[0]
    return(
        <View style={{flex: 1, backgroundColor: FIELD_BACK_COLOR}}>
            <Image 
                style={styles.image} 
                source={{uri: currentImage.uri}}
            />
            {/* <TouchableOpacity 
                style={[styles.closeButton, {width: 20, height: 20, backgroundColor:'red'}]}
                // onPress={toggleModal}
                >
                <Icon 
                    style={{
                        width: 20, 
                        height: 20
                    }} 
                    fill={BACK_COLOR} 
                    name='close-outline'
                />
            </TouchableOpacity> */}
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