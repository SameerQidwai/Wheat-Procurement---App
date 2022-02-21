import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING } from '../../../Global';
import { Text, Icon, Input, Button, Autocomplete, AutocompleteItem, Modal } from '@ui-kitten/components';
// import Autocomplete from 'react-native-autocomplete-input';

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
        const { farmers, sFarmer, fFarmers, keyboardSize, netWeight, pp, jute, billNo } = this.state;
        
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
})

export default AddWheatModal;