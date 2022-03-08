import React, { Component } from 'react'
import axios from 'axios';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    Image, 
    ActivityIndicator,
    ToastAndroid,
    Alert
} from 'react-native';
import { Button, Card, Text, Input, Icon } from '@ui-kitten/components';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING, IP, GRAY_COLOR, LOADING_GRAY_COLOR } from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from '../navigation/AppNavigator';
// import FoodDept from '../../assets/FoodDept.jpeg'

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            secureTextEntry: true,
            loading: false
        };
    }

    storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@data', jsonValue)
            return
        } catch (e) {
            console.log('e --> ', e)
        }
    }

    

    login = async (props) => {
        const {username, password} = this.state;
        this.setState({loading: true})
        if (username === '' || password === '') {
            Alert.alert('', 'Please fill all the details correctly!');
            return;
        }

        const link = `${IP}/login`;
        console.log(link);
        const body = {username, password};
        
        try {
            const res = await axios.post(link, body);
            const {institute, token} = res.data.data;
            this.storeData({institute, token})
            this.props.setData();
            this.setState({loading: false})
        } catch (e) {
            this.setState({loading: false})
            // ToastAndroid.show(e.response.data.message, ToastAndroid.TOP)
            Alert.alert('', e.response.data.message);
            console.log('e -> ', e.response.data.message);
        }
    };

    render() {
        const { username, password, secureTextEntry, loading } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                <View style={styles.header}>
                    <View style={{
                        borderRadius: 20,
                        backgroundColor: BACK_COLOR
                    }}>
                    <Image 
                        style={{
                            width: 100, 
                            height: 100,
                        }} 
                        source={require('../../assets/FoodDept.png')}
                    />
                    </View>
                    <Text style={styles.headerTextStyle}>Wheat Procurement Sindh</Text>
                </View>
                
                <Card style={styles.card} header={this.Header} footer={this.Footer}>
                    <ScrollView>
                    <Input
                        value={username}
                        label={()=>{return(
                            <Text style={styles.lableStyle}>Username</Text>
                        )}}
                        placeholder='Enter email or username'
                        onChangeText={nextValue => this.setState({username: nextValue})}
                    />
                    <Input
                        style={{marginTop: '5%'}}
                        value={password}
                        label={()=>{return(
                            <Text style={styles.lableStyle}>Password</Text>
                        )}}
                        placeholder='Password'
                        accessoryRight={this.renderIcon}
                        secureTextEntry={secureTextEntry}
                        onChangeText={nextValue => this.setState({password: nextValue})}
                    />
                    </ScrollView>
                </Card>
                </KeyboardAvoidingView>
                {/* <View style={{justifyContent: 'center', alignItems: 'center',margin: 15}}>
                    <Image style={{
                        width: 100, 
                        height: 125,
                        overflow: 'hidden',
                        top: '-15%',
                        position: 'relative',
                    }} source={require('../../assets/SindhGovt.png')}/>
                </View> */}
                {
                    loading ?
                    <View style={[{alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR},StyleSheet.absoluteFill]}>
                        <ActivityIndicator size='large' color= 'white'/>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Verifying User...</Text>
                    </View> :
                    null
                }
            </View>
        )
    }

    toggleSecureEntry = () => {
        const { secureTextEntry } = this.state;
        this.setState({secureTextEntry: !secureTextEntry})
    };

    Header = (props) => (
        <View {...props} style={[props.style, {alignItems: 'center'}]}>
            <Text style={{color: BASE_COLOR}} category='h5'>Log In</Text>
        </View>
    );

    renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
            <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    Footer = (props) => {
        const { loading } = this.state;
        return(
        <View {...props} style={props.style}>
            <Button
            style={{
                borderRadius: 50,
                backgroundColor: loading ? GRAY_COLOR : BASE_COLOR,
                // marginTop: '10%'
            }}
            appearance='outline'
            size='medium'
            status='control'
            onPress={()=>this.login(this.props)}
            >
            Login
            </Button>
        </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACK_COLOR
    },
    header: {
        height: '50%',
        backgroundColor: BASE_COLOR,
        borderBottomLeftRadius: 200,
        borderBottomRightRadius: 200,
        alignItems: 'center',
        paddingTop: '15%'
    },
    headerTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: MAIN_HEADING
    },
    card: {
        // flex: 1,
        marginHorizontal: '5%',
        zIndex: 1,
        top: '-15%',
        position: 'relative',
        borderRadius: 30,
        shadowColor: BASE_COLOR,
        elevation: 10,
    },
    lableStyle: {
        color: BASE_COLOR, 
        fontWeight: 'bold', 
        marginTop: '5%',
        fontSize: DEAFULT_FONT_SIZE
    }
});

export default LoginScreen;