import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { BASE_COLOR, SUB_HEADING, DEAFULT_FONT_SIZE } from '../../Global';
const BardanaDetailsCard = ({totalBags, filledBags, issuedBags, availableBags}) => {
    return(
        <>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                                
            <Card style={styles.cardStyle}>
                <Text style={{fontSize: DEAFULT_FONT_SIZE}}>Total Inventory</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>PP</Text>
                    <Text style={styles.textStyle}>{totalBags.pp}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>Jute</Text>
                    <Text style={styles.textStyle}>{totalBags.jutt}</Text>
                </View>
            </Card>

            <Card style={styles.cardStyle}>
                <Text style={{fontSize: DEAFULT_FONT_SIZE}}>Filled Bags</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>PP</Text>
                    <Text style={styles.textStyle}>{filledBags.pp}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={[styles.textStyle, {color: 'black'}]}>Jute</Text>
                    <Text style={styles.textStyle}>{filledBags.jutt}</Text>
                </View>
            </Card>
        </View>

        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <Card style={styles.cardStyle}>
            <Text style={{fontSize: DEAFULT_FONT_SIZE}}>Issued Bags</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <Text style={[styles.textStyle, {color: 'black'}]}>PP</Text>
                <Text style={styles.textStyle}>{issuedBags.pp}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.textStyle, {color: 'black'}]}>Jute</Text>
                <Text style={styles.textStyle}>{issuedBags.jutt}</Text>
            </View>
        </Card>

        <Card style={styles.cardStyle}>
            <Text style={{fontSize: DEAFULT_FONT_SIZE}}>Available Bags</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                <Text style={[styles.textStyle, {color: 'black'}]}>PP</Text>
                <Text style={styles.textStyle}>{availableBags.pp}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.textStyle, {color: 'black'}]}>Jute</Text>
                <Text style={styles.textStyle}>{availableBags.jutt}</Text>
            </View>
        </Card>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
    cardStyle: {
        borderWidth: 1,
        borderRadius: 10,
        flex: 2,
        margin: 5,
        shadowColor: BASE_COLOR,
        elevation: 10,
    },
    textStyle:{
        fontSize: SUB_HEADING,
        fontWeight: 'bold',
        color: '#cf722a'
    }
})
export default BardanaDetailsCard;