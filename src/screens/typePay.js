import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, Platform, TextInput, ScrollView, Title, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Header, Item, Icon, Container, Left, Right, Body } from 'native-base';
import { auth, database, f, fs } from '../../config/config.js';
import SendSMS from 'react-native-sms';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'
console.disableYellowBox = true;


export default class typaPay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggeedin: false,
      email: "",
      password: "",
      userName: "",
      name: "",
      flag: 0,
      registercheck: 0,
      avatar: "",
      phone: ""
    };
  }

  PickAvatar = async () => {
    console.log("ddd");
    // UserPermission.getCameraPermission()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ avatar: result.uri });
      database.ref('/users').child(this.state.userid).child('avatar').set(this.state.avatar);

    }
  };

  componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function (user) {
      console.log("kkkkkkkkkkk")
      if (user) {
        console.log("ggggggg");
        that.fetchUserInfo(user.uid);
        console.log("rrrrrrrrr");
      }
      else {
        that.setState({
          loggedin: false
        });
      }
    });
  }

  fetchUserInfo = (userid) => {
    console.log("yyyyyyy");

    var that = this;
    database.ref('users').child(userid).once('value').then(function (snapshot) {
      const exists = (snapshot.val() !== null);
      console.log(snapshot.val())
      console.log("jjjjjjjjjjjjjjjjjjjj")
      //if(exists) data = snapshot.val();//this line is not work on the websit
      that.setState({
        username: snapshot.val().username,
        name: snapshot.val().name,
        email: snapshot.val().email,
        password: snapshot.val().password,
        avatar: snapshot.val().avatar,
        phone: snapshot.val().phone,
        userid: userid,


      });
    });
  }

  showActionSheet = () => {
    this.ActionSheet.show()
  }

  saveProfile = () => {
    var username = this.state.username;
    var name = this.state.name;
    var email = this.state.email;
    var password = this.state.password;
    var avatar = this.state.avatar;
    var phone = this.state.phone;



    if (username !== '') {
      database.ref('/users').child(this.state.userid).child('username').set(username);
    }
    if (name !== '') {
      database.ref('/users').child(this.state.userid).child('name').set(name);
    }
    if (email !== '') {
      database.ref('/users').child(this.state.userid).child('email').set(email);
    }
    if (password !== '') {
      database.ref('/users').child(this.state.userid).child('password').set(password);
    }
    if (avatar !== '') {
      database.ref('/users').child(this.state.userid).child('avatar').set(avatar);
    }
    if (phone !== '') {
      database.ref('/users').child(this.state.userid).child('phone').set(phone);
    }

    alert('תודה על הזמנתך !');
    this.props.navigation.navigate('HomeLoginScreen');
    //alert('תודה על הזמנתך! הזמנתך על סך ' + price+' תהיה מוכנה בעוד '+time+' דקות. ')

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
              <Text style={styles.title}>אנא הכנס מספר פלאפון</Text>
              <View style={{ alignItems: 'center' }}>
                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="מספר פלאפון"
                  onChangeText={(text) => this.setState({ phone: text })}
                  editable={true}
                  value={this.state.phone}>
                </TextInput>
              </View>

              <Text />
              <Text />
              <Text style={styles.title}> אנא בחר שיטת תשלום:</Text>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={styles.fixToText}>
                  <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>

                    <TouchableOpacity
                      onPress={() => this.saveProfile()}>
                      <Text style={{ color: '#4169e1', fontSize: 15 }}> מזומן </Text>
                    </TouchableOpacity>

                  </View>
                  <View style={{ flex: 1, justifyContent: 'space-around', flexDirection: 'row' }}>
                    <TouchableOpacity
                      onPress={() =>  this.props.navigation.navigate('CardPayScreen') }>
                      <Text style={{ color: '#4169e1', fontSize: 15 }}> אשראי </Text>
                    </TouchableOpacity>

                  </View>
                </View>
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