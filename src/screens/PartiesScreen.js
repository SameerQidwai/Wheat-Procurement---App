import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BACK_COLOR, BASE_COLOR, MAIN_HEADING } from '../../Global';
import { Text } from '@ui-kitten/components';

import FarmerDetailsCard from '../components/FarmerDetailsCard';
import AddPartyModal from './modals/AddPartyModal';
class PartiesScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            farmerDetails: [
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
                {
                    name: 'Mitchell Williamson',
                    address: 'Street 102, Larakana',
                    date: '01-10-2022',
                    cnic: '42501-1234567-5'
                },
            ],
            modalVisible: false
        }
    }
    render(){
        const { farmerDetails, modalVisible } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Parties</Text>
                    <View style={{marginVertical: 15}}>
                        <FarmerDetailsCard data={farmerDetails}/>
                    </View>
                    {modalVisible &&
                        <AddPartyModal
                            visible={modalVisible}
                            toggleModal={this.toggleModalState}
                        />
                    }
                </View>
                <TouchableOpacity 
                    style={styles.floatingButton}
                    onPress={this.toggleModalState}
                >
                        <Text style={styles.fbText}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }

    toggleModalState = () =>{
        const { modalVisible } = this.state
        this.setState({modalVisible: !modalVisible})
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACK_COLOR,
    },
    content: {
        flex: 1,
        margin: 15,
    },
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black',
    },
    floatingButton:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BASE_COLOR, 
        width: 50, 
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 30,
        shadowColor: BASE_COLOR,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6
    },
    fbText:{
        color: BACK_COLOR, 
        fontSize: 34, 
        fontWeight: 'bold'
    }
});

export default PartiesScreen;