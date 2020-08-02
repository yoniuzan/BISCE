import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput, ScrollView} from 'react-native';
import {Header,  Item, Icon, Container } from 'native-base';
import { ListItem, PricingCard } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
console.disableYellowBox = true;
export default class shop extends React.Component
{
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                <PricingCard
                    color="#4f9deb"
                    title="טוסט"
                    price="₪26"
                    info={['תוספות: רוטב פיצה\n גבינת שמנת\n זיתים\n פטריות\n בולגרית(+3₪)', 'שתייה: תפוזים']}
                    button={{ title: 'הסר' }}
                />
                <PricingCard
                    color="#4f9deb"
                    title="סלט"
                    price="₪26"
                    info={['תוספות: חסה\n עגבניה\n מלפפון\n פטריות\n בולגרית(+3₪)\n בצל סגול\n בטטה\n קרוטונים\n', 'שתייה: נסטי']}
                    button={{ title: 'הסר' }}
                />
                <PricingCard
                    color="#4f9deb"
                    title="קוראסון שוקולד"
                    price="₪5"
                    //info={['תוספות: חסה\n עגבניה\n מלפפון\n פטריות\n בולגרית(+3₪)\n בצל סגול\n בטטה\n קרוטונים\n', 'שתייה: נסטי']}
                    button={{ title: 'הסר' }}
                />
                <PricingCard
                    color="#4f9deb"
                    title="נס על חלב"
                    price="₪7"
                    //info={['תוספות: חסה\n עגבניה\n מלפפון\n פטריות\n בולגרית(+3₪)\n בצל סגול\n בטטה\n קרוטונים\n', 'שתייה: נסטי']}
                    button={{ title: 'הסר' }}
                />
                <PricingCard
                    color="#9acd32"
                    title="תשלום כולל:"
                    price="₪64"
                    //info={['תוספות: חסה\n עגבניה\n מלפפון\n פטריות\n בולגרית(+3₪)\n בצל סגול\n בטטה\n קרוטונים\n', 'שתייה: נסטי']}
                    button={{ title: 'אני רוצה לשלם' }} onButtonPress={() => this.props.navigation.navigate('TypePayScreen')}
                />

                </ScrollView>
                </View>

        )
    }
}

        const styles = StyleSheet.create({
            container: {
            
                backgroundColor: '#ffffff',
                flex: 1,
                marginTop:Platform.OS==="android"?24:0,
                fontSize:40,
                
              },
            })
            /*const list  = [
   
    {
      name: 'בגט שווארמה',
      subtitle: '\nתוספות:\n חומוס,\n טחינה,\n חריף,\n סלט ירקות\n\n שתייה:\n מים אפרסק\n\n מחיר:₪32'
    },
    
    ]


     {
                    list.map((l, i) => (
                        <ListItem 
                            Component={TouchableScale}
                            key={i}
                            //leftAvatar={{ source: { uri: l.avatar_url } }}
                            title={l.name}
                            //subtitle={l.subtitle}
                            bottomDivider
                            //chevron
                            subtitle={l.subtitle} 
                        /> 
                    ))
                }

                */