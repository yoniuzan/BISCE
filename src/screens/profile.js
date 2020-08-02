import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Icon, ActionSheet, Root } from 'native-base';
import { auth, database, f, fs } from '../../config/config.js';
// import UserPermission from '../utilities/UserPermissions';
import * as ImagePicker from 'expo-image-picker';
//import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
const options = ['צלם תמונה', 'בחר תמונה מאלבום', 'ביטול'];
console.disableYellowBox = true;
export default class profile extends React.Component {
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
      avatar: ""
    };
  }


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



  showActionSheet = () => {
    this.ActionSheet.show()
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
      console.log("liron")
      database.ref('users').child(this.state.userid).child('avatar').set(this.state.avatar);

    }

  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} /> */}
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.PickAvatar}>
            <Image source={{ uri: this.state.avatar }} style={styles.avatar} />
          </TouchableOpacity></View>
        <Text />
        <Text />
        <Text />
        <Text style={styles.name}>{this.state.name}</Text>
        <View style={styles.icons}>
          <View style={{ alignItems: "center",}}>
            <TouchableOpacity
              style={{ flexDirection: 'row',
              justifyContent: "center",
              alignItems: "center",textAlign:"center", paddingRight: 160}}
              onPress={() => {
                this.props.navigation.navigate('EditProfileScreen')
              }} >
              <Icon name="md-create"></Icon>
              <Text> עריכת פרטים </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity
              style={{ alignItems: 'flex-start', paddingLeft: 10, flexDirection: 'row',paddingRight: 140 }}
              onPress={() => {
                this.props.navigation.navigate('CartScreen')
              }} >
              
              <Icon name="cart"></Icon>
              <Text> עגלת הקניות שלי </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 5,
    backgroundColor: '#C0C0C0',
    height: 300,
  },
  // avatar: {
  //   flex:1,
  //   width: 170,
  //   height: 170,
  //   borderRadius: 90,
  //   borderWidth: 4,
  //   borderColor: "white",
  //   marginBottom:20,
  //   alignSelf:'center',
  //   position: 'absolute',
  //   marginTop:130
  // },
  name: {
    fontSize: 50,
    color: "#C0C0C0",
    fontWeight: '600',
    padding: 60,
    textAlign: 'center',
    //paddingRight:120,
    paddingTop: 7,
    flex: 1,
  },
  icons: {
    //justifyContent: 'center',
    alignItems: 'flex-end',
    //paddingRight: 140,
    textAlign: 'center',
    //marginTop: -280,
    paddingBottom: 140,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 50,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 50,
    backgroundColor: "#C0C0C0",
  },
  avatar: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 50,

  },
  avatarPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: "#E1E2E6",
    borderRadius: 50,
    marginTop: 48,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 110,

  }
})

/* <View style={{ flexDirection: 'row', fontSize: 20 }}>
                        <Text>050-2241141</Text>
                        <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
                            <Icon name="call"></Icon>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', fontSize: 20, paddingTop: 10 }}>
                        <Text>Liron72@gmail.com</Text>
                        <View style={{ alignItems: 'flex-start', paddingLeft: 10 }}>
                            <Icon name="mail"></Icon>
                        </View>
                    </View>*/



/*
 <View style={{ flexDirection: 'row', }}>
                        <Button style={{ alignItems: 'flex-start', paddingLeft: 10 }}
                            title="הגדרות"
                            onPress={() => {
                                this.props.navigation.navigate('SettingScreen');
                            }}
                        />
                        <Icon name="settings"></Icon>
                    </View>
*/
