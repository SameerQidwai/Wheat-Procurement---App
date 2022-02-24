import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import PartiesScreen from '../screens/PartiesScreen';
import WheatScreen from '../screens/WheatScreen';
import BardanaScreen from '../screens/BardanaScreen';
import ReceiveBardana from '../screens/ReceiveBardana';
import RequestBardana from '../screens/RequestBardana';

import { BACK_COLOR, BASE_COLOR, GRAY_COLOR } from '../../Global';

const Drawer = createDrawerNavigator();

class AppNavigator extends Component{
    render(){
        return (
            <Drawer.Navigator 
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    headerRight: () => (
                        <View style={{
                            backgroundColor: GRAY_COLOR,
                            margin: 15,
                            borderRadius: 50
                        }}>
                            <Icon 
                                style={{
                                width: 40, 
                                height: 40
                                }} 
                                fill='black' 
                                name='person'
                            />
                        </View>
                    ),
                    headerTitle: 'Center Name',
                    headerStyle: {
                        backgroundColor: BACK_COLOR,
                        elevation: 0,
                        borderBottomWidth: 0,
                        shadowColor: 'transparent',
                    },
                    drawerStyle: {
                        backgroundColor: BASE_COLOR,
                        width: 240,
                    },
                    drawerActiveTintColor:'white',
                    drawerInactiveTintColor: 'white'
                })}
            >
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Farmers" component={PartiesScreen} />
                <Drawer.Screen name="Procure Wheat" component={WheatScreen} />
                <Drawer.Screen name="Account Bardana" component={BardanaScreen} />
                <Drawer.Screen name="Request Bardana" component={RequestBardana} />
                <Drawer.Screen name="Receive Bardana" component={ReceiveBardana} />
            </Drawer.Navigator>
        );
    }
}

export default AppNavigator;