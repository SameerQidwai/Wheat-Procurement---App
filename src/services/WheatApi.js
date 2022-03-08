import axios from 'axios';
import { IP } from '../../Global'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const getWheatRecords = async () => {
    const link = `${IP}/submissions`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    // console.log('[VAL]: ', token)
    const header = {
        Accept: 'application/json',
        Authorization: token
    }
    try {
        const res = await axios.get(link, {headers: header});
        // console.log('[RES]: ', res.data.data)
        return(res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const addProcureWheat = async(vendor, bardanaPP, bardanaJutt, wheatWeight, billNo, billId) => {
    const link = `${IP}/bardanas/submit`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    
    const header = {
        Accept: 'application/json',
        Authorization: token
    }

    const body = {
        vendor, 
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaJutt, 
        wheatWeight, 
        billNo,
        billId
    }

    try {
        const res = await axios.post(link, body, {headers: header});
        // console.log('[RES]: ', res)
        return(res.data)
    } catch (e) {
        // console.error('e -> ', e);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const getWheatRecordById = async (id) => {
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

export const updateWheatRecord = async(id, vendor, bardanaPP, bardanaJutt, wheatWeight, billNo, billId) => {
    const link = `${IP}/bardanas/submit/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    
    const header = {
        Accept: 'application/json',
        Authorization: token
    }

    const body = {
        vendor, 
        bardanaPP: bardanaPP == '' ? 0 : bardanaPP, 
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaPP,
        wheatWeight, 
        billNo,
        billId
    }

    try {
        const res = await axios.patch(link, body, {headers: header});
        // console.log('[RES]: ', res.data.data)
        return(res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const deleteWheatById = async (id) => {
    const link = `${IP}/bardanas/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    try {
        const res = await axios.delete(link, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }

}