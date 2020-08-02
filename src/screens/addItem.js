import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Picker, Image, Platform, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { auth, database, f, fs, storage } from '../../config/config.js';
import * as ImagePicker from 'expo-image-picker';
//import { check } from 'react-native-permissions';
console.disableYellowBox = true;
export default class addItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: "",//halavi or bassari
            screen: "",
            name: "",
            description: "",
            price: "",
            time: "",
            avatar: "",
            isTrue: "",
            image:"",

        }
    }

    updateType = (type) => {
        this.setState({ type: type })
    }

    updateScreen = (screen) => {
        this.setState({ screen: screen })
    }

    addItemtoDB = (n) => {
        this.setState({
            name: n,
        })
        console.log('type, scrreen', this.state.type, this.state.screen)
        database.ref('products/' + this.state.type + '/' + this.state.screen + '/').push({
            name: this.state.name,
            //description: this.state.description,
            price: this.state.price,
            time: this.state.time,
            avatar: this.state.avatar,
            check: 'false'
        }).then(function () {
            console.log("Document successfully written!");
            alert('המוצר התווסף')
        }).catch(function (error) {
            console.log("Error writing document: ", error);
        });
    }

    chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
          });

        if (!result.cancelled) {
            this.setState({image: result.uri});
            database.ref().child("images/" + this.state.screen + "/" + this.state.name);
            
        }
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
            <ScrollView>
            <View style={styles.container}>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17, textAlign: 'center', paddingTop:10 }}> על מנת להוסיף מוצר נא למלא את כל השדות :</Text>
                <Text />
                <View style={{  
                justifyContent: 'space-around',
                textAlign: 'center',
                marginVertical: 10, }}>
                    <View style={{  }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20,textAlign: 'center', paddingTop:10}}> בחירת מנזה : </Text>
                        <Picker 
                            selectedValue={this.state.type}
                            onValueChange={this.updateType}>
                            <Picker.Item label ="בחר" value="בחר"/>
                            <Picker.Item label="חלבי" value="חלבי" />
                            <Picker.Item label="בשרי" value="בשרי" />
                        </Picker>
                    </View>
                    <Text/>
                    {(this.state.type == "בשרי") 
                        ?
                        <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center', }}> בחירת סוג מוצר : </Text>
                        <Picker
                            selectedValue={this.state.screen}
                            onValueChange={this.updateScreen}>
                            <Picker.Item label ="בחר" value="בחר"/>
                            <Picker.Item label="שתייה" value="שתייה" />
                            <Picker.Item label="תוספת" value="תוספת" />
                        </Picker>
                    </View>
                        :

                        (this.state.type == "חלבי") 
                        ?
                        <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center', }}> בחירת סוג מוצר : </Text>
                        <Picker
                            selectedValue={this.state.screen}
                            onValueChange={this.updateScreen}>
                            <Picker.Item label ="בחר" value="בחר"/>
                            <Picker.Item label="שתייה קרה" value="שתייה קרה" />
                            <Picker.Item label="תוספת" value="תוספת" />
                            <Picker.Item label="שתייה חמה" value="שתייה חמה" />
                            <Picker.Item label="שוקולדים" value="שוקולדים" />
                            <Picker.Item label="חטיפים" value="חטיפים" />
                            <Picker.Item label="מאפים" value="מאפים" />
                        </Picker>
                    </View>
                    :

                        <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center', }}> בחירת סוג מוצר : </Text>
                        <Picker
                            selectedValue={this.state.screen}
                            onValueChange={this.updateScreen}>
                            <Picker.Item label ="בחר" value="בחר"/>
                        </Picker>
                    </View>
                }

                
                    
                    <Text/>
                    <Text/>
                    <Text/>
                    <Text/>
                    {(this.state.type == "חלבי") &&((this.state.screen == "שתייה קרה")||(this.state.screen == "מאפים")||(this.state.screen == "שתייה חמה"))
                        ? <View style={{justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 30,}}>
                            <Text />
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, textAlign: 'center', }}>הוסף תמונה</Text>
                            {/* <TouchableOpacity

                                onPress={()=>this.chooseImage()}>
                                <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', }}>בחר תמונה</Text>
                                <Text/>
                                <Text/>
                                <Text/>
                            </TouchableOpacity> */}

                            
                            <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.PickAvatar} >
                            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', }}>בחר תמונה</Text>
              <Image source = {{ uri : this.state.avatar}} style ={styles.avatar}  onChangeText={(text) => this.setState({ avatar: text })}
                                value={this.state.avatar}/>
              
            </TouchableOpacity>
                            <Text/>
                            <Text/>
                            <Text/>
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=" שם המוצר"
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}>
                            </TextInput>
                            <Text />
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="מחיר"
                                onChangeText={(text) => this.setState({ price: text })}
                                value={this.state.price}>
                            </TextInput>
                            <Text />

                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="זמן הכנה ממוצע"
                                onChangeText={(text) => this.setState({ time: text })}
                                value={this.state.time}>
                            </TextInput>
                            <Text/>
                            <TouchableOpacity 
                                style={styles.fixToText}
                                onPress={() => this.addItemtoDB(this.state.name)}>
                                    <Text> הוספה </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View >

                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder=" שם המוצר"
                                onChangeText={(text) => this.setState({ name: text })}
                                value={this.state.name}>
                            </TextInput>
                            <Text />
                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="מחיר"
                                onChangeText={(text) => this.setState({ price: text })}
                                value={this.state.price}>
                            </TextInput>
                            <Text />

                            <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="זמן הכנה ממוצע"
                                onChangeText={(text) => this.setState({ time: text })}
                                value={this.state.time}>
                            </TextInput>
                            <Text/>
                            <TouchableOpacity 
                                style={styles.fixToText}
                                onPress={() => this.addItemtoDB(this.state.name)}>
                                    <Text style={{ color: 'black', fontWeight: 'bold', fontSize:30, textAlign:"center"}}> הוספה </Text>
                            </TouchableOpacity>
                        </View>
                        
                    }


                </View>

            </View>
            
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,

        //marginTop:Platform.OS==="android"?24:0,
    },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: '#A0CC39',
        borderRadius: 25,
        alignSelf: 'center',
        textAlign: 'center',
        color: "black",
        fontWeight: 'bold',
    },
    title: {
        //justifyContent: 'space-around',
        //textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 20,
        //padding:40 
    },

    title1: {
        //justifyContent: 'space-around',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 40,
        paddingTop: 30
        //padding:40 
    },
    fixToText:{
        justifyContent: 'flex-start',
        textAlign: 'center',
       // marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 40,
       //fontFamily: 'vincHand',
        color: 'black',
        //flex:1,
        //padding:50
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