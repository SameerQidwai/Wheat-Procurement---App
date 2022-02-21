import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Card, Text, Input, Icon } from '@ui-kitten/components';
import { BACK_COLOR, BASE_COLOR, DEAFULT_FONT_SIZE, MAIN_HEADING } from '../../Global';

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            secureTextEntry: true,
        };
    }

    render() {
        const { email, password, secureTextEntry } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                <View style={styles.header}>
                    <Icon style={{width: 50, height: 50}} fill='white' name='layers'/>
                    <Text style={styles.headerTextStyle}>Wheat Procurement Sindh</Text>
                </View>
                
                <Card style={styles.card} header={this.Header} footer={this.Footer}>
                    <ScrollView>
                    <Input
                        value={email}
                        label={()=>{return(
                            <Text style={styles.lableStyle}>Email</Text>
                        )}}
                        placeholder='Enter email or username'
                        onChangeText={nextValue => this.setState({email: nextValue})}
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
                    {/* <View style={{
                        flexDirection: 'row', 
                        justifyContent: 'flex-end'
                    }}>
                        <Text appearance='hint'>Forgot Password?</Text>
                    </View> */}
                    </ScrollView>
                </Card>
                </KeyboardAvoidingView>
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

    Footer = (props) => (
        <View {...props} style={props.style}>
            <Button
            style={{
                borderRadius: 50,
                backgroundColor: BASE_COLOR,
                // marginTop: '10%'
            }}
            appearance='outline'
            size='medium'
            status='control'
            onPress={()=>this.props.callback()}
            >
            Login
            </Button>
        </View>
    );
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
        top: '-20%',
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