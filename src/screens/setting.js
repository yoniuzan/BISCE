import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput} from 'react-native';
import {Header,  Item, Icon, Container } from 'native-base';
console.disableYellowBox = true;
export default class setting extends React.Component
{
    render() {
        return (
            <View style={styles.container}>
                    <Button

                        title="הגדרות"
                        //onPress={() => this.props.navigation.navigate('ProfileScreen')} 
                        />
                </View>
        )}}

        const styles = StyleSheet.create({
            container: {
            
                backgroundColor: '#ffffff',
                flex: 1,
                marginTop:Platform.OS==="android"?24:0,
                
              },
            })
