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
    Keyboard,
    Alert
} from 'react-native';
import { Button, Card, Text, Input, Icon } from '@ui-kitten/components';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING, IP, GRAY_COLOR, LOADING_GRAY_COLOR, HEIGHT } from '../../Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from '../navigation/AppNavigator';
// import FoodDept from '../../assets/FoodDept.jpeg'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            secureTextEntry: true,
            loading: false,
            keyboardSize: 0,
            emailError: '',
            passwordError: ''
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

    validateForm() {
        const { username, password } = this.state
        if (username && password) {
            this.setState({
                emailError: false,
                passwordError: false,
            })
            return true
        }
        else {
            if (!username) {
                this.setState({ emailError: true })
            }
            else {
                this.setState({ emailError: false })
            }
            if (!password) {
                this.setState({ passwordError: true })
            }
            else {
                this.setState({ passwordError: false })
            }
        }
    }


    login = async (props) => {
        // console.log('HERE')
        const { username, password } = this.state;
        const validateForm = this.validateForm();
        if (validateForm) {
            this.setState({ loading: true })
            const link = `${IP}/login`;
            console.log(link);
            const body = { username, password };

            try {
                const res = await axios.post(link, body);
                console.log('RES: ', res.data)
                const { institute, token, defaultPassword } = res.data.data;
                // console.log('HERE2')
                this.storeData({ institute, token, defaultPassword })
                this.props.setData();
                // this.setState({loading: false})
            } catch (e) {
                this.setState({ loading: false })
                ToastAndroid.show(e.response.data.message, ToastAndroid.TOP)
                // Alert.alert('', e.response.data.message);
                console.log('e -> ', e.response.data.message);
            }
        }
    };


    render() {
        const { username, password, secureTextEntry, loading, keyboardSize, emailError, passwordError } = this.state;
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
                                defaultValue={username}
                                label={() => {
                                    return (
                                        <Text style={styles.lableStyle}>Username</Text>
                                    )
                                }}
                                caption={() => (
                                    emailError ?
                                        <Text style={styles.captionText}>Email Required</Text>
                                        : null
                                )}
                                placeholder='Enter email or username'
                                onChangeText={nextValue => this.setState({ username: nextValue })}
                            />
                            <Input
                                style={{ marginTop: '5%' }}
                                defaultValue={password}
                                label={() => {
                                    return (
                                        <Text style={styles.lableStyle}>Password</Text>
                                    )
                                }}
                                caption={() => (
                                    passwordError ?
                                        <Text style={styles.captionText}>Password Required</Text>
                                        : null
                                )}
                                placeholder='Password'
                                accessoryRight={this.renderIcon}
                                secureTextEntry={secureTextEntry}
                                onChangeText={nextValue => this.setState({ password: nextValue })}
                            />
                        </ScrollView>
                    </Card>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image style={{
                            width: 100,
                            height: 125,
                            overflow: 'hidden',
                            alignItems: 'center',
                            // bottom: 20,
                            position: 'absolute',
                        }} source={require('../../assets/SindhGovt.png')} />
                    </View>
                </KeyboardAvoidingView>
                {
                    loading ?
                        <View style={[{ alignItems: 'center', justifyContent: 'center', backgroundColor: LOADING_GRAY_COLOR }, StyleSheet.absoluteFill]}>
                            <ActivityIndicator size='large' color='white' />
                            <Text style={{ color: 'white', fontWeight: 'bold' }}>Verifying User...</Text>
                        </View> :
                        null
                }
            </View>
        )
    }

    toggleSecureEntry = () => {
        const { secureTextEntry } = this.state;
        this.setState({ secureTextEntry: !secureTextEntry })
    };

    Header = (props) => (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: BASE_COLOR, marginVertical: 5 }} category='h5'>Log In</Text>
        </View>
    );

    renderIcon = (props) => (
        <TouchableWithoutFeedback onPress={this.toggleSecureEntry}>
            <Icon {...props} name={this.state.secureTextEntry ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    Footer = (props) => {
        const { loading } = this.state;
        return (
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
                    onPress={() => this.login(this.props)}
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
        paddingTop: '10%'
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
        marginTop: 5,
        fontSize: DEAFULT_FONT_SIZE
    },
    captionText: {
        fontSize: 12,
        fontWeight: "400",
        color: "red",
    },
});

export default LoginScreen;