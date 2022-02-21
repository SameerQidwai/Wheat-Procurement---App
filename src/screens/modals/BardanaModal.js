import React, { Component } from 'react'
import {View, StyleSheet, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE } from '../../../Global';
import { Icon, Text, Autocomplete, AutocompleteItem, Input, Modal, Button } from '@ui-kitten/components';

class BardanaModal extends Component {
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
            pp: '',
            jute: '',
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
        const {visible, toggleModal, type} = this.props;
        const {sFarmer, fFarmers, pp, jute, keyboardSize } = this.state;
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
                            <Text style={styles.modalHeader}>{type} Bardana</Text>
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
                            Submit
                        </Button>
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

export default BardanaModal;