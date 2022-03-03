import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BASE_COLOR, DEAFULT_FONT_SIZE, GRAY_COLOR, MAIN_HEADING, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

const FarmerWheatCard = ({data, entries, optionModal}) => {
    return(
        <View style={{maxHeight: 500}}>
        {
            entries ?
            <Text style={styles.headingFont}>Records</Text> :
            <Text style={styles.headingFont}>Recent Wheat Procurement</Text>
        }
        {
            data ? 
            <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            {
            data.map(({id, sender, date, wheatWeight, billNo, bardanaJutt, bardanaPP, name, isEditable}, index) => (
                <Card key={index+''} style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 4}}>
                            <Text style={{fontSize: SUB_HEADING, color: 'black', fontWeight: 'bold'}}>{name}</Text>
                            <Text style={styles.defaultFont}>Date: {date}</Text>
                            <Text style={styles.defaultFont}>Bill No: {billNo}</Text>
                        </View>
                        
                        <View style={{flex: 3, marginLeft: 'auto'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View>
                                    <Text style={{fontSize: 8}}>Jute Bags</Text>
                                    <Text style={{color: 'green', fontWeight: 'bold'}}>{bardanaJutt}</Text>
                                </View>                                    
                                <View >
                                    <Text style={{fontSize: 8}}>PP Bags</Text>
                                    <Text style={{color: 'green', fontWeight: 'bold'}}>{bardanaPP}</Text>
                                </View> 
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View >
                                    <Text style={{fontSize: 8}}>Net Weight</Text>
                                    <Text style={{color: 'green', fontWeight: 'bold'}}>{wheatWeight} kg</Text>
                                </View>
                            </View>
                        </View>

                        {entries ?
                            <TouchableOpacity 
                                style={{flex: 1, alignItems: 'flex-end', marginRight: -10}}
                                onPress={()=>optionModal(id, isEditable)}
                            >
                                <Icon 
                                    style={{
                                    width: 25, 
                                    height: 25
                                    }} 
                                    fill='black' 
                                    name='more-vertical-outline'
                                />
                            </TouchableOpacity> :
                            null
                        }
                    </View>
                </Card>
            ))
            }
            </ScrollView> :
            null
        }
        
        </View>
    )
}

const styles = StyleSheet.create({
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10
    },
    card: {
        width: '100%',
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginRight: 0,
        marginBottom: 15,
    },
    defaultFont: {
        fontSize: DEAFULT_FONT_SIZE
    }
});

export default FarmerWheatCard;