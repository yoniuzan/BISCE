import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, Image, Platform, TextInput, ScrollView,Alert} from 'react-native';
import {Header,  Item, Icon, Container, CardItem } from 'native-base';
import { CheckBox } from 'react-native-elements';
import {auth, database, f, fs} from '../../config/config.js' ;
console.disableYellowBox = true;
export default class adds extends React.Component
{
    

    constructor(props) {
        super(props);
        limit: 1
        this.state = {
            loggeedin: false,
            email: "",
            password: "",
            userName:"",
            name:"",
            flag: 0,
            registercheck:0,
        }
        this.state = {
          isTrue:true
        }
        this.state = {
            isTrue1:true
        }
        this.state = {
            isTrue2:true
        }
        this.state = {
            isTrue3:true
        }
        this.state = {
            isTrue4:true
        }
        this.state = {
            isTrue5:true
        }
        this.state = {
            isTrue6:false
        }
        this.state = {
            checked11:false
        }
        this.state = {
            checked1:false
        }
        this.state = {
            checked2:false
        }
        this.state = {
            checked3:false
        }
        this.state = {
            checked4:false
        }
        this.state = {
            checked5:false
        }
        this.state = {
            checked6:false
        }
        this.state = {
            checked7:false
        }
        this.state = {
            checked8:false
        }
        this.state = {
            checked9:false
        }
        this.state = {
            checked10:false
        }
        this.state = {
            checked11:false
        }
        this.state = {
            checked12:false
        }
        this.state = {
            checked13:false
        }
        this.state = {
            checked14:false
        }
        this.state = {
            checked15:false
        }
      }
      fromUpdate (newState){
        this.setState(newState)
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
            userid:userid
          });
      });
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.title}>סלט עשיר עם תוספות ושתייה לבחירה- ₪20</Text>
                    <CardItem header>
                        <Text fontSize={30} bold>בחר תוספות</Text>
                        
                    </CardItem>
                    <CheckBox
                        title='חסה'
                        //checked={this.state.checked}
                        checked={this.state.isTrue}
                        onPress={() => this.fromUpdate({isTrue: !this.state.isTrue})}
                        size={30}
                    //value= {this.state.checked}
                    //onChange={() =>this.checkBoxTest()}
                    />
                    <CheckBox
                        title='עגבניה'
                        checked={this.state.isTrue1}
                        onPress={() => this.fromUpdate({isTrue1: !this.state.isTrue1})}
                        size={30}
                       // maximumSelectionLength={1}
                        
                    />
                    <CheckBox
                        title='מלפפון'
                        checked={this.state.isTrue2}
                        onPress={() => this.fromUpdate({isTrue2: !this.state.isTrue2})}
                        size={30}
                    />
                    <CheckBox
                        title='כרוב לבן'
                        checked={this.state.isTrue3}
                        onPress={() => this.fromUpdate({isTrue3: !this.state.isTrue3})}
                        size={30}
                    />
                    <CheckBox
                        title='כרוב אדום'
                        checked={this.state.isTrue4}
                        onPress={() => this.fromUpdate({isTrue4: !this.state.isTrue4})}
                        size={30}
                    />
                    <CheckBox
                        title='חצילים'
                        checked={this.state.isTrue5}
                        onPress={() => this.fromUpdate({isTrue5: !this.state.isTrue5})}
                        size={30}
                    />
                    <CheckBox
                        title='גזר'
                        checked={this.state.isTrue6}
                        onPress={() => this.fromUpdate({isTrue6: !this.state.isTrue6})}
                        size={30}
                    />
                    <CheckBox
                        title='בצל סגול'
                        checked={this.state.isTrue7}
                        onPress={() => this.fromUpdate({isTrue7: !this.state.isTrue7})}
                        size={30}
                    />
                    <CheckBox
                    title='בטטה'
                    checked={this.state.isTrue8}
                    onPress={() => this.fromUpdate({isTrue8: !this.state.isTrue8})}
                    size={30}
                />
                <CheckBox
                        title='בורגול'
                        checked={this.state.isTrue9}
                        onPress={() => this.fromUpdate({isTrue9: !this.state.isTrue9})}
                        size={30}
                    />
                    <CheckBox
                        title='קישוא'
                        checked={this.state.isTrue10}
                        onPress={() => this.fromUpdate({isTrue10: !this.state.isTrue10})}
                        size={30}
                    />
                    <CheckBox
                    title='טונה'
                    checked={this.state.isTrue11}
                    onPress={() => this.fromUpdate({isTrue11: !this.state.isTrue11})}
                    size={30}
                />
                <CheckBox
                        title='פטריות'
                        checked={this.state.isTrue12}
                        onPress={() => this.fromUpdate({isTrue12: !this.state.isTrue12})}
                        size={30}
                    />
                    
                    <CheckBox
                        title='גבינה בולגרית- תוספת של ₪3'
                        checked={this.state.isTrue13}
                        onPress={() => this.fromUpdate({isTrue13: !this.state.isTrue13})}
                        size={30}
                    />
                    <CheckBox
                        title='ביצה- תוספת של ₪3'
                        checked={this.state.isTrue14}
                        onPress={() => this.fromUpdate({isTrue14: !this.state.isTrue14})}
                        size={30}
                    />
                    <CheckBox
                        title='קרוטונים'
                        checked={this.state.isTrue15}
                        onPress={() => this.fromUpdate({isTrue15: !this.state.isTrue15})}
                        size={30}
                    />
                    <View> 
                     {this.state.email == "Liron5@gmail.com" ?
                     <View>
                         <Button style={styles.fixToText}
                        title="הוספת תוספת"
                        onPress={() => this.props.navigation.navigate('AdddScreen')  
                    }
                        
                    />
                         </View>
                     
                     : 
                     <View>
                        
                         </View>
                     }
                     </View>
                    <Text />
                    <CardItem header>
                        <Text fontSize={30} bold>בחר משקה</Text>
                    </CardItem>
                    <CheckBox
                        title='נסטי'
                        checked={this.state.checked11}
                        onPress={() => this.fromUpdate({checked11: true,checked1:false, checked2:false, checked3:false, checked4:false,checked5:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='מים אפרסק'
                        checked={this.state.checked1}
                        onPress={() => this.fromUpdate({checked1: true,checked11:false, checked2:false, checked3:false, checked4:false,checked5:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='מים ענבים'
                        checked={this.state.checked2}
                        onPress={() => this.fromUpdate({checked2: true,checked1:false, checked11:false, checked3:false, checked4:false,checked5:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='מים תפוח'
                        checked={this.state.checked3}
                        onPress={() => this.fromUpdate({checked3: true,checked1:false, checked2:false, checked11:false, checked4:false,checked5:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='תפוזים'
                        checked={this.state.checked4}
                        onPress={() => this.fromUpdate({checked4: true,checked1:false, checked2:false, checked3:false, checked11:false,checked5:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='אשכוליות'
                        checked={this.state.checked5}
                        onPress={() => this.fromUpdate({checked5: true,checked1:false, checked2:false, checked3:false, checked4:false,checked11:false, checked6:false})}
                        size={30}
                    />
                    <CheckBox
                        title='מים'
                        checked={this.state.checked6}
                        onPress={() => this.fromUpdate({checked6: true,checked1:false, checked2:false, checked3:false, checked4:false,checked5:false, checked11:false})}
                        size={30}
                        value={true}
                        disabled={false}
                    />


                    {this.state.email == "Liron5@gmail.com" ?
                        <View>
                            <Button style={styles.fixToText}
                                title="הוספת משקה"
                                onPress={() => this.props.navigation.navigate('')
                                }

                            />
                        </View>

                        :
                        <View style={styles.title1}>
                        <Button
                            title="הוסף לעגלה"
                            onPress={() => this.props.navigation.navigate('')}
                            onPress={() => Alert.alert("המוצר התווסף לעגלה!")} />

                    </View>
                    }

                   
                </View>
            </ScrollView>
        )
    }
}


        const styles = StyleSheet.create({
            container: {
            
                backgroundColor: '#ffffff',
                flex: 1,
                marginTop:Platform.OS==="android"?24:0,
                
              },
              title: {
                justifyContent: 'space-around',
                textAlign: 'center',
                marginVertical: 10,
                fontWeight: 'bold',
                fontSize: 25,
                padding: 20
               
            },
            })
