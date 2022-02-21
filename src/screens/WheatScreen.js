import React, { Component } from 'react';
import { View, StyleSheet, ScrollView,TouchableOpacity  } from 'react-native';
import { BACK_COLOR, BASE_COLOR, MAIN_HEADING } from '../../Global';
import { Text } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import FarmerWheatCard from '../components/FarmerWheatCard';
import AddWheatModal from './modals/AddWheatModal';
class WheatScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Wheat Procured',
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
                    billNo: 'ab4235A',
                    pp: 50,
                    jute: 49,
                    nw: 190,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    billNo: 'ab4235A',
                    pp: 50,
                    jute: 49,
                    nw: 190,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    billNo: 'ab4235A',
                    pp: 50,
                    jute: 49,
                    nw: 190,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    billNo: 'ab4235A',
                    pp: 50,
                    jute: 49,
                    nw: 190,
                },
            ],
            modalVisible: false
        }
    }
    render(){
        const { infoCardArray, farmerArray, modalVisible } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Procure Wheat</Text>
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <View>
                            <InfoCard data={infoCardArray} horizontal={false}/>
                        </View>

                        <View >
                            <FarmerWheatCard data={farmerArray} entries={true}/>
                        </View>
                    </ScrollView>
                    {modalVisible &&
                        <AddWheatModal
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

export default WheatScreen;