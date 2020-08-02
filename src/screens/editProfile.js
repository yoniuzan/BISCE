import React, { Component } from 'react';
import {View, Text, Button, StyleSheet,TouchableOpacity, Image, ScrollView, Platform, TextInput, Input, KeyboardAvoidingView, TouchableHighlight} from 'react-native';
import {auth, database, f, fs} from '../../config/config.js' ;
import * as Facebook from 'expo-facebook';
import { YellowBox } from 'react-native';
import _ from 'lodash';
import * as ImagePicker from 'expo-image-picker';
/*YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};*/
console.disableYellowBox = true;
export default class editProfile extends React.Component
{
        constructor(props) {
          super(props);
          this.state = {
              loggeedin: false,
              email: "",
              password: "",
              userName:"",
              name:"",
              flag: 0,
              registercheck:0,
              avatar:"",
              phone:"",
              num:"",
              date:"",
              tree:""
          };}
          
      
        
      PickAvatar = async () => {
        console.log("ddd");
        // UserPermission.getCameraPermission()
  
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
      });
  
      if(!result.cancelled) {
        this.setState({ avatar: result.uri} );
        database.ref('users').child(this.state.userid).child('avatar').set(this.state.avatar);
        
      }
      };
        
    
      componentDidMount = () => {
        var that = this;
        f.auth().onAuthStateChanged(function(user){
            console.log("kkkkkkkkkkk")
          if(user){
            console.log("ggggggg");
            that.fetchUserInfo(user.uid);
            console.log("rrrrrrrrr");
          }
          else{
            that.setState({
              loggedin: false
            });
          }
        });
      }

      fetchUserInfo = (userid) => {
        console.log("yyyyyyy");

        var that = this;
        database.ref('users').child(userid).once('value').then(function(snapshot){
          const exists = (snapshot.val() !== null);
          console.log(snapshot.val())
          console.log("jjjjjjjjjjjjjjjjjjjj")
          //if(exists) data = snapshot.val();//this line is not work on the websit
            that.setState({
              username: snapshot.val().username,
              name: snapshot.val().name,
              email: snapshot.val().email,
              password: snapshot.val().password,
              avatar:snapshot.val().avatar,
              phone:snapshot.val().phone,
              num:snapshot.val().num,
              tree:snapshot.val().tree,
              date:snapshot.val().date,
              userid:userid,         
              
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
        var num = this.state.num;
        var tree = this.state.tree;
        var data = this.state.data;

        
        
        
        if(username !== ''){
          database.ref('users').child(this.state.userid).child('username').set(username);
        }
        if(name !== ''){
          database.ref('users').child(this.state.userid).child('name').set(name);
        }
        if(email !== ''){
          database.ref('users').child(this.state.userid).child('email').set(email);
        }
        if(password !== ''){
          database.ref('users').child(this.state.userid).child('password').set(password);
        }
        if(avatar !== ''){
          database.ref('users').child(this.state.userid).child('avatar').set(avatar);
        }
        if(phone !== ''){
          database.ref('users').child(this.state.userid).child('phone').set(phone);
        }
        if(num !== ''){
          database.ref('users').child(this.state.userid).child('num').set(num);
        }
        if(tree !== ''){
          database.ref('users').child(this.state.userid).child('tree').set(tree);
        }
        if(data !== ''){
          database.ref('users').child(this.state.userid).child('date').set(data);
        }
        alert('הפרטים נשמרו בהצלחה')
        this.props.navigation.navigate('HomeLoginScreen');
      }

    render() {
        console.log("jjjjjjjk")
        return (
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null}
          style={{ flex: 1 }}>
          <ScrollView
            
                >
                  
                <View style={styles.container}>
                <View style={{ flex: 3, justifyContent: 'center',alignItems: 'center',  }} >
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.PickAvatar}>
              <Image source = {{ uri : this.state.avatar}} style ={styles.avatar}/>
            </TouchableOpacity>
                    
                            <Text style={styles.title}>
                                שם מלא
                                </Text>
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" 
                                onChangeText={(text) => this.setState({ name: text })}
                                editable={true}
                                value={this.state.name}>
                                </TextInput>

                                <Text style={styles.title}>
                                מספר פלאפון
                                </Text>
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" 
                                onChangeText={(text) => this.setState({ phone: text })}
                                editable={true}
                                value={this.state.phone}>
                                </TextInput>

                            <Text style={styles.title}>
                                כתובת דואר אלקטרוני
                                
                                </Text>
                            <TextInput style={styles.inputBox1} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="כתובת דואר אלקטרוני"
                                onChangeText={(text) => this.setState({ email: text })}
                                editable={true}
                                value={this.state.email}
                            >
                            </TextInput>
                            <Text style={styles.title}>
                                שם משתמש
                                </Text>
                            <TextInput style={styles.inputBox2} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="שם משתמש"
                                onChangeText={(text) => this.setState({ username: text })}
                                editable={true}
                                value={this.state.username}></TextInput>
                            <Text style={styles.title}>
                                סיסמא
                                </Text>
                            <TextInput style={styles.inputBox3} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="סיסמא"
                                onChangeText={(text) => this.setState({ password: text })}
                                secureTextEntry={true}
                                editable={true}
                                value={this.state.password}
                            ></TextInput>
                             <Text style={styles.title}>
                                מספר כרטיס אשראי
                                </Text>
                            <TextInput style={styles.inputBox3} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=""
                                onChangeText={(text) => this.setState({ num: text })}
                                secureTextEntry={true}
                                editable={true}
                                value={this.state.num}
                                maxLength = {16}
                                minValue = {16}
                            ></TextInput>
                             <Text style={styles.title}>
                               תוקף
                                </Text>
                            <TextInput style={styles.inputBox3} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=""
                                onChangeText={(text) => this.setState({ data: text })}
                                secureTextEntry={true}
                                editable={true}
                                value={this.state.data}
                                maxLength = {4}
                                minValue = {4}
                            ></TextInput>
                             <Text style={styles.title}>
                                3 ספרות בגב הכרטיס
                                </Text>
                            <TextInput style={styles.inputBox3} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=""
                                onChangeText={(text) => this.setState({ tree: text })}
                                secureTextEntry={true}
                                editable={true}
                                value={this.state.tree}
                                minValue = {3}
                                maxLength = {3}
                            ></TextInput>
                            <Text/>
                            <TouchableOpacity
                              onPress={() => this.saveProfile()}>
                              <Text style={{color: 'royalblue', fontSize: 20, fontWeight: 'bold'}}> שמור </Text>
                            </TouchableOpacity>
                            

                    </View>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
                
            
        )
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
                //justifyContent: 'space-around',
                textAlign: 'center',
                marginVertical: 10,
                fontWeight: 'bold',
                fontSize: 20, 
                //padding:40 
                
            },
            inputBox:{
                width:300,
                height: 50,
                backgroundColor:'#A0CC39',
                borderRadius: 25,
                //paddingHorizontal:120,
                //alignSelf:'center',
                textAlign:'center',
                color: "black",
            },
            inputBox1:{
                width:300,
                height: 50,
                backgroundColor:'#A0CC39',
                borderRadius: 25,
                //alignSelf:'center',
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
            avatar: {
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
              
          },
          avatarPlaceholder: {
            width: 150,
            height: 150,
            backgroundColor: "#E1E2E6",
            borderRadius: 50,
            marginTop: 48,
            justifyContent: "center",
            alignItems: "center",
            
        },
        });

       