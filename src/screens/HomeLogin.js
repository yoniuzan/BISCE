import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput, Title, TouchableOpacity} from 'react-native';
import {Header,  Item, Icon, Container, Left, Right, Body } from 'native-base';
import {auth, database, f, fs} from '../../config/config.js' ;
//import ImageSequence from 'react-native-image-sequence';
//import { ScrollView } from 'react-native-gesture-handler';

/*const images = [
    require('../images/menza11.webp'),
    require('../images/burger11.jpg'),
    require('../images/tost11.jpg'),
  ];
  const centerIndex = Math.round(images.length / 2);

<ImageSequence
  images={images}
  startFrameIndex={centerIndex}
  style={{width: 50, height: 50}} />*/

  console.ignoredYellowBox = true; 
console.disableYellowBox = true;
export default class HomeLogin extends React.Component{
    

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
                num:"",
              date:"",
              tree:""
            };}
        
            componentDidMount = () => {
              var that = this;
              f.auth().onAuthStateChanged(function (user) {
                console.log("kkkkkkkkkkk")
                if (user) {
                  //logged in
                  console.log("ggggggg");
                  that.fetchUserInfo(user.uid);
                  console.log("rrrrrrrrr");
                }
                else {
                  //not loggen in
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
        userid: userid,
        avatar: snapshot.val().avatar,
      });
    });
  }
    
        
          /*registerUser = (email, password) => {
            console.log(email, password);
            auth.createUserWithEmailAndPassword(email, password)
            .then(() => {{var userId = f.auth().currentUser.uid} database.ref('/users/' + userId ).set(
              {
                            name: this.state.name,
                            email: this.state.email,
                            password: this.state.password,
                            username: this.state.username,
              },
             
            );
            
            this.props.navigation.navigate('LoginScreen')})
            .catch(error => {
                console.log(error);
              
               return false
               
           })
    
        }*/
        

   
    /*getUsername=()=>{
        var user = auth.currentUser
        if (user != null) {
            this.setState ({userNameDB:user.displayName});
            //console.log(this.state.userNameDB);
        };
          
    }

    functiontest = () =>{
        this.getUsername();
        this.props.navigation.navigate('MilkScreen');
        console.log('username:' , this.state.userNameDB);
    }*/


  render() {
    return (
      <View style={styles.container}>
         <View style={{ flex: 3, alignItems: 'center', padding: 20, justifyContent: "flex-end" }}>
            <Image
              style={styles.stretch}
              source={require('../images/BISCE.png')}
            />
            <Text/>
          
        <View style={{ flex: 2 }}>
          <Text style={styles.welcome}>
            ברוך הבא
                   </Text>
                   <Text />
          <Text style={styles.welcome}>
            {this.state.username}
          </Text>
          <Text />
          <Text />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image style={styles.stretch}
            //source={require('../images/reka.png')}
            />
          </View>
        </View>
        <View style={{ flex: 3,}}>
        {this.state.email == "ir@gmail.com" ?
            
            <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center'  }}>
              <Text/>
                  <Text style={styles.titlte1}>
            על מנת לבצע שינויים, אנא בחר קפיטריה:
                     </Text>
                     <Text/>
            </View>
            :
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text style={styles.titlte1}>
            על מנת לבצע הזמנה , אנא בחר קפיטריה:
                     </Text>
            
            </View>
          }

            
            <View style={{ flex: 2, flexDirection: 'row',
        justifyContent:'space-between',padding:70
        
         }}>
            <TouchableOpacity
                              onPress={() => this.props.navigation.navigate('MilkScreen')}>
                              <Text style={{borderRadius: 5, height: 30, fontWeight: 'bold', fontSize: 20,}}> חלבי </Text>
                          </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('MeatScreen')}>
              <Text style={{ borderRadius: 8, height: 30, fontWeight: 'bold', fontSize: 20}}> בשרי </Text>
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
    fixToText: {
        flexDirection: 'row',
        justifyContent:'space-between',
        padding: 40,
        alignItems: 'center',
        
        

    }, 
    welcome:{
        justifyContent: 'flex-start',
        textAlign: 'center',
       // marginVertical: 10,
        fontWeight: 'bold',
        fontSize: Platform.OS==="android"?30:40,
       //fontFamily: 'vincHand',
        color: 'black',
        //flex:1,
        //padding:50

    },
    stretch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 420,
        height: 450,
        //resizeMode: 'stretch',
      },
      stretch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
        resizeMode: 'stretch',
      },
      titlte1:{
        justifyContent: 'flex-end',
        textAlign: 'center',
        //marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20,
       //fontFamily: 'vincHand',
        color: 'black',
        flexDirection:'column',
        //padding:50
        

      }
})   