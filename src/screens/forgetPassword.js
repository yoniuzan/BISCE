
import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, Platform, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Header, Item, Icon, Container } from 'native-base';
import { auth, database, f } from '../../config/config.js';
console.disableYellowBox = true;
export default class forgerPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  forgotPassword = (email) => {
    auth.sendPasswordResetEmail(email.trim()).then(function (user) {
      alert('קישור לאיפוס סיסמא נשלח לך למייל')
    }).catch(error => console.log('Error', error));
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', padding: 40 }}>
              <Image
                style={styles.stretch}
                source={require('../images/BISCE.png')}
              />

              <Text style={styles.title}> אנא הקלד כתובת מייל לאיפוס סיסמא:</Text>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="כתובת דואר אלקטרוני "
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}>
                </TextInput>
                <Text />
                <TouchableOpacity
                  onPress={() => this.forgotPassword(this.state.email)}>
                  <Text style = {{color: 'royalblue', fontSize: 'bold'}}>שלח למייל</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#ffffff',
    flex: 1,
    //marginTop:Platform.OS==="android"?24:0,

  },
  title: {
    justifyContent: 'space-around',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 25,
    padding: 20

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

})