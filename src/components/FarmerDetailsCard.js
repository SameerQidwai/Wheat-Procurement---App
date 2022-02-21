import React from 'react';
import { View , StyleSheet, ScrollView } from 'react-native';
import { BASE_COLOR, GRAY_COLOR, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

const FarmerDetailsCard = ({data}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        {
            data.map(({name, address, date, cnic}, index) => (
                <Card key={index+''} style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: GRAY_COLOR,
                            // marginLeft: -15,
                            marginRight: 15,
                            borderRadius: 50,
                            width: 60,
                            height: 60,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon 
                                style={{
                                width: 60, 
                                height: 60
                                }} 
                                fill='black' 
                                name='person'
                            />
                        </View>

                        <View style={{flex: 2}}>
                            <Text style={{fontSize: SUB_HEADING, color: 'black', fontWeight: 'bold'}}>{name}</Text>
                            <Text style={styles.defaultFont}>Address: {address}</Text>
                            <Text style={styles.defaultFont}>Date: {date}</Text>
                            <Text style={styles.defaultFont}>CNIC: {cnic}</Text>
                        </View>
                    </View>
                </Card>
            ))
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginRight: 0,
        marginBottom: 15,
    }
});

export default FarmerDetailsCard;