import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native';
import { BACK_COLOR, BASE_COLOR, BLUE_PIE_COLOR, GRAY_COLOR, LOADING_GRAY_COLOR, MAIN_HEADING, RED_PIE_COLOR } from '../../Global';
import { Text } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import BreakdownPieChart from '../components/BreakdownPieChart';
import FarmerWheatCard from '../components/FarmerWheatCard';
import { getWheatRecords } from '../services/WheatApi';
import { getStats } from '../services/HomeApi';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Total Target',
                    value: 1,
                    icon: 'bookmark',
                    difference: '100%',
                    change: 'inc'
                },
                {
                    heading: 'Total Wheat Collected',
                    value: 1,
                    icon: 'award',
                    difference: '100%',
                    change: 'inc'
                },
            ],
            farmerArray: [],
            loading: true
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        const { infoCardArray } = this.state;
        getWheatRecords()
        .then((res) => {
            if(res.success){
                this.setState({farmerArray: res.data, loading: false})
            }else{
                ToastAndroid.show(res.message, ToastAndroid.LONG)
                this.setState({loading: false})
            }
        })
        .catch((err)=> {
            console.log('[Err]: ', err)
        })

        getStats()
        .then((res) => {
            if(res.success){
                infoCardArray[0].value = res.data.wheatTarget/1000;
                infoCardArray[1].value = (res.data.wheatAchieved/1000);

                this.setState({infoCardArray: infoCardArray})
            }
        })
    }
    
    render(){
        const { infoCardArray, farmerArray, loading } = this.state;
        const totalTarget = infoCardArray[0].value
        const achievedTarget = infoCardArray[1].value
        const leftTarget = totalTarget - achievedTarget;
        const achiveTargetPerc = (achievedTarget/totalTarget)*100
        const leftTargetPerc = (leftTarget/totalTarget)*100

        let series = [];
        if(achiveTargetPerc == NaN || leftTargetPerc == NaN) 
        {
            series = [0,0]
        } else 
        {
            series =[parseFloat(achiveTargetPerc.toFixed(2)), parseFloat(leftTargetPerc.toFixed(2))]
        }
        const sliceColor = [BASE_COLOR, RED_PIE_COLOR]
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Dashboard</Text>
                    
                    <ScrollView style={{marginTop: 15}} showsVerticalScrollIndicator={false}>
                        <View>
                            <InfoCard data={infoCardArray} horizontal={true}/>
                        </View>
                    
                        <View>
                            <BreakdownPieChart
                                series={series}
                                sliceColor={sliceColor}
                            />
                        </View>
                        {/* <View >
                            <FarmerWheatCard data={farmerArray} />
                        </View> */}
                        {/* {loading &&
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large'/>
                        </View>
                        } */}
                    </ScrollView>
                </View>
                {
                    loading ?
                    <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR},StyleSheet.absoluteFill]}>
                        <ActivityIndicator size='large' color= 'white'/>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Fetching Stats...</Text>
                    </View> :
                    null
                }
            </View>
        )
    }
};

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
});

export default HomeScreen;