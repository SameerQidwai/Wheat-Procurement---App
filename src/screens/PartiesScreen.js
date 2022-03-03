import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { BACK_COLOR, BASE_COLOR, GRAY_COLOR, HEADING, LOADING_GRAY_COLOR, MAIN_HEADING } from '../../Global';
import { Text, Icon } from '@ui-kitten/components';

import FarmerDetailsCard from '../components/FarmerDetailsCard';
import AddPartyModal from './modals/AddPartyModal';
import FarmerOptionModal from './modals/FarmerOptionModal';
import BardanaModal from './modals/BardanaModal';
import { getFarmers } from '../services/FarmerApi';
class PartiesScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            farmerDetails: [],
            modalVisible: false,
            optionModal: false,
            reqBardana: false,
            modalType: '',
            farmerId: '',
            loading: true
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        getFarmers()
        .then((res)=>{
            if(res.success){
                this.setState({loading: false, 
                    farmerDetails: res.data
                })
            }
            else{
                ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
        }).catch((err) => {
            console.log('[ERR]: ', err)
        })
    }


    render(){
        const { farmerId, farmerDetails, modalVisible, optionModal, modalType, reqBardana, loading } = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                            <Text style={{color: BACK_COLOR, fontWeight: 'bold', marginLeft: 5}}>Add Farmer</Text>
                        </TouchableOpacity>
                    </View>
                    {/* {loading &&
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator/>
                        </View>
                    } */}
                    <View style={{marginVertical: 15}}>
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
                        />
                    }
                    {reqBardana &&
                        <BardanaModal
                            visible={reqBardana}
                            toggleModal={this.closeAllModals}
                            type={modalType}
                            farmerId={farmerId}
                        />
                    }
                </View>
                    {
                    loading ?
                    <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR},StyleSheet.absoluteFill]}>
                        <ActivityIndicator size='large' color= 'white'/>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Please Wait...</Text>
                    </View> :
                    null
                    }
            </View>
        )
    }

    toggleModalState = () =>{
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

    toggleOptionModalState = (id) =>{
        const { optionModal } = this.state
        this.setState({optionModal: !optionModal, farmerId: id})
        this.getData()
    }

    showSelectedModal = (type) =>{
        const { modalVisible } = this.state
        if(type == 'Edit'){
            this.setState({
                optionModal: false,
                modalVisible: true,
                modalType: type
            })
        }
        else if(type == 'Request'){
            this.setState({
                optionModal: false,
                reqBardana: true,
                modalType: type
            })
        }
    }
};

const EmptyList = () => {
    return(
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
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black',
    },
    floatingButton:{
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
    fbText:{
        color: BACK_COLOR, 
        fontSize: 34, 
        fontWeight: 'bold'
    }
});

export default PartiesScreen;