import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING } from '../../../Global';
import { Text, Icon, Card, Input, Button, Modal } from '@ui-kitten/components';
import { color } from 'react-native-reanimated';
import { DEFAULT_CONFIG } from '@ui-kitten/components/ui/animation/animation';

class AddPartyModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            cnic: '',
            date: '',
            address: '',
            desc: '',
            keyboardSize: 0
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

    render(){
        const { visible, toggleModal } = this.props;
        const { name, cnic, date, address, desc, keyboardSize } = this.state;
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
                        <Text style={styles.modalHeader}>Add Party</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Input
                                value={name}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Name</Text>
                                )}}
                                placeholder='Enter Name'
                                onChangeText={nextValue => this.setState({name: nextValue})}
                            />
                            <Input
                                value={cnic}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>CNIC</Text>
                                )}}
                                placeholder='Enter CNIC'
                                onChangeText={nextValue => this.setState({cnic: nextValue})}
                            />
                            <Input
                                value={date}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Date</Text>
                                )}}
                                placeholder='Enter Date'
                                onChangeText={nextValue => this.setState({date: nextValue})}
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
    }
})

export default AddPartyModal;