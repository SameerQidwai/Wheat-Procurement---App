import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { PermissionsAndroid, View, ActivityIndicator, Image, Text } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from 'react-native-splash-screen'
import  AuthNavigator from './src/navigation/AuthNavigator'
import LoginScreen from './src/screens/LoginScreen';

class App extends Component {
  constructor(props){
    super(props);
    this.getData();
    this.state = {
      data: {},
      loading: true
    }
  }

  componentDidMount(){
    SplashScreen.hide();
    this.requestCameraPermission();
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data')
      if(jsonValue != null){
        return(this.setState({
          data: JSON.parse(jsonValue),
          loading: false
        }))
      }else{
        this.setState({data:{}, loading: false})
      }
    } catch(e) {
      console.log('[ERR]: ', e)
    }
  }

  removeData = async () =>{
    try{
      await AsyncStorage.removeItem('@data')
      this.getData()
    }
    catch(e){
      console.log('e ==> ', e)
    }
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

  render(){
    const { data, loading } = this.state;
    // console.log('Data: ', data)
    return(
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {/* {
              loading ?
              <Loading /> :
              (data['token'] ? <AppNavigator/> : <AuthNavigator/>)
            } */}
            {data ? (data['token'] ? <AppNavigator institute={data.institute} removeData={this.removeData}/> : <LoginScreen setData={this.getData}/>) : <Loading/>}
          </NavigationContainer>
        </ApplicationProvider>
      </>
    )
  }
}


export default App;

const Loading = () => (
  <View style={{
    flex: 1, 
    justifyContent:'center',
    alignItems: 'center'
}}>
    <Image style={{width: 200, height: 200}} source={require('./assets/FoodDept.png')}/>
    <Text>Loading...</Text>
</View>
)