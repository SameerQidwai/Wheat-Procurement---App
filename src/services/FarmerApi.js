import axios from 'axios';
import { IP } from '../../Global'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';

export const getFarmers = async () => {
    const link = `${IP}/vendors`;
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

export const uploadPicture = async (image) => {
    const link = `${IP}/files`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    
    const images = new FormData();
    images.append('files', image)

    const header = {
        Authorization: token,
        // Accept: "application/json",
        // "Content-Type": "multipart/form-data",
        // 'content-Type': 'multipart/form-data'
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        // 'Content-Type': `multipart/form-data; boundary=${images._boundary}`,
    }
    console.log('Image Rec: ', image)
    console.log('DATA: ', images._parts)
    // console.dir(body, {'maxArrayLength': null, 'depth': null});

    
    try {
        const res = await axios.post(link, images, {headers: header});
        console.log('[RES]: ', res)
        // return(res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const addFarmer = async (firstName, lastName, cnic, phone, address, description) => {
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    const link = `${IP}/vendors/create`;
    
    const body = {
        firstName,
        lastName,
        phone,
        cnic,
        address,
        description,
        avatarId: null
    }

    const header = {
        Accept: 'application/json',
        Authorization: token
    }
    try {
        const res = await axios.post(link, body,{headers: header});
        return(res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const getFarmerById = async (id) => {
    const link = `${IP}/vendors/${id}`;
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

export const updateFarmerById = async (id, firstName, lastName, cnic, phone, address, description) => {
    const link = `${IP}/vendors/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    const body = {
        firstName,
        lastName,
        phone,
        cnic,
        address,
        description,
        avatarId: null
    }

    try {
        const res = await axios.patch(link, body, {headers: header})
        console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}

export const requestBardanaForFarmer = async (id, bardanaPP, bardanaJutt) => {
    const link = `${IP}/vendors/${id}/requestUpdate`;
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
        const res = await axios.patch(link, body, {headers: header})
        // console.log('RES: ', res.data)
        return(res.data)
    } catch(e){
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return({success: false})
    }
}