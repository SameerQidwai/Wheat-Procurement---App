import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BASE_COLOR, BLUE_PIE_COLOR, MAIN_HEADING, RED_PIE_COLOR, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

import PieChart from 'react-native-pie-chart';
const BreakdownPieChart = ({series, sliceColor}) => {
    return (
        <Card style={styles.card}>
            <Text style={styles.headingFont}>Procurement Breakdown</Text>
            <View style={{alignItems: 'center', margin: 10}}>
                <PieChart
                    widthAndHeight={150}
                    series={series}
                    sliceColor={sliceColor}
                    doughnut={true}
                    coverRadius={0.9}
                    coverFill={'#FFF'}
                />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
                <View style={{ height: 15, width: 15, backgroundColor: BLUE_PIE_COLOR}} />
                <Text style={{flex: 6, marginLeft: 10, fontSize: SUB_HEADING, color: 'black'}}>Procured</Text>
                <Text style={{flex: 1, fontSize: SUB_HEADING, fontWeight: 'bold', color: 'black'}}>{series[0]}%</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
                <View style={{ height: 15, width: 15, backgroundColor: RED_PIE_COLOR}} />
                <Text style={{flex: 6, marginLeft: 10, fontSize: SUB_HEADING, color: 'black'}}>Left</Text>
                <Text style={{flex: 1, fontSize: SUB_HEADING, fontWeight: 'bold', color: 'black'}}>{series[1]}%</Text>
            </View>
            <View style={{flexDirection: 'row', margin: 10, alignItems: 'center'}}>
                <Text style={{color: BLUE_PIE_COLOR, fontWeight: 'bold',fontSize: SUB_HEADING}}>More Insights</Text>
                <Icon 
                    style={{
                    width: 20, 
                    height: 20
                    }} 
                    fill={BLUE_PIE_COLOR} 
                    name='arrow-ios-forward'
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5
    },
    card: {
        width: "100%",
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginBottom: 15
    },
})

export default BreakdownPieChart;