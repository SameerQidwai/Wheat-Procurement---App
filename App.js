import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Keyboard, PermissionsAndroid, View, ToastAndroid, ActivityIndicator, Image, TouchableWithoutFeedback } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, LOADING_GRAY_COLOR, IP, } from './Global';
import { ApplicationProvider, IconRegistry, Text, Input, Modal, Icon } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'
import SplashScreen from 'react-native-splash-screen'
import AuthNavigator from './src/navigation/AuthNavigator'
import LoginScreen from './src/screens/LoginScreen';
import { getStats } from './src/services/HomeApi';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.getData();
    this.state = {
      data: {},
      visible: false,
      keyboardSize: 0,
      password: '',
      confirm: '',
      secureTextEntry: true,
      passwordError: false,
      confirmError: false,
      confirmationError: false
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    this.requestCameraPermission();
    Keyboard.addListener("keyboardDidShow", (e) => {
      this.setState({ keyboardSize: e.endCoordinates.height })
    })

    Keyboard.addListener("keyboardDidHide", (e) => {
      this.setState({ keyboardSize: e.endCoordinates.height })
    })
  }

  componentWillUnmount() {
    Keyboard.removeAllListeners("keyboardDidShow");
    Keyboard.removeAllListeners("keyboardDidHide");
  }

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@data')
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue)
        this.verifyUserToken()
          .then(
            async (res) => {
              let status = res.message === 'Unauthenticated.'
              this.setState({
                data: status ? {} : data,
                visible: (!status && data.defaultPassword == 1) ? true : false,
              })
              if (status) {
                await AsyncStorage.removeItem('@data')
              }
            }
          )
      } else {
        this.setState({ data: {} })
      }
    } catch (e) {
      console.log('[ERR]: ', e)
    }
  }

  removeData = async () => {
    try {
      await AsyncStorage.removeItem('@data')
      this.getData()
    }
    catch (e) {
      console.log('e ==> ', e)
    }
  }

  //JWT expire API
  verifyUserToken = async () => {
    const link = `${IP}/verify-token`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
      Authorization: token
    }

    try {
      const res = await axios.get(link, { headers: header })
      // console.log('RES: ', res.data)
      return (res.data)
    } catch (e) {
      // console.log('e -> ', e.response.data);
      ToastAndroid.show(e?.response?.data?.message ?? 'Something Went Wrong', ToastAndroid.LONG)
      return ({ success: false, message: e?.response?.data?.message })
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

  toggleSecureEntry = () => {
    const { secureTextEntry } = this.state;
    this.setState({ secureTextEntry: !secureTextEntry })
  };

  renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
      <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  validateForm = () => {
    const { password, confirm } = this.state;

    if (password && confirm) {
      this.setState({
        passwordError: false,
        confirmError: false
      })
      return true;
    }
    else {
      if (!password) {
        this.setState({ passwordError: true })
      }
      else {
        this.setState({ passwordError: false })
      }
      if (!confirm) {
        this.setState({ confirmError: true })
      }
      else {
        this.setState({ confirmError: false })
      }
    }
  }
  resetPassword = async () => {
    // this.setState({ visible: false });
    const { password, confirm } = this.state;
    const validateForm = this.validateForm()
    if (validateForm) {
      if (password !== confirm) {
        this.setState({ confirmationError: true })
      }
      else {
        this.setState({ confirmationError: false })
        const link = `${IP}/reset-password`;
        let jsonValue = await AsyncStorage.getItem('@data')
        const token = "Bearer " + JSON.parse(jsonValue).token

        const header = {
          Authorization: token
        }

        const body = {
          password: password,
          password_confirmation: confirm
        }

        try {
          const res = await axios.post(link, body, { headers: header })
          // console.log('HERE 189', res.data)
          if (res?.data?.success) {
            this.setState({ visible: false })
            ToastAndroid.show(res?.data?.message, ToastAndroid.LONG)
            jsonValue = JSON.parse(jsonValue);
            jsonValue.defaultPassword = 0
            try {
              jsonValue = JSON.stringify(jsonValue)
              await AsyncStorage.setItem('@data', jsonValue)
              return
            } catch (e) {
              console.log('e --> ', e)
            }
          }
          // console.log('RES: ', res.data)
          // return (res.data)
        } catch (e) {
          // console.log('e -> ', e.response.data);
          ToastAndroid.show(e?.response?.data?.message ?? 'Something Went Wrong', ToastAndroid.LONG)
          return ({ success: false, message: e?.response?.data?.message })
        }
      }
    }
  }

  render() {
    const { data, loading, visible, keyboardSize, password, confirm, secureTextEntry, passwordError, confirmError, confirmationError } = this.state;
    // console.log('Data: ', data)
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {data ? (data['token'] ? <AppNavigator institute={data.institute} removeData={this.removeData} /> : <LoginScreen setData={this.getData} />) : null}
          </NavigationContainer>
        </ApplicationProvider>
        {
          visible &&
          <Modal
            backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
            visible={visible}
          >
            <View style={styles.centeredView}>
              <View style={[styles.modalView, { marginBottom: keyboardSize + 50 }]}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.modalHeader}>Reset Password</Text>
                </View>

                <Input
                  style={{ marginTop: '5%' }}
                  defaultValue={password}
                  label={() => {
                    return (
                      <Text style={styles.lableStyle}>Password</Text>
                    )
                  }}
                  caption={() => (
                    passwordError ?
                      <Text style={styles.captionText}>Password Required</Text>
                      : null
                  )}
                  placeholder='Password'
                  accessoryRight={this.renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={nextValue => this.setState({ password: nextValue })}
                />

                <Input
                  style={{ marginTop: '5%' }}
                  defaultValue={confirm}
                  label={() => {
                    return (
                      <Text style={styles.lableStyle}>Confirm Password</Text>
                    )
                  }}
                  caption={() => (
                    confirmError ?
                      <Text style={styles.captionText}>Confirmation Required</Text>
                      : (confirmationError && <Text style={styles.captionText}>Passwords does not match</Text>)
                  )}
                  placeholder='Confirm Password'
                  accessoryRight={this.renderIcon}
                  secureTextEntry={secureTextEntry}
                  onChangeText={nextValue => this.setState({ confirm: nextValue })}
                />

                <TouchableOpacity style={{
                  borderRadius: 50,
                  backgroundColor: BASE_COLOR,
                  width: '100%',
                  height: '12%',
                  marginTop: '5%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                  onPress={() => { this.resetPassword() }}
                >
                  <Text style={{ color: 'white' }}>Reset Password</Text>
                </TouchableOpacity>
                {
                  loading ?
                    <View style={
                      [
                        {
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: LOADING_GRAY_COLOR,
                          borderRadius: 20
                        },
                        StyleSheet.absoluteFill
                      ]}>
                      <ActivityIndicator size='large' color='white' />
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Please Wait...</Text>
                    </View> :
                    null
                }
              </View>
            </View>
          </Modal>
        }
      </>
    )
  }
}


export default App;

// const Loading = () => (
//   <View style={{
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   }}>
//     <Image style={{ width: 200, height: 200 }} source={require('./assets/FoodDept.png')} />
//     <Text>Loading...</Text>
//   </View>
// )

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: BASE_COLOR,
    paddingHorizontal: 35,
    paddingVertical: 20,
    width: 350,
    height: 325
  },
  modalHeader: {
    marginBottom: 5,
    fontSize: 24,
    fontWeight: 'bold',
    color: BASE_COLOR
  },
  lableStyle: {
    color: BASE_COLOR,
    fontWeight: 'bold',
    marginTop: '5%',
    fontSize: DEAFULT_FONT_SIZE
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
  },
})

// Expired-Token: 
// eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDNlODRjMDk1NmE5NGY0Yjc3YzMxOGY1MWNkYmVlNDg0YmE4OWRjNTRmMWY1MGU3YzliMWUyYjEwYjUwN2NjMWRiODExYWJiNTY3M2E2OWMiLCJpYXQiOjE2NDY4ODQ1OTQuNDU4NTkyLCJuYmYiOjE2NDY4ODQ1OTQuNDU4NTk0LCJleHAiOjE2Nzg0MjA1OTQuNDUzOTUsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.yOYQ2-gWfIYVNkoisInBEfLjUxqInFrtNDXgozY37WuUIRLs0XyKcZd6l6Z9AMt9-_NWa3NlTe01tb0O2RWtdLP0C9RpS5B9Rct77LMtyFsWweyPu5oJfARngcM2tgkfXtvsUUWZGG1IMr0Ek1KswpoJ-0hbUE750hXz2ZpyHTs94z8mPNrsSA2JvCZkr4-gBkcDJ4ZeLtyPo4kwOBQZN9TgIlpo3kIxVtu2axDchwQVu1d0BkMtEBbQLc0hLlXuuT57wEXOuWcqHINcq7-XHp5sqwkqGmARi6yQN1ybjaUtZfmViSrhFWx1RL1Aoi9QVlk2nX-NBIcb1sqNhliasu4vJpu8MMsGrISWlsgOCHTRRX4uHuX3JEQf1iEqSa6OSeeBRcJExMGVL_lcO15bc66cnDQPVNIaD5KC27l4XOa14aR8ChsCR2sTV3WMUxAt9P1W--nhbChtvdHKjc_4KtFYnYGxnI6tJjCIS1DX5uLHwHyvds2-CVceO9cbgxTMX31fSyEPmxvB2uniwApOHHMj-n7OLuHCQ_s2-ifWhJylxtXeN3DhQ0Twz3ruTSJYH3QZiQ8JZsIxs4qg997dYIsNm_h7yIUrOjuy_OhL9pjpiaXXf9e0uemLiY3YrxfjLwjZ-aj4wLHD8s5S6t3M5rONMD-Iz1VmxrxBnF1iH-k