import React, { Component } from 'react';
import { View, StyleSheet, ScrollView,TouchableOpacity, ActivityIndicator } from 'react-native';
import { BACK_COLOR, BASE_COLOR, MAIN_HEADING, LOADING_GRAY_COLOR, HEADING, GRAY_COLOR } from '../../Global';
import { Text, Icon } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import FarmerWheatCard from '../components/FarmerWheatCard';
import AddWheatModal from './modals/AddWheatModal';
import WheatOptionModal from './modals/WheatOptionModal'
import { getWheatRecords } from '../services/WheatApi';
class WheatScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Wheat Procured',
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
            farmerArray: [],
            modalVisible: false,
            optionModal: false,
            loading: true,
            farmerId: '',
            recordId: '',
            modalType: '',
            isEditable: true
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        getWheatRecords()
        .then((res) => {
            if(res.success){
                this.setState({farmerArray: res.data, loading: false})
            }
            else{
                ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
        })
        .catch((err)=> {
            console.log('[Err]: ', err)
        })
    }
    
    render(){
        const { infoCardArray, farmerArray, modalVisible, loading, optionModal, farmerId, modalType, recordId, isEditable } = this.state;
        console.log('R-ID: ', recordId)
        console.log('Edit: ', isEditable)
        // console.log('M: ', modalType)
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.headingFont}>Wheat</Text>
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
                            <Text style={{color: BACK_COLOR, fontWeight: 'bold', marginLeft: 5}}>Procure Wheat</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <View>
                            <InfoCard data={infoCardArray} horizontal={true}/>
                        </View>
                        <View>
                            {
                                farmerArray.length > 0 ?
                                <FarmerWheatCard 
                                    data={farmerArray} 
                                    entries={true}
                                    optionModal={this.toggleOptionModalState}
                                /> :
                                <EmptyList/>
                            }
                        </View>
                    </ScrollView>
                    {modalVisible &&
                        <AddWheatModal
                            visible={modalVisible}
                            toggleModal={this.closeAllModals}
                            recordId={recordId}
                            type={modalType}
                        />
                    }
                    {optionModal &&
                        <WheatOptionModal
                            visible={optionModal}
                            toggleModal={this.closeAllModals}
                            showSelectedModal={this.showSelectedModal}
                            isEditable={isEditable}
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
        this.setState({modalVisible: !modalVisible})
        this.getData()
    }

    toggleOptionModalState = (id, isEditable) =>{
        const { optionModal } = this.state
        this.setState({
            optionModal: !optionModal, 
            recordId: id,
            isEditable
        })
        this.getData()
    }
    closeAllModals = () => {
        this.setState({
            modalVisible: false,
            optionModal: false,
            farmerId: '',
            recordId: '',
            modalType: ''
        })
        this.getData()
    }

    showSelectedModal = (type) =>{
        if(type == 'Edit'){
            this.setState({
                optionModal: false,
                modalVisible: true,
                modalType: type
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
                }}>No Wheat Record Available...</Text>
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
    }
});

export default WheatScreen;