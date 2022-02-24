import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { PermissionsAndroid } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './src/screens/LoginScreen';
import AppNavigator from './src/navigation/AppNavigator'

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user : false
    }
  }

  componentDidMount(){
      this.requestCameraPermission()
  }

  requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        } else {
        console.log('Camera permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
  };

  setUser = () => {
    this.setState({user: true})
  }

  render() {
    const { user } = this.state
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {user ? <AppNavigator /> : <LoginScreen callback={this.setUser} />}
          </NavigationContainer>
        </ApplicationProvider>
      </>
    )
  }
}

export default App;