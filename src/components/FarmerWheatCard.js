import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { BASE_COLOR, DEAFULT_FONT_SIZE, GRAY_COLOR, MAIN_HEADING, SUB_HEADING } from '../../Global';
import { Card, Icon, Text } from '@ui-kitten/components';

const FarmerWheatCard = ({data, entries}) => {
    return(
        <View style={{maxHeight: 500}}>
        {
            entries ?
            <Text style={styles.headingFont}>Entries</Text> :
            <Text style={styles.headingFont}>Recent Wheat Procurement</Text>
        }
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        {
            data.map(({name, date, bags, nw, gw, billNo, pp, jute}, index) => (
                <Card key={index+''} style={styles.card}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: GRAY_COLOR,
                            marginLeft: -15,
                            marginRight: 12,
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
                            <Text style={styles.defaultFont}>Date: {date}</Text>
                            {
                                entries ? 
                                <Text style={styles.defaultFont}>Bill No: {billNo}</Text> :
                                <Text style={styles.defaultFont}>No. of Bags: {bags}</Text>
                            }
                        </View>
                        
                        <View style={{flex: 2, marginLeft: 'auto'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                {
                                    entries ?
                                    <View >
                                        <Text style={{fontSize: 8}}>Quantity(Jute)</Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{jute} Bags</Text>
                                    </View> :
                                    <View></View>
                                }

                                <View style={{alignItems: 'flex-end'}}>
                                    <Icon 
                                        style={{
                                        width: 25, 
                                        height: 25
                                        }} 
                                        fill='black' 
                                        name='edit-outline'
                                    />
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                {
                                    entries ?
                                    <> 
                                    <View >
                                        <Text style={{fontSize: 8}}>Quantity(PP)</Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{pp} Bags</Text>
                                    </View> 
                                    <View >
                                        <Text style={{fontSize: 8}}>Net Weight</Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{nw}K</Text>
                                    </View>
                                    </>
                                    :
                                    <>
                                    <View >
                                        <Text style={{fontSize: 8}}>Net Weight</Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{nw}K</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize: 8}}>Gross Weight</Text>
                                        <Text style={{color: 'black', fontWeight: 'bold'}}>{gw}K</Text>
                                    </View>
                                    </>
                                }
                                
                            </View>
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

export default FarmerWheatCard;