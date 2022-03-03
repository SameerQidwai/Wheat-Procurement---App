import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, LOADING_GRAY_COLOR } from '../../../Global';
import { Icon, Text, Autocomplete, AutocompleteItem, Input, Modal, Button } from '@ui-kitten/components';
import { requestBardanaForFarmer } from '../../services/FarmerApi';
import { 
    alllocateBardanatoFarmer, 
    getBardanaRecordById, 
    receiveBardanaFromDFC, 
    returnBardanaFromFarmer, 
    searchFarmerCnic, 
    updateBardanaIssuedToFarmer, 
    updateBardanaReturnFromFarmer, 
    updateReceiveRecordById 
} from '../../services/BardanaApi';

class BardanaModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyboardSize: 0,
            farmers: [
                // { title: 'Samir' },
                // { title: 'Soahil' },
                // { title: 'Trun' },
                // { title: 'Kashif' },
            ],
            fFarmers: [],
            sFarmer: null,
            sFarmerName: '',
            sFarmerId: '',
            pp: '',
            jute: '',
            keyboardSize: 0,
            farmerId: '',
            farmerCnic: '',
            loading: false,
            farmerError: false,
            ppError: false,
            juteError: false

        }
    }

    componentDidMount(){
        const {recordId} = this.props
        Keyboard.addListener("keyboardDidShow", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
    
        Keyboard.addListener("keyboardDidHide", (e) => {
            this.setState({keyboardSize: e.endCoordinates.height})
        })
        if(recordId){
            this.getBardanaById()
        }
    }

    componentWillUnmount(){
        Keyboard.removeAllListeners("keyboardDidShow");
        Keyboard.removeAllListeners("keyboardDidHide");
    }

    onSelect = (index) => {
        const { fFarmers } = this.state;
        this.setState({
            sFarmer: fFarmers[index].cnic,
            sFarmerName: fFarmers[index].name,
            sFarmerId: fFarmers[index].id
        })
    };
    
    onChangeText = (query) => {
        console.log('Q: ', query)
        this.setState({
            sFarmer: query,
        })
        if(query.length > 3){
            searchFarmerCnic(query)
            .then((res) => {
                console.log('[RES]: ', res.data)
                this.setState({fFarmers: res.data, sFarmerName: ''})
            })
        }
        else{
            this.setState({fFarmers: [], sFarmerName: ''})
        }
    };
    
    renderOption = (item, index) => (
        <AutocompleteItem
            style={{backgroundColor: '#dadce6'}}
            key={index+''}
            title={()=>(
                <View style={{borderBottomWidth: 0.5, borderColor: BASE_COLOR}}>
                    <Text >{item.name}</Text>
                    <Text style={{fontSize: 10}}>{item.cnic}</Text>
                </View>
            )}
        />
    );

    requestBardana(){
        const { farmerId, toggleModal} = this.props;
        const { pp, jute } = this.state
        const validateForm = this.validateForm();
        console.log('Verifying')
        if(validateForm){
            this.setState({loading: true})
            console.log('Submitting')
            requestBardanaForFarmer(farmerId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    receiveFromDFC(){
        const { toggleModal} = this.props;
        const { pp, jute } = this.state
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            receiveBardanaFromDFC(pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    updateReceiveFromDFC(){
        const {recordId, toggleModal} = this.props
        const {pp, jute} = this.state
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            updateReceiveRecordById(recordId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    getBardanaById(){
        this.setState({loading: true})
        const {recordId} = this.props
        getBardanaRecordById(recordId)
        .then((res) =>{
            if(res.success){
                this.setState({
                    pp: (res.data.bardanaPP).toString(),
                    jute: (res.data.bardanaJutt).toString(),
                    farmerId: res.data.vendorId,
                    sFarmer: res.data.cnic,
                    sFarmerName: res.data.name,
                    loading: false
                })
            }
            else{
                ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
        })
        .catch((err)=>{
            console.log('[ERR]: ', err)
        })
    }

    allocateBardana(){
        const {toggleModal} = this.props
        const {sFarmerId, pp, jute} = this.state;
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            alllocateBardanatoFarmer(sFarmerId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    returnBardana(){
        const {toggleModal} = this.props
        const {sFarmerId, pp, jute} = this.state;
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            returnBardanaFromFarmer(sFarmerId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    updateAllocatedBardana(){
        const { recordId, toggleModal } = this.props
        const {pp, jute, farmerId} = this.state;
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            updateBardanaIssuedToFarmer(recordId, farmerId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    updateReturnBardana(){
        const { recordId, toggleModal } = this.props
        const {pp, jute, farmerId} = this.state;
        const validateForm = this.validateForm();
        if(validateForm){
            this.setState({loading: true})
            updateBardanaReturnFromFarmer(recordId, farmerId, pp, jute)
            .then((res)=>{
                if(res.success){
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                    toggleModal();
                }
                else{
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({loading: false})
                }
            })
            .catch((err)=>{
                console.log('[ERR]: ', err)
            })
        }
    }

    validateForm(){
        const {sFarmer, pp, jute} = this.state
        const {type, modalType} = this.props;

        if(type != 'DFC' && type != 'Request' && modalType != 'DFC'){
            if(sFarmer && pp && jute){
                this.setState({
                    farmerError: false,
                    ppError: false,
                    juteError: false
                })
                return true;
            }
            else{
                if(!sFarmer){
                    this.setState({farmerError: true})
                }
                else{
                    this.setState({farmerError: false})
                }
                if(!pp){
                    this.setState({ppError: true})
                }
                else{
                    this.setState({ppError: false})
                }
                if(!jute){
                    this.setState({juteError: true})
                }
                else{
                    this.setState({juteError: false})
                }
            }
        }else{
            if(pp && jute){
                this.setState({
                    ppError: false,
                    juteError: false
                })
                return true;
            }
            else{
                if(!pp){
                    this.setState({ppError: true})
                }
                else{
                    this.setState({ppError: false})
                }
                if(!jute){
                    this.setState({juteError: true})
                }
                else{
                    this.setState({juteError: false})
                }
            }
        }
    }

    render(){
        const {visible, toggleModal, type, receiveFrom, recordId, modalType} = this.props;
        const {sFarmer, fFarmers, pp, jute, keyboardSize, sFarmerName, loading, farmerRequired, farmerError, ppError, juteError} = this.state;
        // console.log('R-ID: ', recordId)
        // console.log('Modal Type: ', modalType)
        // console.log('Type: ', type)
        return(
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
                            {
                                type == 'DFC' || modalType == 'DFC' ?
                                <Text style={styles.modalHeader}>Receive From DFC</Text> :
                                ( type == 'Request' ?
                                <Text style={styles.modalHeader}>Request Bardana</Text> :
                                <Text style={styles.modalHeader}>{type} Bardana</Text>)
                            }
                        </View>
                        <ScrollView style={{maxHeight: '90%'}} showsVerticalScrollIndicator={false}>
                            {
                                (type != 'DFC' && type != 'Request' && modalType != 'DFC') ?
                                <Autocomplete
                                    label={()=>{return(
                                        <Text style={styles.lableStyle}>{sFarmerName? 'Farmer ('+sFarmerName+')' : 'Farmer'}</Text>
                                    )}}
                                    caption={()=>(
                                        farmerError ?
                                            <Text style={styles.captionText}>Farmer Required</Text>
                                        : null
                                    )}
                                    placeholder='Select Grower'
                                    keyboardType='number-pad'
                                    value={sFarmer}
                                    onSelect={this.onSelect}
                                    onChangeText={this.onChangeText}>
                                    {fFarmers.map(this.renderOption)}
                                </Autocomplete> :
                                null
                            }
                            <Input
                                value={pp}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No. of bags (PP)</Text>
                                )}}
                                caption={()=>(
                                    ppError ?
                                        <Text style={styles.captionText}>No. of Bags Required</Text>
                                    : null
                                )}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({pp: nextValue})}
                            />
                            <Input
                                value={jute}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No. of Bags (Jute)</Text>
                                )}}
                                caption={()=>(
                                    juteError ?
                                        <Text style={styles.captionText}>No. of Bags Required</Text>
                                    : null
                                )}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({jute: nextValue})}
                            />
                        </ScrollView>
                        <TouchableOpacity style={{
                            borderRadius: 50,
                            backgroundColor: BASE_COLOR,
                            width: '100%',
                            height: '12%',
                            marginTop: '5%',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={()=> {
                            if(type == 'DFC' || modalType == 'DFC'){
                                if(recordId){
                                    console.log('1')
                                    this.updateReceiveFromDFC()
                                    return
                                }
                                console.log('2')
                                this.receiveFromDFC()
                                return
                            }
                            else if(type == 'Issue' || modalType == 'Issue'){
                                    if(recordId){
                                        console.log('3')
                                        this.updateAllocatedBardana()
                                        return
                                    }
                                    console.log('4')
                                    this.allocateBardana()
                                    return

                            }
                            else if(type == 'Return' || modalType == 'Return'){
                                    if(recordId){
                                        console.log('5')
                                        this.updateReturnBardana()
                                        return
                                    }
                                    console.log('6')
                                    this.returnBardana()
                                    return
                            }
                            else{
                                console.log('7')
                                this.requestBardana()
                                return
                            }
                        }}
                        >
                            <Text style={{color: 'white'}}>Submit</Text>
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
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: BASE_COLOR,
        paddingHorizontal: 35,
        paddingVertical: 20,
        width: 350,
        // maxheight: '90%'
        height: 375
    },
    modalHeader: {
        marginBottom: 15,
        fontSize: 24,
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
})

export default BardanaModal;