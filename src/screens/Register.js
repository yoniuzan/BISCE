import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Platform, TextInput, Input, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import {auth, database, f, fs} from '../../config/config.js' ;
import * as Facebook from 'expo-facebook';

import { YellowBox } from 'react-native';
import _ from 'lodash';
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

class Register extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            loggeedin: false,
            email: "",
            password: "",
            userName:"",
            name:"",
            avatar:"",
            flag: 0,
            registercheck:0,
            num:"",
              date:"",
              tree:""
        };

        //פונקציה  כדי להתנתק
       /* signOutUser=()=>{
            auth.signOut().then(() => {
                console.log('Logged Out');
                this.state.loggeedin=false;
            }).catch((error) => {
                console.log('There is an error', error);
            })
        }*/


        /*//בודק אם היוזר מחובר או לא
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            if (user){
                //Logged in
                that.setState({
                    loggeedin: true
                });
                console.log('Logged In', user);
            }
            else {
                //Logged out
                that.setState({
                    loggeedin: false
                });
                console.log('Logged out');
            }
        });*/
    }

    //התחברות עם פייסבוק
   /* async loginWithFacebook (){
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(
            '554172652092660',
            {
                permissions: ['email','public_profile']
            }
        );
        if (type == 'success') {
            const credentials = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(credentials).catch((error) => {
                console.log('There is an error', error);
            })
        }
    }*/
    //התחברות עם מייל וסיסמא
    registerUser = (email, password) => {
        console.log(email, password);
        auth.createUserWithEmailAndPassword(email, password)
        .then(() => {{var userid = f.auth().currentUser.uid} database.ref('/users/' + userid ).set(
          {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.password,
                        username: this.state.userName,
                        avatar:this.state.avatar
          },
         
        );
        
        this.props.navigation.navigate('LoginScreen')})
        .catch(error => {
            console.log(error);
            alert('הפרטים שהזנת לא נכונים')
           return false
           
       })

    }

    functionregister=(email, password)=>{
        this.registerUser(email.trim(), password);
    }

    render() {
        return (
            <View
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
                
                    <View style={styles.container}>

                        <View style={{ flex: 1, alignItems: 'center', padding: 30, justifyContent:"flex-end" }}>
                            <Image
                                style={styles.stretch}
                                source={require('../images/BISCE.png')}
                            />
                        </View>
                        <View style={{ flex: 3, justifyContent:"flex-end" }} >
                            <Text style={styles.title}>
                                הרשמה למערכת
                            </Text>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="שם מלא" 
                                  onChangeText={(text)=> this.setState({name:text})} 
                                  value={this.state.name}></TextInput>
                            </View>
                            <Text/>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="כתובת דואר אלקטרוני" 
                                onChangeText={(text)=> this.setState({email:text})} 
                                value={this.state.email}
                                ></TextInput>
                            </View>
                            <Text/>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput style={styles.inputBox2} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="שם משתמש" 
                                  onChangeText={(text)=> this.setState({userName:text})} 
                                  value={this.state.userName}></TextInput>
                            </View>
                            <Text/>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                                <TextInput style={styles.inputBox3} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="סיסמא"
                                onChangeText={(text)=> this.setState({password:text})} 
                                secureTextEntry={true}
                                value={this.state.password}
                                 ></TextInput>
                            </View>
                            <View style={styles.fixToText}>
                                <TouchableOpacity
                                    style={{justifyContent:'center', alignItems:'center'}}
                                    onPress={() => this.functionregister(this.state.email, this.state.password, this.state.name, this.state.userName)}>
                                    <Text style ={{color : 'royalblue', fontSize: 15}}>הרשמה</Text>
                                </TouchableOpacity>
                                
                            </View>
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
        fontSize: 30,  
    },
    inputBox:{
        width:300,
        height: 50,
        backgroundColor:'#A0CC39',
        borderRadius: 25,
        //paddingHorizontal:120,
        alignSelf:'center',
        textAlign:'center',
        color: "black",
    },
    inputBox1:{
        width:300,
        height: 50,
        backgroundColor:'#A0CC39',
        borderRadius: 25,
        alignSelf:'center',
        textAlign:'center',
        color:"black",
    },
    inputBox2:{
        width:300,
        height: 50,
        backgroundColor:'#A0CC39',
        borderRadius: 25,
        alignSelf:'center',
        textAlign:'center',
        color:"black",
    },
    inputBox3:{
        width:300,
        height: 50,
        backgroundColor:'#A0CC39',
        borderRadius: 25,
        alignSelf:'center',
        textAlign:'center',
        color:"black",
    },
    fixToText:{
        flex:2,
        padding: 30,
        //alignItems: 'center',
    },
});
export default Register;