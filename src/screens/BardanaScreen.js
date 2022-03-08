import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { BACK_COLOR, BASE_COLOR, MAIN_HEADING, LOADING_GRAY_COLOR, GRAY_COLOR, HEADING, DEAFULT_FONT_SIZE } from '../../Global';
import { Text, Icon, Input } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import RequestBardanaCard from '../components/RequestBardanaCard';
import BardanaModal from './modals/BardanaModal';
import BardanaOptionModal from './modals/BardanaOptionModal';
import { getAllBardanas } from '../services/BardanaApi';
import BardanaOptionModal2 from './modals/BardanaOptionModal2';

class BardanaScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Bardana Procured',
                    value: '13/25',
                    icon: 'refresh',
                    difference: '2.3%',
                    change: 'inc'
                },
                {
                    heading: 'Bags Filled',
                    value: '13/25',
                    icon: 'refresh',
                    difference: '2.1%',
                    change: 'inc'
                }
            ],
            cnic: '',
            farmerArray: [],
            allFarmersArray: [],
            optionModal: false,
            optionModal2: false,
            modalVisible: false,
            modalType: '',
            receiveFrom: '',
            recordId: '',
            type: '',
            loading: false,
            isEditable: true
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        this.setState({loading: true})
        getAllBardanas()
        .then((res)=> {
            if(res.success){
                this.setState({
                    farmerArray: res.data,
                    allFarmersArray: res.data, 
                    loading: false
                })
            }
            else{
                ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
        })
    }

    filterBardana(val){
        const {farmerArray, allFarmersArray} = this.state
        if(val == ''){
            this.setState({
                farmerArray: allFarmersArray,
                cnic: val
            })
        }else{
            this.setState({
                cnic: val,
                farmerArray: allFarmersArray.filter((farmer) => {
                    console.log('FARMER: ', farmer)
                    console.log('VAL: ', val)
                    return(
                        farmer.cnic ?
                        farmer.cnic.replaceAll('-', '').includes(val) :
                        null
                    )
                })
            })
        }
    }

    render(){
        const { type, infoCardArray, farmerArray, cnic, modalVisible, modalType, optionModal,optionModal2, receiveFrom,recordId, loading,isEditable } = this.state;
        console.log('R-ID: ', recordId)
        console.log('Edit: ', isEditable)
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.headingFont}>Bardana</Text>
                        <TouchableOpacity
                            onPress={()=>this.toggleOptionModalState()}
                        >
                            <Icon 
                                style={{
                                width: 30, 
                                height: 30,                                    
                                }} 
                                fill={BASE_COLOR} 
                                name='more-vertical-outline'
                            />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <Input
                            value={cnic}
                            placeholder='XXXXX-XXXXXXX-X'
                            keyboardType='number-pad'
                            maxLength={13}
                            onChangeText={nextValue => this.filterBardana(nextValue)}
                        />
                        <View style={{marginTop: 15}}>
                            {
                                farmerArray.length > 0 ?
                                <RequestBardanaCard 
                                    data={farmerArray}
                                    optionModal={this.toggleOptionModalState2}
                                /> : 
                                <EmptyList/>
                            }
                        </View>
                    </ScrollView>
                    {modalVisible &&
                        <BardanaModal
                            visible={modalVisible}
                            toggleModal={this.closeAllModals}
                            type={modalType}
                            modalType={type}
                            receiveFrom={receiveFrom}
                            recordId={recordId}
                        />
                    }
                    {optionModal &&
                        <BardanaOptionModal
                            visible={optionModal}
                            toggleModal={this.toggleOptionModalState}
                            toggleOptionsModal={this.toggleModalState}  
                        />
                    }
                    {optionModal2 &&
                        <BardanaOptionModal2
                            visible={optionModal2}
                            toggleModal={this.closeAllModals}
                            showSelectedModal={this.showSelectedModal}
                            isEditable={isEditable}
                            recordId={recordId}
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

    toggleOptionModalState = () =>{
        const { optionModal } = this.state
        this.setState({
            optionModal: !optionModal
        })
        this.getData()
    }
    toggleOptionModalState2 = (sender, id, type, isEditable) =>{
        const { optionModal2 } = this.state
        this.setState({
            optionModal2: !optionModal2,
            receiveFrom: sender,
            recordId: id,
            type: type,
            isEditable
        })
        this.getData()
    }

    toggleModalState = (type) =>{
        const { modalVisible, optionModal } = this.state
        this.setState({
            optionModal: false,
            modalVisible: !modalVisible,
            modalType: type,
            // receiveFrom: from
        })
        this.getData()
    }
    closeAllModals = () => {
        this.setState({
            modalVisible: false,
            optionModal: false,
            optionModal2: false,
            recordId: '',
            receiveFrom: '',
            modalType: ''
        })
        this.getData()
    }

    showSelectedModal = (type) =>{
        if(type == 'Edit'){
            this.setState({
                optionModal2: false,
                modalVisible: true,
                modalType: type,
            })
        }
        this.getData()
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
                }}>No Bardana Record Available...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACK_COLOR
    },
    content: {
        flex: 1,
        margin: 15,
    },
    headingFont : {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black'
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
    },
    lableStyle: {
        color: BASE_COLOR, 
        fontWeight: 'bold',
        fontSize: DEAFULT_FONT_SIZE
    },
});

export default BardanaScreen;