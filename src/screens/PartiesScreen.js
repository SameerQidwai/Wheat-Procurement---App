import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { BACK_COLOR, BASE_COLOR, GRAY_COLOR, HEADING, LOADING_GRAY_COLOR, MAIN_HEADING } from '../../Global';
import { Text, Icon, Input } from '@ui-kitten/components';

import FarmerDetailsCard from '../components/FarmerDetailsCard';
import AddPartyModal from './modals/AddPartyModal';
import FarmerOptionModal from './modals/FarmerOptionModal';
import BardanaModal from './modals/BardanaModal';
import { getFarmers } from '../services/FarmerApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

class PartiesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            farmerDetails: [],
            cnic: '',
            modalVisible: false,
            optionModal: false,
            reqBardana: false,
            modalType: '',
            farmerId: '',
            loading: true,
            requestedPP: '',
            requestedJute: ''
        }
    }

    componentDidMount() {
        this.getData()
    }

    storeExpiredToken = async () => {
        try {
            const jsonValue = JSON.stringify({
                institute: 'ABC',
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDNlODRjMDk1NmE5NGY0Yjc3YzMxOGY1MWNkYmVlNDg0YmE4OWRjNTRmMWY1MGU3YzliMWUyYjEwYjUwN2NjMWRiODExYWJiNTY3M2E2OWMiLCJpYXQiOjE2NDY4ODQ1OTQuNDU4NTkyLCJuYmYiOjE2NDY4ODQ1OTQuNDU4NTk0LCJleHAiOjE2Nzg0MjA1OTQuNDUzOTUsInN1YiI6IjQiLCJzY29wZXMiOltdfQ.yOYQ2-gWfIYVNkoisInBEfLjUxqInFrtNDXgozY37WuUIRLs0XyKcZd6l6Z9AMt9-_NWa3NlTe01tb0O2RWtdLP0C9RpS5B9Rct77LMtyFsWweyPu5oJfARngcM2tgkfXtvsUUWZGG1IMr0Ek1KswpoJ-0hbUE750hXz2ZpyHTs94z8mPNrsSA2JvCZkr4-gBkcDJ4ZeLtyPo4kwOBQZN9TgIlpo3kIxVtu2axDchwQVu1d0BkMtEBbQLc0hLlXuuT57wEXOuWcqHINcq7-XHp5sqwkqGmARi6yQN1ybjaUtZfmViSrhFWx1RL1Aoi9QVlk2nX-NBIcb1sqNhliasu4vJpu8MMsGrISWlsgOCHTRRX4uHuX3JEQf1iEqSa6OSeeBRcJExMGVL_lcO15bc66cnDQPVNIaD5KC27l4XOa14aR8ChsCR2sTV3WMUxAt9P1W--nhbChtvdHKjc_4KtFYnYGxnI6tJjCIS1DX5uLHwHyvds2-CVceO9cbgxTMX31fSyEPmxvB2uniwApOHHMj-n7OLuHCQ_s2-ifWhJylxtXeN3DhQ0Twz3ruTSJYH3QZiQ8JZsIxs4qg997dYIsNm_h7yIUrOjuy_OhL9pjpiaXXf9e0uemLiY3YrxfjLwjZ-aj4wLHD8s5S6t3M5rONMD-Iz1VmxrxBnF1iH-k',
                defaultPassword: 0
            })
            await AsyncStorage.setItem('@data', jsonValue)
            return
        } catch (e) {
            console.log('e --> ', e)
        }
    }

    getData() {
        getFarmers()
            .then((res) => {
                if (res.success) {
                    this.setState({
                        loading: false,
                        farmerDetails: res.data
                    })
                }
                else {
                    ToastAndroid.show(res.message, ToastAndroid.LONG)
                    this.setState({ loading: false })
                }
            }).catch((err) => {
                console.log('[ERR]: ', err)
            })
    }



    render() {
        const { farmerId, farmerDetails, cnic, modalVisible, optionModal, modalType, reqBardana, loading, requestedPP, requestedJute } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.headingFont}>Farmers</Text>
                        <TouchableOpacity
                            onPress={this.toggleModalState}
                            style={{
                                backgroundColor: BASE_COLOR,
                                width: 150,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20,
                                flexDirection: 'row'
                            }}>
                            <Icon
                                style={{
                                    width: 20,
                                    height: 20
                                }}
                                fill={BACK_COLOR}
                                name='plus-circle-outline'
                            />
                            <Text style={{ color: BACK_COLOR, fontWeight: 'bold', marginLeft: 5 }}>Add Farmer</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 15 }}>
                        {
                            farmerDetails.length > 0 ?
                                <FarmerDetailsCard
                                    data={farmerDetails}
                                    optionModal={this.toggleOptionModalState}
                                /> :
                                <EmptyList />
                        }
                    </View>
                    {modalVisible &&
                        <AddPartyModal
                            visible={modalVisible}
                            toggleModal={this.closeAllModals}
                            type={modalType}
                            farmerId={farmerId}
                        />
                    }
                    {optionModal &&
                        <FarmerOptionModal
                            visible={optionModal}
                            toggleModal={this.closeAllModals}
                            showSelectedModal={this.showSelectedModal}
                            farmerId={farmerId}
                        />
                    }
                    {reqBardana &&
                        <BardanaModal
                            visible={reqBardana}
                            toggleModal={this.closeAllModals}
                            type={modalType}
                            farmerId={farmerId}
                            pp={requestedPP}
                            jute={requestedJute}
                        />
                    }
                </View>
                {
                    loading ?
                        <View style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR }, StyleSheet.absoluteFill]}>
                            <ActivityIndicator size='large' color='white' />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Please Wait...</Text>
                        </View> :
                        null
                }
            </View>
        )
    }

    toggleModalState = () => {
        const { modalVisible } = this.state
        this.setState({
            modalVisible: !modalVisible,
            modalType: 'Add',
            farmerId: ''
        })
        this.getData()
    }

    closeAllModals = () => {
        this.setState({
            reqBardana: false,
            modalVisible: false,
            optionModal: false,
            farmerId: ''
        })
        this.getData()
    }

    toggleOptionModalState = (id, pp, jute) => {
        const { optionModal } = this.state
        this.setState({
            optionModal: !optionModal,
            farmerId: id,
            requestedPP: pp.toString(),
            requestedJute: jute.toString()
        })
        this.getData()
    }

    showSelectedModal = (type) => {
        const { modalVisible } = this.state
        if (type == 'Edit') {
            this.setState({
                optionModal: false,
                modalVisible: true,
                modalType: type
            })
        }
        else if (type == 'Request') {
            this.setState({
                optionModal: false,
                reqBardana: true,
                modalType: type
            })
        }
    }
};

const EmptyList = () => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40
        }}>
            <Icon
                style={{
                    width: 200,
                    height: 200,

                }}
                fill={GRAY_COLOR}
                name='archive-outline'
            />
            <Text style={{
                fontSize: HEADING,
                color: GRAY_COLOR,
                fontWeight: 'bold'
            }}>No Farmer Available...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACK_COLOR,
    },
    content: {
        flex: 1,
        margin: 15,
    },
    headingFont: {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black',
    },
    floatingButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BASE_COLOR,
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        right: 20,
        bottom: 30,
        shadowColor: BASE_COLOR,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6
    },
    fbText: {
        color: BACK_COLOR,
        fontSize: 34,
        fontWeight: 'bold'
    }
});

export default PartiesScreen;