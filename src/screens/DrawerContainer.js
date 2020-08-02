import React from 'react';
import { View, TouchableOpacity, StyleSheet, Button, Text, NativeModules, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import {  Icon } from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import {auth, database, f, fs} from '../../config/config.js' ;
console.disableYellowBox = true;
export default class DrawerContainer extends React.Component {
  
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
        avatar:""
    };}



    componentDidMount = () => {
      var that = this;
      f.auth().onAuthStateChanged(function(user){
          console.log("kkkkkkkkkkk")
        if(user){
          //logged in
          console.log("ggggggg");
          that.fetchUserInfo(user.uid);
          console.log("rrrrrrrrr");
        }
        else{
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
            userid:userid,
            avatar:snapshot.val().avatar,
          });
      });
    }


    
showActionSheet = () => {
    this.ActionSheet.show()
  }
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
    console.log("liron")
    database.ref('users').child(this.state.userid).child('avatar').set(this.state.avatar);
    
  }

  };
  render() {
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <View style={styles.image}>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.PickAvatar} >
              <Image source = {{ uri : this.state.avatar}} style ={styles.avatar} />
              <Icon name="">
              </Icon>
            </TouchableOpacity>
            <Text/>
            <Text/>
          <Text style={styles.but}>
              {this.state.name}
          </Text>
          </View>
          <Text />
          <Text />
          <View style={styles.fix}>
            <Icon name="home"></Icon>
            <TouchableOpacity 
              style={styles.but}
              onPress={() => {
                this.props.navigation.navigate('HomeLoginScreen');
                this.props.navigation.closeDrawer();
              }}>
              <Text> דף בית </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fix}>
            <Icon name="person"></Icon>
            <TouchableOpacity
              style={styles.but}
              onPress={() => {
                this.props.navigation.navigate('ProfileScreen');
                this.props.navigation.closeDrawer();
              }}>
              <Text> פרופיל </Text>
            </TouchableOpacity>
          </View>
          {
            this.state.email != 'ir@gmail.com' ?
              <View>
                <View style={styles.fix}>
                  <Icon name="cart"></Icon>
                  <TouchableOpacity
                    style={styles.but}
                    onPress={() => {
                      this.props.navigation.navigate('CartScreen');
                      this.props.navigation.closeDrawer();
                    }}>
                    <Text> עגלת קניות חלבי</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fix}>
                  <Icon name="cart"></Icon>
                  <TouchableOpacity
                    style={styles.but}
                    onPress={() => {
                      this.props.navigation.navigate('CartBScreen');
                      this.props.navigation.closeDrawer();
                    }}>
                    <Text>עגלת קניות בשרי</Text>
                  </TouchableOpacity>
                </View>
              </View>
              :
              <View>
              </View>
          }
          
          {this.state.email == 'ir@gmail.com' ? 
          <View style={styles.fix}>
            <Icon name="paper"></Icon>
            <TouchableOpacity 
              style={styles.but}
              onPress={() => {
                this.props.navigation.navigate('OrdersScreen');
                this.props.navigation.closeDrawer();
              }}>
              <Text> הזמנות </Text>
            </TouchableOpacity>
          </View>
          :
          <View style={styles.fix}>
            
          </View>
          }
          {this.state.email == "ir@gmail.com" ?
            <View style={styles.fix}>
            <Icon name="ios-add"></Icon>
            <TouchableOpacity
              style={styles.but}
              onPress={() => {
                this.props.navigation.navigate('AddItemScreen');
                this.props.navigation.closeDrawer();
                
              }}>
              <Text> הוספת מוצר </Text>
            </TouchableOpacity>
          </View>
          :
          <View>
            
          </View>
          }
          <View style={styles.fix}>
            <Icon name="md-log-out"></Icon>
            <TouchableOpacity
              style={styles.but}
              onPress={() => {
                this.props.navigation.navigate('HomeScreen');
                this.props.navigation.closeDrawer();
                
              }}>
              <Text> התנתקות </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  
  onOnboardStarted() {
    Actions.onboard({
      onboarded: true,
      profilePicture: this.state.profilePicture
    });
  }

  onOnboardCompleted() {
    this.props.replaceRoute(Routes.contacts(this.props.user));
  }
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
        padding:20
      },
      container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        textAlign: 'center',
        
      },
      image:{
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
         marginTop: -280,  
      },
      but:{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:20,
        //justifyContent: 'flex-end',
        //textAlign: 'center',
        //flexDirection:'column',
      },
      fix:{
        flexDirection: 'row',
        //justifyContent:'space-between',
        //padding: 40,
        alignItems: 'center',
      },
      profilePictureContainer: {
        alignItems: "center",
        justifyContent: "center"
      },
      profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        //backgroundColor: StyleVars.Colors.mediumBackground
      },
      avatar: {
        position: "absolute",
        width: 150,
        height: 150,
        borderRadius: 50,
        
    },
    avatarPlaceholder: {
      width: 150,
      height: 150,
      backgroundColor: "#E1E2E6",
      borderRadius: 50,
      marginTop: 48,
      justifyContent: "center",
      alignItems: "center",
      //marginLeft : 110,
      
  }
})

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
/*
 <View style={styles.fix}>
            <Icon name="md-settings"></Icon>
            <Button style={styles.but}
              title="הגדרות"
              onPress={() => {
                this.props.navigation.navigate('SettingScreen');
                this.props.navigation.closeDrawer();
              }}
            />
          </View>
*/