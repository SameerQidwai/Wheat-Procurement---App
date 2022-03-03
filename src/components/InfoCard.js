import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, Text } from '@ui-kitten/components';
import { BASE_COLOR, BLUE_ICON_BACK, BLUE_ICON_FORE, BOLD_LARGE, FAILURE, HEADING, SCUCESS, SUB_HEADING } from '../../Global';

const InfoCard = ({data, horizontal}) => {
    return(        
        <ScrollView horizontal={horizontal} showsHorizontalScrollIndicator={!horizontal}>
        {
            data.map(({heading, value, icon, difference, change}, index) => (
                <Card key={index+''} style={[styles.card, {width: horizontal ? 275 : '100%'}]}>
                    <Text style={{fontSize: HEADING}}>{heading}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style= {{
                            fontSize: BOLD_LARGE, 
                            fontWeight: 'bold', 
                            color: 'black'
                            }}>{value} MT
                        </Text>

                        <View style={{
                            backgroundColor: BLUE_ICON_BACK,
                            borderRadius: 50,
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Icon 
                                style={{
                                width: 30, 
                                height: 30
                                }} 
                                fill={BASE_COLOR} 
                                name={icon}
                            />
                        </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={{
                            color: change == 'inc' ? SCUCESS : FAILURE, 
                            fontSize: SUB_HEADING
                            }}>{difference}</Text>
                        <Icon 
                            style={{
                            width: 20, 
                            height: 20
                            }} 
                            fill={change == 'inc' ? SCUCESS : FAILURE} 
                            name={change == 'inc' ? 'arrow-upward' : 'arrow-downward'}
                        />
                        <Text style={{fontSize: SUB_HEADING}}>  than last year</Text>
                    </View>
                </Card>
            ))
        }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginRight: 15,
        marginBottom: 15,
        height: 110
    },
});

export default InfoCard;