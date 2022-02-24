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
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, FIELD_BACK_COLOR, MAIN_HEADING } from '../../../Global';
import { Text, Icon, Input, Button, Autocomplete, AutocompleteItem, Modal } from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import UUIDGenerator from 'react-native-uuid-generator';

class AddWheatModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyboardSize: 0,
            farmers: [
                { title: 'Samir' },
                { title: 'Soahil' },
                { title: 'Trun' },
                { title: 'Kashif' },
            ],
            fFarmers: [],
            sFarmer: null,
            netWeight: '',
            pp: '',
            jute: '',
            billNo: '',
            images: []
        }
    }

    componentDidMount(){
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        });
    
        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        });
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

    filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

    onSelect = (index) => {
        const { farmers } = this.state;
        this.setState({sFarmer: farmers[index].title})
    };
    
    onChangeText = (query) => {
        const { farmers } = this.state;
        this.setState({
            sFarmer: query,
            fFarmers: farmers.filter(item => this.filter(item, query))
        })
    };
    
    renderOption = (item, index) => (
        <AutocompleteItem
            key={index+''}
            title={item.title}
        />
    );

    render(){
        const { visible, toggleModal } = this.props;
        const { farmers, sFarmer, fFarmers, keyboardSize, netWeight, pp, jute, billNo, images } = this.state;
        
        return(
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{flex: 1}}
            >
            <Modal
                visible={visible}
                backdropStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
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
                            <Text style={styles.modalHeader}>Procure Wheat</Text>
                        </View>
                        <ScrollView style={{maxHeight: '90%'}} showsVerticalScrollIndicator={false}>
                            <Autocomplete
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Farmer</Text>
                                )}}
                                placeholder='Select Grower'
                                value={sFarmer}
                                onSelect={this.onSelect}
                                onChangeText={this.onChangeText}>
                                {fFarmers.map(this.renderOption)}
                            </Autocomplete>
                            <Input
                                value={netWeight}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Net Weight</Text>
                                )}}
                                placeholder='Enter Weight'
                                onChangeText={nextValue => this.setState({netWeight: nextValue})}
                            />
                            <Input
                                value={pp}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No. of bags (PP)</Text>
                                )}}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({pp: nextValue})}
                            />
                            <Input
                                value={jute}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No. of Bags (Jute)</Text>
                                )}}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({jute: nextValue})}
                            />
                            <Input
                                value={billNo}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Bill Number</Text>
                                )}}
                                placeholder='Enter Bill No.'
                                onChangeText={nextValue => this.setState({billNo: nextValue})}
                            />
                            <Text style={styles.lableStyle}>Bill Copy</Text>
                            
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
                                        <Text style={[styles.lableStyle, {marginTop: 0, marginBottom: 5}]}>Upload Bill Copy</Text>
                                    </TouchableOpacity> 
                            }
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
})

export default AddWheatModal;