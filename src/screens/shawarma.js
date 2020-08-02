import React, { Component } from 'react';
import {View, Text, Button, AsyncStorage, StyleSheet, Image, Platform, TextInput, ScrollView} from 'react-native';
import {Header,  Item, Icon, Container } from 'native-base';
import { PricingCard } from 'react-native-elements';
console.disableYellowBox = true;
export default class shawarma extends React.Component
{
    constructor(props){
        super (props);
        this.state={
            bassar:" שווארמה "
        }
    }
    pressPita=async ()=>{
        let price="25"
        await AsyncStorage.setItem('price', price);
        await AsyncStorage.setItem('bassar', this.state.bassar)
        this.props.navigation.navigate('AddsScreen')
    }

    pressBaguet= async()=>{
        let price="32"
        await AsyncStorage.setItem('price', price);
        await AsyncStorage.setItem('bassar', this.state.bassar)
        this.props.navigation.navigate('AddsScreen')
    }

    pressLafa= async()=>{
        let price="35"
        await AsyncStorage.setItem('price', price);
        await AsyncStorage.setItem('bassar', this.state.bassar)
        this.props.navigation.navigate('AddsScreen')
    }

    pressTsalhat= async()=>{
        let price="38"
        await AsyncStorage.setItem('price', price);
        await AsyncStorage.setItem('bassar', this.state.bassar)
        this.props.navigation.navigate('AddsScreen')
    }


    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                <PricingCard
                   color="#A0CC39" 
                    title="בפיתה" style={styles.title}
                    price="₪25" style={styles.price}
                    info={['ציפס + שתייה', 'סלטים לבחירה']}
                    button={{ title: 'המשך' }} onButtonPress={() => this.pressPita()}
                    priceSize= '20'
                />
                <PricingCard
                   color="#A0CC39" 
                    title="בבגט" style={styles.title}
                    price="₪32" style={styles.price}
                    info={['ציפס + שתייה', 'סלטים לבחירה']}
                    button={{ title: 'המשך' }} onButtonPress={() => this.pressBaguet()}
                    priceSize= '20'
                />
               <PricingCard
                   color="#A0CC39" 
                    title="בלאפה" style={styles.title}
                    price="₪35" style={styles.price}
                    info={['ציפס + שתייה', 'סלטים לבחירה']}
                    button={{ title: 'המשך' }} onButtonPress={() => this.pressLafa()}
                    priceSize= '20'
                />
                <PricingCard
                   color="#A0CC39" 
                    title="בצלחת" style={styles.title}
                    price="₪38" style={styles.price}
                    info={['ציפס + שתייה', 'סלטים לבחירה']}
                    button={{ title: 'המשך' }} onButtonPress={() => this.pressTsalhat()}
                    priceSize= '20'
                />
                     </View>
                </ScrollView>
            </View>
        )}}


        const styles = StyleSheet.create({
            container: {
            
                backgroundColor: '#ffffff',
                flex: 1,
                //marginTop:Platform.OS==="android"?24:0,
                
              },
            })