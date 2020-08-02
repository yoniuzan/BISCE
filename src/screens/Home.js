import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, title, Alert, Image, ScrollView, Button, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { auth, database, f, fs } from '../../config/config.js';
import { TouchableOpacity } from 'react-native-gesture-handler';


console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      flag: 0,
    };
  }

  loginUser = async (email, password) => {
    if (email != '' && password != '') {
      try {
        let user = await auth.signInWithEmailAndPassword(email.trim(), password);
        //props.navigation.navigate('HomeLoginScreen')
        this.props.navigation.navigate(('HomeLoginScreen'));
      }
      catch (error) {
        console.log(error);
        alert('הפרטים שהזנת לא נכונים');
        // this.setState({ flag: 0 });
      }
    }
    else {
      alert('נא למלא את כל השדות');
      // this.setState({ flag: 0 });

    }
  }
 


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>

          <View style={{ flex: 1, alignItems: 'center', padding: 20, justifyContent: "flex-end" }}>
            <Image
              style={styles.stretch}
              source={require('../images/BISCE.png')}
            />
          </View>
          <View style={{ flex: 2 }} >
            <Text style={styles.title3}>
              ברוכים הבאים
        </Text>
            <Text />
            <View style={{ flex: 2, padding: 20, justifyContent: "flex-end" }}>
              <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="כתובת דואר אלקטרוני"
                  onChangeText={(text) => this.setState({ email: text })}
                  value={this.state.email}>
                </TextInput>
              </View>
              <Text />
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View>
                  <TextInput style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="סיסמא"
                    onChangeText={(text) => this.setState({ password: text })}
                    secureTextEntry={true}
                    value={this.state.password} >
                  </TextInput>
                </View>
                <Text />
                <Text />

                <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.password)}>
                  <Text style ={{color : 'royalblue', fontSize: 15}}> התחבר </Text>
                </TouchableOpacity>
                <Text/>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ForgetPasswordScreen')} >
                    <Text style ={{color : '#4169e1', fontSize: 15}}> שכחתי סיסמא </Text>
                  </TouchableOpacity>

              </View>
            </View>

            <View style={styles.title1}>
              <Text style={styles.title2}>אין לך עדיין משתמש? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')} >
                <Text style ={{color : '#4169e1', marginBottom: 10, fontSize: 15}}> הרשמה </Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}


const styles = StyleSheet.create({
  container: {

    backgroundColor: '#ffffff',
    flex: 1,
    //marginTop:Platform.OS==="android"?24:0,

  },
  inputstayle: {
    height: 40,
    borderColor: "black",
    borderWidth: 2,
    margin: 15,
  },
  title: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    padding: 10
  },
  title3: {
    justifyContent: 'space-evenly',
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 40,
    //fontFamily: 'vincHand',
    color: 'black'
  },
  title1: {
    //flexGrow:1,
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexDirection: 'row',
    
  },
  title2: {
    justifyContent: 'space-around',
    textAlign: 'center',
    marginVertical: 10,
    //fontWeight: 'bold',
    fontSize: 15,

  },
  fixToText: {
    padding: 20,
    alignItems: 'center',
  },
  stretch: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
  custom: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 32
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


});
export default Home;
