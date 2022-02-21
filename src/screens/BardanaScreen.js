import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BACK_COLOR, BASE_COLOR, MAIN_HEADING } from '../../Global';
import { Text, Icon } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import FarmerBardanaCard from '../components/FarmerBardanaCard';
import BardanaModal from './modals/BardanaModal';

class BardanaScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Bardana Procured (bela)',
                    value: '1300/2500',
                    icon: 'refresh',
                    difference: '2.3%',
                    change: 'inc'
                },
                {
                    heading: 'Bags Filled',
                    value: '13/25',
                    icon: 'refresh',
                    difference: '2.1%',
                    change: 'inc'
                }
            ],
            farmerArray: [
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    type: 'Jute',
                    quantity: 50
                },
                {
                    name: 'Anand Kumar',
                    date: '01-10-2022',
                    type: 'PP',
                    quantity: 100
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    type: 'Jute',
                    quantity: 50
                },
                {
                    name: 'Anand Kumar',
                    date: '01-10-2022',
                    type: 'PP',
                    quantity: 100
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    type: 'Jute',
                    quantity: 50
                },
                {
                    name: 'Anand Kumar',
                    date: '01-10-2022',
                    type: 'PP',
                    quantity: 100
                },

            ],
            modalVisible: false,
            modalType: ''
        }
    }
    render(){
        const { infoCardArray, farmerArray, modalVisible, modalType } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.headingFont}>Procure Bardana</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity 
                                onPress={()=>this.toggleModalState('Return')}
                                style={{alignItems: 'center'}}
                            >
                                <View style={{
                                    width: 30, 
                                    height: 30,
                                    backgroundColor: 'red',
                                    borderRadius: 50,
                                    
                                }}>
                                    <Icon 
                                        style={{
                                        width: 30, 
                                        height: 30,                                    
                                        }} 
                                        fill={BACK_COLOR} 
                                        name='close-circle-outline'
                                    />
                                </View>
                                <Text style={{color: 'red'}}>Return</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={{marginLeft: 30, alignItems: 'center'}}
                                onPress={()=>this.toggleModalState('Issue')}
                            >
                                <View style={{
                                    width: 30, 
                                    height: 30,
                                    backgroundColor: 'green',
                                    borderRadius: 50
                                }}>
                                    <Icon 
                                        style={{
                                        width: 30, 
                                        height: 30
                                        }} 
                                        fill={BACK_COLOR} 
                                        name='plus-circle-outline'
                                    />
                                </View>
                                <Text style={{color: 'green'}}>Issue</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <View>
                            <InfoCard data={infoCardArray} horizontal={false}/>
                        </View>

                        <View >
                            <FarmerBardanaCard data={farmerArray}/>
                        </View>
                    </ScrollView>
                    {modalVisible &&
                        <BardanaModal
                            visible={modalVisible}
                            toggleModal={this.toggleModalState}
                            type={modalType}
                        />
                    }
                </View>
                {/* <TouchableOpacity 
                    style={styles.floatingButton}
                    onPress={this.toggleModalState}
                >
                        <Text style={styles.fbText}>+</Text>
                </TouchableOpacity> */}
            </View>
        )
    }

    toggleModalState = (type) =>{
        const { modalVisible } = this.state
        this.setState({
            modalVisible: !modalVisible,
            modalType: type
        })
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACK_COLOR
    },
    content: {
        flex: 1,
        margin: 15,
    },
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black'
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

export default BardanaScreen;