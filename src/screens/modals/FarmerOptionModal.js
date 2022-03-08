import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView, Alert, ToastAndroid } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE } from '../../../Global';
import { Icon, Text, Autocomplete, AutocompleteItem, Input, Modal, Button } from '@ui-kitten/components';
import { deleteFarmerById } from '../../services/FarmerApi';

class FarmerOptionModal extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    deleteFarmer(){
        const {farmerId, toggleModal} = this.props
        Alert.alert(
            'Are you sure you want to delete this farmer',
            '',
            [
            {text: 'Yes', onPress: () => {
                deleteFarmerById(farmerId)
                .then((res)=>{
                    if(res.success){
                        ToastAndroid.show(res.message, ToastAndroid.LONG)
                        toggleModal();
                    }
                })
            }},
            {text: 'No', onPress: () => {}},
            ],
            {cancelable: true},
        );
    }

    render(){
        const {visible, toggleModal, type, showSelectedModal} = this.props;
        return(
            <Modal
                backdropStyle={{backgroundColor: 'rgba(0,0,0,0.7)'}}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
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
                            <Text style={styles.modalHeader}>Options</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={()=>{showSelectedModal('Edit')}}
                                style={{
                                    width: '80%',
                                    height: '25%',
                                    backgroundColor: BASE_COLOR,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    marginBottom: 15
                                }}
                            >
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Edit Farmer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>{this.deleteFarmer()}}
                                style={{
                                    width: '80%',
                                    height: '25%',
                                    backgroundColor: BASE_COLOR,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    marginBottom: 15
                                }}
                            >
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Delete Farmer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>showSelectedModal('Request')}
                                style={{
                                    width: '80%',
                                    height: '25%',
                                    backgroundColor: BASE_COLOR,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    marginBottom: 15
                                }}
                            >
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Request Bardana</Text>
                            </TouchableOpacity>
                        </View>
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
})

export default FarmerOptionModal;