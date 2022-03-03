import React, {Component} from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING } from '../../Global';
import { Text, Card, Input, Button } from '@ui-kitten/components';

class ReceiveBardana extends Component {
    constructor(props){
        super(props);
        this.state = {
            ppBags: '',
            juteBags: '',
            remarks: ''
        }
    }
    render(){
        const {ppBags, juteBags, remarks} = this.state;
        return(
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.headingFont}>Receive Bardana From DFC</Text>
                    <Card style={styles.card}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Input
                                value={ppBags}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No of Bags(PP)</Text>
                                )}}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({ppBags: nextValue})}
                            />
                            <Input
                                value={juteBags}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>No of Bags(Jute)</Text>
                                )}}
                                keyboardType='number-pad'
                                placeholder='Value'
                                onChangeText={nextValue => this.setState({juteBags: nextValue})}
                            />
                            {/* <Input
                                multiline= {true}
                                textStyle={{ minHeight: 65, maxHeight: 65 }}
                                value={remarks}
                                label={()=>{return(
                                    <Text style={styles.lableStyle}>Remarks</Text>
                                )}}
                                placeholder='Enter Remarks'
                                onChangeText={nextValue => this.setState({remarks: nextValue})}
                            /> */}
                        </ScrollView>
                        <Button
                            style={styles.btnStyle}
                            appearance='outline'
                            size='medium'
                            status='control'
                            >
                            Submit
                        </Button>
                    </Card>
                </View>
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
    card: {
        borderRadius: 10,
        shadowColor: BASE_COLOR,
        elevation: 10,
        marginTop: 15,
        width: '100%'
    },
    lableStyle: {
        color: BASE_COLOR, 
        fontWeight: 'bold', 
        marginTop: '5%',
        fontSize: DEAFULT_FONT_SIZE
    },
    btnStyle:{
        borderRadius: 50,
        backgroundColor: BASE_COLOR,
        width: '100%',
        marginTop: '5%',
    }
});

export default ReceiveBardana;