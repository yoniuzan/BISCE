import React, { Component } from 'react';
import TouchableScale from 'react-native-touchable-scale';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput, I18nManager} from 'react-native';
import {Header,  Item, Icon, Container } from 'native-base';
import { ListItem, SearchBar } from 'react-native-elements';
import { auth, database, f, fs } from '../../config/config.js';
console.disableYellowBox = true;
const list = [
    {
      name: 'שווארמה',
      avatar_url: 'https://www.groo.co.il/_media/media/19292/206769.jpg',
     // subtitle: 'Vice President'
     it:"ShawarmaScreen"
    },
    {
      name: 'שניצל',
      avatar_url: 'https://images.haarets.co.il/image/fetch/x_0,y_50,w_800,h_465,c_crop/q_auto,h_698,w_1200,c_fill,f_auto/fl_lossy.any_format.preserve_transparency.progressive:none/https://www.haaretz.co.il/polopoly_fs/1.3192123!/image/4200447530.jpg',
     // subtitle: 'Vice Chairman'
     it:"ShnicelScreen"
    },
    {
      name: 'קבב',
      avatar_url: 'https://img.wcdn.co.il/f_auto,w_700,t_54/1/4/8/3/1483473-46.jpg',
     // subtitle: 'Vice Chairman'
     it:"KababScreen"
    },
    {
        name: 'פרגית',
        avatar_url: 'https://kazaviabashuk.com/wp-content/uploads/2019/11/VVFFDD.jpg',
       // subtitle: 'Vice Chairman'
       it:"PargitScreen"
      },
      {
        name: 'אנטריקוט',
        avatar_url: 'https://besttv232-ynet-images1-prod.cdn.it.best-tv.com/PicServer4/2015/11/23/6652033/66518650100892640360no.jpg',
       // subtitle: 'Vice Chairman'
       it:"AntriScreen"
      },
      {
        name: 'לבבות',
        avatar_url: 'https://files.mishloha.co.il/files/menu_food_pic/225201646595546.jpg',
       // subtitle: 'Vice Chairman'
       it:"LevScreen"
      },
  ]
  
export default class login extends React.Component
{


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
    }
    this.state = {
        name: "",
        description: "",
        price: "",
        time: "",
        avatar: "",
        isTrue: true,
        addt: ['lo', 'lp']
    }
    I18nManager.forceRTL(true);

}
componentDidMount = () => {
    console.log('new enter function');
    database.ref('/products/חלבי/טוסטים').once('value', querySnapshot => {
        console.log('enter once');
        console.log(querySnapshot.val())
        let data = querySnapshot.val()
        //console.log ('data:', data)
        //let totItems = [...data];
        //var arr = []
        var li = []
        querySnapshot.forEach(s => {
            //console.log("dyuk")
            // this.state.addt.push([name])

            var a = Object.values(Object.values(s.val()))
            console.log("ol")
            console.log(a[0]);

            li.push(a[0])
            //    console.log(Object.values(a.values()))
            //    console.log(Object.values(a.values().next)[0])
        })
        console.log(li)
        console.log("tyui")
        console.log(this.state.addt)
        //console.log('arr', arr)
        this.setState({
            addt: li
        })
        console.log('addt', this.state.addt);
    })
    var that = this;
    f.auth().onAuthStateChanged(function (user) {

        if (user) {
            //logged in

            that.fetchUserInfo(user.uid);

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


    var that = this;
    database.ref('users').child(userid).once('value').then(function (snapshot) {
        const exists = (snapshot.val() !== null);


        //if(exists) data = snapshot.val();//this line is not work on the websit
        that.setState({
            username: snapshot.val().username,
            name: snapshot.val().name,
            email: snapshot.val().email,
            password: snapshot.val().password,
            userid: userid
        });
    });
}

    state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };
    render() {
        const { search } = this.state;
        return (
            <View style={styles.Container}>
                           {/* <SearchBar
        placeholder="חיפוש"
        onChangeText={this.updateSearch}
        value={search}
      /> */}
            {
                list.map((l, i) => (
                    <ListItem
                        Component={TouchableScale}
                        key={i}
                        leftAvatar={{ source: { uri: l.avatar_url } }}
                        title={l.name}
                        //subtitle={l.subtitle}
                        bottomDivider
                        chevron
                        onPress={() => this.props.navigation.navigate(l.it)}
                    /> 
                ))
                
            }
             {this.state.email == "Liron5@gmail.com" ?
                             <View style={styles.title1}>
                             <Button
                                 title='הוספת סוג בשר'
                                 onPress={() => this.props.navigation.navigate('')} />
                         </View>

                            :
                            <View style={styles.title1}>
                            </View>
                        }
        </View>
        )}}

        const styles = StyleSheet.create({
            container: {
              
              backgroundColor: '#ffffff',
              flex: 1,
              marginTop:Platform.OS==="android"?24:0,
              
            },
        })

function newFunction() {
    return 'data:image/jpeg;base64,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';
}