import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width, height } = Dimensions.get('window');

// API
// export const domain = 'http://192.168.0.244:8000';     //Trun-Office
// export const domain = 'http://192.168.0.49:8000';      //Trun-Zain-Home
// export const domain = 'http://192.168.0.107:8000';     //Trun-Home
// export const domain = 'http://192.168.43.82:8000';     //Trun-Data
// export const domain = 'http://192.168.0.243:8000';     //Shahzaib-Office
export const domain = 'https://wheat.gaamatech.com';      //Live-Domain
export const IP = `${domain}/api/v1`;
// export const IP = 'https://wheat.gaamatech.com/api'
// export const IP = 'https://bc80-103-194-95-100.ngrok.io/api'

// COLORS
export const BASE_COLOR = '#225622';                        //DARK-GREEN    (OFFICIAL)
export const BACK_COLOR = '#f7f6ff';                        //PURPLE
// export const GRAY_COLOR = 'rgba(27,27,51,0.6)';             //GRAY
export const GRAY_COLOR = 'rgba(27,27,51,0.3)';             //GRAY
export const LOADING_GRAY_COLOR = 'rgba(27,27,51,0.6)';     //GRAY
export const BLUE_ICON_BACK = '#0058FF1A';                  //BLUE ICON BACKGROUND
export const BLUE_ICON_FORE = '#0062FF';                     //BLUE ICON FOREGROUND
export const FAILURE = '#F0142F';                           //RED ARROW
export const SCUCESS = '#3DD598';                           //GREEN ARROW 
export const RED_PIE_COLOR = '#ef2f2f';                     //RED
export const BLUE_PIE_COLOR = '#0058FF';                    //BLUE
export const FIELD_BACK_COLOR = '#f8f9fd'                   //LIGHT GRAY
// 42198840

// FONT SIZES
export const BOLD_LARGE = 30;
export const MAIN_HEADING = 20;
export const HEADING = 18;
export const SUB_HEADING = 15;
export const DEAFULT_FONT_SIZE = 12;

export const WIDTH = width;
export const HEIGHT = height;


// SET USER-TOKEN
export const storeUserToken = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@data', jsonValue)
    return
  } catch (e) {
    console.log('e --> ', e)
  }
}

export const removeUserToken = async () => {
  try {
    await AsyncStorage.removeItem('@data')
    // this.getData()
  }
  catch (e) {
    console.log('e ==> ', e)
  }
}

export const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@data')
    if (jsonValue != null) {
      return { success: true, data: JSON.parse(jsonValue) }
    } else {
      return { success: false, data: {} }
    }
  } catch (e) {
    console.log('[ERR]: ', e)
  }
}

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('@data')
    return false
  }
  catch (e) {
    console.log('e ==> ', e)
  }
}