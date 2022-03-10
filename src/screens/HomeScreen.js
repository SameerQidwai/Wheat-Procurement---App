import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, ToastAndroid, RefreshControl } from 'react-native';
import { BACK_COLOR, BASE_COLOR, BLUE_PIE_COLOR, GRAY_COLOR, LOADING_GRAY_COLOR, MAIN_HEADING, RED_PIE_COLOR } from '../../Global';
import { Text } from '@ui-kitten/components';

import InfoCard from '../components/InfoCard';
import BreakdownPieChart from '../components/BreakdownPieChart';
import FarmerWheatCard from '../components/FarmerWheatCard';
import { getWheatRecords } from '../services/WheatApi';
import { getStats } from '../services/HomeApi';
import BardanaDetailsCard from '../components/BardanaDetailCard';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoCardArray: [
                {
                    heading: 'Total Target',
                    value: 1,
                    icon: 'bookmark',
                    difference: '100',
                    change: 'inc',
                    duration: 'year'
                },
                {
                    heading: 'Total Wheat Collected',
                    value: 1,
                    icon: 'award',
                    difference: '100',
                    change: 'inc',
                    duration: 'week'
                },
            ],
            totalBags: {},
            filledBags: {},
            issuedBags: {},
            availableBags: {},
            loading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData() {
        const { infoCardArray } = this.state;
        Promise.all([getStats()])
            .then((res) => {
                console.log('Res 52: ', res)
                const { success, data } = res[0]
                if (success) {
                    infoCardArray[0].value = data.wheatTarget / 1000;
                    infoCardArray[1].value = (data.wheatAchieved / 1000);
                    infoCardArray[1].difference = Math.abs(parseFloat(data.wheatProgress.toFixed(2)))
                    infoCardArray[1].change = data.wheatProgress > 0 ? 'inc' : 'dec'
                }
                this.setState({
                    totalBags: success ? data.totalBardana : {},
                    filledBags: success ? data.filledBardana : {},
                    issuedBags: success ? data.allocatedBardana : {},
                    availableBags: success ? data.emptyBardana : {},
                    infoCardArray: infoCardArray,
                    loading: false,
                    refreshing: false
                })
            })
            .catch((e) => {
                console.log(e);
            })
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.getData()
    }

    render() {
        const { infoCardArray, loading, refreshing, totalBags, filledBags, issuedBags, availableBags } = this.state;
        const totalTarget = infoCardArray[0].value
        const achievedTarget = infoCardArray[1].value
        const leftTarget = totalTarget - achievedTarget;
        const achiveTargetPerc = (achievedTarget / totalTarget) * 100
        const leftTargetPerc = (leftTarget / totalTarget) * 100
        // console.log('BAGS: ', totalBags)

        let series = [];
        if (achiveTargetPerc == NaN || leftTargetPerc == NaN) {
            series = [0, 0]
        } else {
            series = [parseFloat(achiveTargetPerc.toFixed(2)), parseFloat(leftTargetPerc.toFixed(2))]
        }
        const sliceColor = [BASE_COLOR, RED_PIE_COLOR]
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Dashboard</Text>

                    <ScrollView
                        style={{ marginTop: 15 }}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={this.onRefresh.bind(this)}
                            />
                        }
                    >
                        <View>
                            <InfoCard data={infoCardArray} horizontal={true} />
                        </View>

                        <View>
                            <BreakdownPieChart
                                series={series}
                                sliceColor={sliceColor}
                            />
                        </View>
                        <View>
                            <BardanaDetailsCard
                                totalBags={totalBags}
                                filledBags={filledBags}
                                issuedBags={issuedBags}
                                availableBags={availableBags}
                            />
                        </View>
                    </ScrollView>
                </View>
                {
                    loading ?
                        <View style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR }, StyleSheet.absoluteFill]}>
                            <ActivityIndicator size='large' color='white' />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Fetching Stats...</Text>
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
    headingFont: {
        fontSize: MAIN_HEADING,
        fontWeight: 'bold',
        color: 'black'
    },
});

export default HomeScreen;