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
        const res = await axios.get(link, { headers: header });
        // console.log('[RES]: ', res.data.data)
        return (res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
    }
}

export const uploadPicture = async (image) => {
    const link = `${IP}/files`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const images = new FormData();
    images.append(`files[]`, image[0])

    const data = {
        method: 'POST',
        headers: { Authorization: token },
        body: images
    }
    // console.log('Request Body: ', images);


    try {
        const res = await fetch(link, data)
        const json = await res.json();
        // console.log('[RES]: ', json)
        return (json)
    } catch (e) {
        // console.log('e -> ', e);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
    }
}

export const addFarmer = async (name, fatherName, cnic, phone, address, description, avatarId) => {
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token
    const link = `${IP}/vendors/create`;

    const body = {
        name,
        fatherName,
        phone,
        cnic,
        address,
        description,
        avatarId
    }

    const header = {
        Accept: 'application/json',
        Authorization: token
    }
    try {
        const res = await axios.post(link, body, { headers: header });
        // console.log('Res', res)
        return (res.data)
    } catch (e) {
        console.log('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
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
        const res = await axios.get(link, { headers: header })
        // console.log('RES: ', res.data)
        return (res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
    }
}

export const updateFarmerById = async (id, name, fatherName, cnic, phone, address, description) => {
    const link = `${IP}/vendors/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    const body = {
        name,
        fatherName,
        phone,
        cnic,
        address,
        description,
        avatarId: null
    }

    try {
        const res = await axios.patch(link, body, { headers: header })
        // console.log('RES: ', res.data)
        return (res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
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
        bardanaJutt: bardanaJutt == '' ? 0 : bardanaJutt
    }
    // console.log('Link: ', link)
    // console.log('Body: ', body)

    try {
        const res = await axios.patch(link, body, { headers: header })
        // console.log('RES: ', res.data)
        return (res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
    }
}

export const deleteFarmerById = async (id) => {
    const link = `${IP}/vendors/${id}`;
    const jsonValue = await AsyncStorage.getItem('@data')
    const token = "Bearer " + JSON.parse(jsonValue).token

    const header = {
        Authorization: token
    }

    try {
        const res = await axios.delete(link, { headers: header })
        // console.log('RES: ', res.data)
        return (res.data)
    } catch (e) {
        // console.error('e -> ', e.response.data.message);
        ToastAndroid.show(e.response.data.message, ToastAndroid.LONG)
        return ({ success: false })
    }

}