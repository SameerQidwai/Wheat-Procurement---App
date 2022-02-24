import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { BACK_COLOR, BLUE_PIE_COLOR, MAIN_HEADING, RED_PIE_COLOR } from '../../Global';
import { Text } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import BreakdownPieChart from '../components/BreakdownPieChart';
import FarmerWheatCard from '../components/FarmerWheatCard';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Total Target',
                    value: '14k',
                    icon: 'refresh',
                    difference: '2.3%',
                    change: 'inc'
                },
                {
                    heading: 'Total Wheat Collected',
                    value: '56%',
                    icon: 'percent',
                    difference: '2.1%',
                    change: 'inc'
                },
                {
                    heading: 'Total Revenues',
                    value: '$768,342',
                    icon: 'briefcase',
                    difference: '2.3%',
                    change: 'dec'
                },
                {
                    heading: 'Total Users',
                    value: '20k',
                    icon: 'people-outline',
                    difference: '1.3%',
                    change: 'inc'
                }
            ],
            farmerArray: [
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    bags: 23,
                    nw: 190,
                    gw: 200
                },
                {
                    name: 'Saif Arslan',
                    date: '02-10-2022',
                    bags: 25,
                    nw: 200,
                    gw: 210
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    bags: 23,
                    nw: 190,
                    gw: 200
                },
                {
                    name: 'Saif Arslan',
                    date: '02-10-2022',
                    bags: 25,
                    nw: 200,
                    gw: 210
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    bags: 23,
                    nw: 190,
                    gw: 200
                },
                {
                    name: 'Saif Arslan',
                    date: '02-10-2022',
                    bags: 25,
                    nw: 200,
                    gw: 210
                },
            ]
        }
    }
    
    render(){
        const { infoCardArray, farmerArray } = this.state;

        const series = [75, 25]
        const sliceColor = [BLUE_PIE_COLOR, RED_PIE_COLOR]
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Dashboard</Text>
                    
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <View>
                            <InfoCard data={infoCardArray} horizontal={true}/>
                        </View>
                        
                        <View>
                            <BreakdownPieChart
                                series={series}
                                sliceColor={sliceColor}
                            />
                        </View>

                        <View >
                            <FarmerWheatCard data={farmerArray} />
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
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
});

export default HomeScreen;