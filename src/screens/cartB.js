import React, { Component } from 'react';
import { View, Text, Button, Dimensions, StyleSheet, Image, Platform, TextInput, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Header, Item, Icon, Container, Row } from 'native-base';
import { ListItem, PricingCard } from 'react-native-elements';
//import { database } from 'firebase';
import { auth, database, storage, f, fs } from '../../config/config.js';
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

var { width } = Dimensions.get("window")

export default class cartB extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataCart: [],
            loggeedin: false,
            email: "",
            password: "",
            userName: "",
            name: "",
            flag: 0,
            registercheck: 0,
        };
    }


    async componentDidMount() {
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
        console.log('enter here  !!!')
        try {
            let cartB = await AsyncStorage.getItem('cartB')
            if (cartB !== null) {
                const cartfood = JSON.parse(cartB)
                this.setState({ dataCart: cartfood })
            }
        } catch (error) {
            alert(error)
        }
        console.log('    DC   :', this.state.dataCart)
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
                userid: userid
            });
        });
    }

    //button +/- function
    onChangeQuat = (i, type, item) => {

        const cartB = this.state.dataCart
        let count = cartB[i].quantity;
        if (type) {
            count = count + 1
            cartB[i].quantity = count
            this.setState({ dataCart: cartB })
        }
        else if (type == false && count >= 2) {
            count = count - 1
            cartB[i].quantity = count
            this.setState({ dataCart: cartB })
        }
        else if (type == false && count == 1) {
            cartB.splice(i, 1)
            this.setState({ dataCart: cartB })
        }
    }

    checkOut = async () => {
        try {
            database.ref('/orders/').push({
                name: this.state.name,
                price: this.onLoadTotal(),
                email: this.state.email,
                username: this.state.userName,
                data: this.state.dataCart,
                time: this.timeTotal()
            }).then(function () {
                console.log("Document successfully written!");
            }).catch(function (error) {
                console.log("Error writing document: ", error);
            })
            alert('הזמנתך תהיה מוכנה בעוד ' + this.timeTotal() + ' דקות')
            this.props.navigation.navigate('TypePayScreen')
        } catch (err) {
            console.log(err)
        }
    }

    timeTotal =  () => {
        var total = 0;
        const cart = this.state.dataCart

        for (var i = 0; i < cart.length; i++) {
            total = total + parseInt(cart[i].time)
        }
        
        return total
    }

    onLoadTotal =  () => {
        var total = 0;
        const cart = this.state.dataCart

        for (var i = 0; i < cart.length; i++) {
            total = total + (cart[i].pricetotal * cart[i].quantity)

        }
        
        return total

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ paddingTop: 8 }}>
                        <TouchableOpacity
                            style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 20 }}
                            onPress={() => {
                                AsyncStorage.removeItem('cart'),
                                    this.props.navigation.navigate('HomeLoginScreen')
                            }}>
                            <Icon
                                name="ios-trash">
                            </Icon>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>  איפוס רשימה </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.dataCart.map((item, i) => {
                            return (
                                <View style={{ margin: 20, backgroundColor: 'trasnparent', fex: 2, justifyContent: 'space-between', borderBottomColor: "gray", borderBottomWidth: 1, paddingBottom: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{item.food[0]}</Text>
                                    </View>
                                    <Text />
                                    <View style={{ backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>₪ {item.pricetotal * item.quantity}</Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => this.onChangeQuat(i, true)}>
                                                <Icon name="ios-add-circle" size={30} color={"white"} />
                                            </TouchableOpacity>
                                            <Text style={{ fontWeight: 'bold', paddingHorizontal: 8 }}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => this.onChangeQuat(i, false, item)}>
                                                <Icon name="ios-remove-circle" size={30} color={"white"} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                    <View style={{ flexDirection: 'row', margin: 20, backgroundColor: 'trasnparent', fex: 2, justifyContent: 'space-between', paddingBottom: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> סה"כ</Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {this.onLoadTotal()}₪ </Text>
                    </View>
                    <TouchableOpacity
                        style={{ marginHorizontal: 15, alignItems: 'center', padding: 10, borderRadius: 5, backgroundColor: 'gray' }}
                        onPress={() => this.checkOut()}>
                        <Text style={{ fontSize: 24, fontWeight: "bold", color: 'white' }}> מעבר לתשלום </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop: Platform.OS === "android" ? 24 : 0,
        fontSize: 40,


    },
})
