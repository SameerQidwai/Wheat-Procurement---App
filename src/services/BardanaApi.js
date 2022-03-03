import axios from 'axios';
import { IP } from '../../Global'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const getAllBardanas = async () => {
    const link = `${IP}/bardanas`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    try {
        const res = await axios.get(link, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const receiveBardanaFromDFC = async (bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/receive`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }
    
    const body = {
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }
    // console.log('Link: ', link)
    // console.log('Body: ', body)

    try {
        const res = await axios.post(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const getBardanaRecordById = async (id) => {
    const link = `${IP}/bardanas/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    try {
        const res = await axios.get(link, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const updateReceiveRecordById = async (id, bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/receive/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    const body = {
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }

    try {
        const res = await axios.patch(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const searchFarmerCnic = async (cnic) => {
    const link = `${IP}/vendors/search?cnic=${cnic}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    try {
        const res = await axios.get(link, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const alllocateBardanatoFarmer = async ( vendor, bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/allocate`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }
    
    const body = {
        vendor,
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }
    // console.log('Link: ', link)
    // console.log('Body: ', body)

    try {
        const res = await axios.post(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const returnBardanaFromFarmer = async ( returner, bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/return`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }
    
    const body = {
        returner,
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }
    // console.log('Link: ', link)
    // console.log('Body: ', body)

    try {
        const res = await axios.post(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const updateBardanaIssuedToFarmer = async ( id, vendor, bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/allocate/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }
    
    const body = {
        vendor,
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }

    try {
        const res = await axios.patch(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const updateBardanaReturnFromFarmer = async ( id, returner, bardanaPP, bardanaJutt) => {
    const link = `${IP}/bardanas/return/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }
    
    const body = {
        returner,
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP
    }

    try {
        const res = await axios.patch(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}