import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform, TextInput, ScrollView, KeyboardAvoidingView, } from 'react-native';
import { auth, database, f, fs } from '../../config/config.js';
console.disableYellowBox = true;
export default class login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            flag: "",
        };
    }

    loginUser = async (email, password) => {
        if (email != '' && password != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email.trim(), password);
                this.setState({ flag: 1 });
            }
            catch (error) {
                console.log(error);
                alert('הפרטים שהזנת לא נכונים');
                this.setState({ flag: 0 });
            }
        }
        else {
            alert('נא למלא את כל השדות');
            this.setState({ flag: 0 });
        }
    }

    functionlogin = (email, password) => {
        console.log('before', this.state.flag)
        this.loginUser(email.toLowerCase(), password);
        if (this.state.flag == 1) {
            this.props.navigation.navigate(('HomeLoginScreen'));
            console.log('after - work', this.state.flag)

        }
        else {
            //alert('אנא מלא את כל השדות, או בדוק את הפרטים שהזנת');
            console.log(this.state.flag);
        }
    }

    /*functionlogin = async(email, password) => {
        console.log(this.state.flag)
        if (email != '' && password != '') {
            try {
                let user = await auth.signInWithEmailAndPassword(email.trim(), password);
                this.props.navigation.navigate(('HomeLoginScreen'));
                console.log(this.state.flag)
                this.setState({ flag: 1 });
            }
            catch (error) {
                console.log(error);
                alert('הפרטים שהזנת לא נכונים');
                this.setState({ flag: 0 });
            }
        }
        else {
            alert('אנא מלא את כל השדות, או בדוק את הפרטים שהזנת');
            this.setState({ flag: 0 });
            console.log(this.state.flag);
        }
        
    }*/


    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', padding: 30 }}>
                    <Image
                        style={styles.stretch}
                        source={require('../images/BISCE.png')}
                    />
                </View>
                <View style={{ flex: 3, justifyContent: "flex-end" }} >
                    <Text style={styles.title}>
                        התחברות
                </Text>
                    <Text />
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="כתובת דואר אלקטרוני"
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                        //onSubmitEditing={this.handleSubmitEditing.bind(this)}
                        >

                        </TextInput>
                    </View>
                    <Text />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <TextInput style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="סיסמא"
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={true}
                            value={this.state.password} >
                        </TextInput>
                    </View>
                    <View style={styles.fixToText}>
                        <TouchableOpacity 
                            style={{justifyContent:'center', alignItems:'center'}}
                            onPress={() => this.functionlogin(this.state.email, this.state.password)}>
                            <Text style={{ color: 'royalblue', fontSize: 15 }}> התחבר </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{justifyContent:'center', alignItems:'center'}}
                            onPress={() => this.props.navigation.navigate('ForgetPasswordScreen')} >
                            <Text style={{ color: 'royalblue', fontSize: 15 }}> שכחתי סיסמא </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop:Platform.OS==="android"?24:0,

    },
    stretch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 150,
        resizeMode: 'stretch',

    },
    title: {
        justifyContent: 'space-around',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 40,

    },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: '#A0CC39',
        borderRadius: 25,
        alignSelf: 'center',
        textAlign: 'center',
        color: "black",


    },
    inputBox1: {
        width: 300,
        height: 50,
        backgroundColor: '#A0CC39',
        borderRadius: 25,
        alignSelf: 'center',
        textAlign: 'center',
        color: "black",


    },
    fixToText: {
        flex: 2,
        padding: 30,
    },

});