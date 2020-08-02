import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Platform, TextInput, ScrollView, Title, KeyboardAvoidingView } from 'react-native';
import { Header, Item, Icon, Container, Left, Right, Body } from 'native-base';
import { auth, database, f, fs } from '../../config/config.js';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
console.disableYellowBox = true;


export default class typaPay extends React.Component {
  
    constructor(props){
        super(props);
        this.state={
            credit:"",
        }
    }

    _onChange = form => this.setState({credit:form});

   pay=()=>{
    this.props.navigation.navigate('HomeLoginScreen');
    alert('תודה על הזמנתך!')
   }
    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:20, fontWeight:'bold',marginTop:10, alignItems:'center', justifyContent:'center', padding: 30}}> נא להכניס את פרטי אשראי </Text>
                    <View style={{ height:400}}>
                    <CreditCardInput labels={{ number: "מספר כרטים", expiry: "תפוגה", cvc: "CVC/CCV" }} onChange={this._onChange} />
                    </View>
                    <TouchableOpacity
          style={{
            width: 80,
            height: 50,
            backgroundColor: "black",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginBottom:200
          }}
          onPress={()=>this.pay()}
        >
          <Text style={{ color: "white" }}>שלם/י</Text>
        </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop: Platform.OS === "android" ? 24 : 0,

    },
    title: {
        justifyContent: 'space-around',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 25,
        padding: 20

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
    stretch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        resizeMode: 'stretch',

    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        alignItems: 'center',
    },

})