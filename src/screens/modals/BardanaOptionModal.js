import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE } from '../../../Global';
import { Icon, Text, Autocomplete, AutocompleteItem, Input, Modal, Button } from '@ui-kitten/components';
import { color } from 'react-native-reanimated';

class OptionModal extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        const {visible, toggleModal, type, toggleOptionsModal} = this.props;
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
                                onPress={()=>toggleOptionsModal('DFC')}
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
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Receive From DFC</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>toggleOptionsModal('Issue')}
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
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Issue To Farmer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={()=>toggleOptionsModal('Return')}
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
                                <Text style={{color: BACK_COLOR, fontWeight: 'bold'}}>Return From Farmer</Text>
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

export default OptionModal;