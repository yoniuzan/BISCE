import React, { Component, useState } from 'react';
import {View, Text, Button, StyleSheet, Image, Platform, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {auth, database, f, fs} from '../../config/config.js' ;
console.disableYellowBox = true;
//const util = require('util');
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
export default class addd extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            type: "",//halavi or bassari
            screen: "",
            name:"",
            description: "",
            price:"",
            time:"",
            avatar:"",
            isTrue: ""

        }
    }
    
    addItemtoDBT = (n) =>{
        
        database.ref('products/' + 'חלבי/'+'טוסטים/' + n ).set({
            name: n,
            //description: this.state.description,
        }).then(function () {
            console.log("Document successfully written!");
            alert ('המוצר התווסף')
        }).catch(function (error) {
            console.log("Error writing document: ", error);
        });
        console.log((this.state.name))
        console.log((this.state.isTrue))
        this.props.navigation.navigate('ToastsScreen', {name:this.state.name},{isTrue:this.state.isTrue})
    }
    addItemtoDB = () =>{
        fs.collection("products").add({
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            time: this.state.time,
            avatar: this.state.avatar,
            isTrue: this.state.isTrue,
        }
        
        ).then(function () {
            console.log("Document successfully written!");
            
            alert ('המוצר התווסף')
            //this.props.navigation.navigate('RouteName', {}) 
            
        }
        ).catch(function (error) {
            console.log("Error writing document: ", error);
        });
        //navigate({name: (this.state.name)})
        console.log((this.state.name))
        this.props.navigation.navigate('ToastsScreen', {name:this.state.name}, {isTrue:this.state.isTrue})
    }
    render() {
        //console.log("this.es111111 = "+ util.inspect(this.props.navigation.state, false,null));
        //var{navigate}=this.props.navigation;
        return (
            <KeyboardAvoidingView
            
                behavior={Platform.OS === "ios" ? "padding" : null}
                style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title1}> הוספת משקה או תוספת   </Text>
                <Text style={styles.title}> הרשאות: מנהל  </Text>
                <View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}>
                <Text/>
                <Text style={styles.title}>
                    שם 
                    </Text>
                    <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=""
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name}>
                    </TextInput>
                <Text/>
                
                    <TouchableOpacity
                        style={styles.fixToText}
                        onPress={() => this.addItemtoDBT(this.state.name)}>
                        <Text> הוספה </Text>
                    </TouchableOpacity>
                    {/* <Button style={styles.fixToText}
                        title="הוספה"
                        onPress={() => this.addItemtoDBT(this.state.name) }
                       //onPress={() => this.props.navigation.navigate('ToastsScreen')}
                        
                    /> */}
                    </View>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f5fffa',
            flex: 1,
            //marginTop:Platform.OS==="android"?24:0,
          },
    inputBox:{
        width:300,
        height: 50,
        backgroundColor:'#A0CC39',
        borderRadius: 25,
        alignSelf:'center',
        textAlign:'center',
        color: "black",
    },
    title: {
        //justifyContent: 'space-around',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20, 
        //padding:40 
    },
    
    title1: {
        //justifyContent: 'space-around',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 40, 
        paddingTop:30
        //padding:40 
    },
})