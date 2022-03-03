import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { BASE_COLOR, DEAFULT_FONT_SIZE, GRAY_COLOR, MAIN_HEADING, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

const RequestBardanaCard = ({data, optionModal}) => {
    return(
        <View>
        <Text style={styles.headingFont}>Records</Text> 
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {
            data.map(({name, sender, date, bardanaPP, bardanaJutt, cnic, type,id, isEditable}, index) => (
                <Card key={index+''} style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <View style={{flex: 3}}>
                            <Text style={{fontSize: SUB_HEADING, color: 'black', fontWeight: 'bold'}}>{name}</Text>
                            <Text style={styles.defaultFont}>Date: {date}</Text>
                            <Text style={styles.defaultFont}>{cnic ? `CNIC: ${cnic}` : ''}</Text>
                        </View>
                        
                        <View style={{flex: 2, marginLeft: 'auto'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <View >
                                    <Text style={{fontSize: 8}}>PP Bags</Text>
                                    <Text style={{color: type == 'Return' ? 'red' : 'green', fontWeight: 'bold'}}>{bardanaPP}</Text>
                                </View> 
                                <View style={{marginLeft: 5}}>
                                    <Text style={{fontSize: 8}}>Jute Bags</Text>
                                    <Text style={{color: type == 'Return' ? 'red' : 'green', fontWeight: 'bold'}}>{bardanaJutt}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end', 
                                    marginLeft: 40,
                                    justifyContent:'center',
                                }}
                                onPress={()=>optionModal(sender, id, type, isEditable)}
                            >
                                <Icon 
                                    style={{
                                    width: 25, 
                                    height: 25
                                    }} 
                                    fill='black' 
                                    name='more-vertical-outline'
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card>
            ))
        }
            
        </ScrollView>
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

export default RequestBardanaCard;