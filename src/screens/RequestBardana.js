import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { BACK_COLOR, MAIN_HEADING } from '../../Global';
import { Text } from '@ui-kitten/components';
import RequestBardanaCard from '../components/RequestBardanaCard';

class RequestBardana extends Component {
    constructor(props){
        super(props);
        this.state = {
            farmerArray: [
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },
                {
                    name: 'Saleem Somroo',
                    date: '01-10-2022',
                    ppBags: 23,
                    juteBags: 50,
                },

            ]
        }
    }
    render(){
        const {farmerArray} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Bardana Requests</Text>
                    <View style={{marginVertical: 15}}>
                        <RequestBardanaCard data={farmerArray}/>
                    </View>
                </View>
            </View>
        )
    }
};

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
});

export default RequestBardana;