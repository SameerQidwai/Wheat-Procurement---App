import React from 'react';
import { View , StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { BASE_COLOR, GRAY_COLOR, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

const FarmerDetailsCard = ({data, optionModal}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        {
            data.map(({id, name, cnic, bardanaPPRequested, bardanaJuttRequested, avatar}, index) => (
                <Card key={index+''} style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex: 2}}>
                        <View style={{
                            backgroundColor: GRAY_COLOR,
                            marginLeft: -10,
                            borderRadius: 50,
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden'
                            
                        }}>{
                            avatar == null ?
                            <Icon 
                                style={{
                                width: 60, 
                                height: 60
                                }} 
                                fill='black' 
                                name='person'
                            /> :
                            <Image style={styles.fg} 
                                source={{uri: avatar}}
                            />
                        }
                        </View>
                        </View>
                        <View style={{flex: 6}}>
                            <Text style={{fontSize: SUB_HEADING, color: 'black', fontWeight: 'bold'}}>{name}</Text>
                            <Text style={styles.defaultFont}>CNIC: {cnic}</Text>
                            <Text style={styles.defaultFont}>Bags Requested (PP): {bardanaPPRequested}</Text>
                            <Text style={styles.defaultFont}>Bags Requested (Jute): {bardanaJuttRequested}</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                height: 100,
                                alignItems: 'flex-end',
                                justifyContent:'center',
                                flex: 1,
                            }}
                            onPress={()=>optionModal(id, bardanaPPRequested, bardanaJuttRequested)}
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
                </Card>
            ))
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        // width: '100%',
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginBottom: 15,
    },
    fg:{
        height: '100%',
        width: '100%'
    },
});

export default FarmerDetailsCard;