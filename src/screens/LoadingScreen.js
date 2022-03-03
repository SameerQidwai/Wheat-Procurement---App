import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { BASE_COLOR } from '../../Global'
function LoadingScreen (props) {
    console.log('Props: ', props)
    return(
        <View style={{
            flex: 1, 
            justifyContent:'center',
            alignItems: 'center'
        }}>
            <Image style={{width: 200, height: 200}} source={require('../../assets/FoodDept.png')}/>
        </View>
    )
}
export default LoadingScreen;