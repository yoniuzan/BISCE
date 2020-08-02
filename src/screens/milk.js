import React, { Component } from 'react';
//import {  } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput, I18nManager} from 'react-native';
import {Header,  Item, Icon, Container,SectionList } from 'native-base';
import { ListItem,SearchBar } from 'react-native-elements';
console.disableYellowBox = true;
const list = [
   
    {
      name: 'סלטים',
      avatar_url: 'https://www.aroma.co.il/_media/media/37/1709.jpg',
     // subtitle: 'Vice Chairman'
     it:"SaladScreen",
    },
    {
        name: 'טוסטים',
        avatar_url: 'https://besttv232-ynet-images1-prod.cdn.it.best-tv.com//PicServer5/2018/03/21/8420645/640x360_pro.jpg',
       // subtitle: 'Vice Chairman'
       it:"ToastsScreen"
      },
    {
      name: 'מאפים',
      avatar_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxZUPmGig90Tg7NgZHIkhZNsdsY2C7Ytlu5PT26H2P6-Yl5jxH&s',
     // subtitle: 'Vice Chairman'
     it:"CorasonScreen"
    },
    {
        name: 'משקאות חמים',
        avatar_url: newFunction(),
       // subtitle: 'Vice President'
       it:"DrinkScreen"
      },
      {
        name: 'מזון מהיר',
        avatar_url: 'https://besttv232-ynet-images1-prod.cdn.it.best-tv.com//PicServer5/2018/03/21/8420645/640x360_pro.jpg',
       // subtitle: 'Vice Chairman'
       it:"SnacksScreen"
      },
     
  ]
  const filterList=[
  {
      name:'סלטים'
  },
  {
    name:'טוסטים'
},
{
    name:'מאפים'
},
{
    name:'משקאות'
},
{
    name:'מזון'
},
{
    name:'מהיר'
}
  ]
   // onPress={() => this.props.navigation.navigate('DrinkScreen')}
export default class login extends React.Component
{
    constructor(props) {
        super(props);
        I18nManager.forceRTL(true);
      }
      state = {
        search: '',
      };
    
      updateSearch = search => {
        this.setState({ search });
      };
    render() {
        //const { search } = this.state;
        return (
            <View style={styles.Container}>
                                 
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      flex: 1,
      marginTop:Platform.OS==="android"?24:0,
      writingDirection: I18nManager.isRTL ? 'ltr' : 'rtl'
      
    },
})

function newFunction() {
    return 'data:image/jpeg;base64,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';
}
