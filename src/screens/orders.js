import { Card, Icon, Accordion } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, storage, f, fs } from '../../config/config.js';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
console.ignoredYellowBox = true;


export default class orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataOrders: [],
            expanded: false,
        }
    }

    componentDidMount = () => {
        database.ref('/orders/').on('value', querySnapshot => {
            console.log('enter database');
            let data = querySnapshot.val()
            //console.log('data', data);
            querySnapshot.forEach(s => {
                this.state.dataOrders.push([s.val().name, s.val().username, s.val().price, s.val().data])
            })
            this.setState({
                dataOrders: this.state.dataOrders
            })
            console.log('dataOrders', this.state.dataOrders);
        })
    }

    toggleExpand = (item, index) => {
        console.log('enter toggle')
        //console.log(index)
        console.log(this.state.dataOrders[index][3]) //data
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

    passToComplete=(nameprod)=>{
        var id;
        let prodRef = database.ref('/orders/')
        return new Promise((resolve, reject) => {
            prodRef.on('value', function (snapshot) {
                if (snapshot.val() == null) {
                    reject(null);
                } else {
                    snapshot.forEach(function (data) {
                        if (data.val().name == nameprod) {
                            var item = {
                                key: data.key,
                            }
                            id = item
                        }
                    });
                    resolve(id)
                    console.log('       ID      ', id.key)   
                }
            })
            let toDelete=database.ref('/orders/'+id.key)
            toDelete.remove()
        })
    }

    orderPass = async (index) => {
        const orders = this.state.dataOrders
        const nameprod=this.state.dataOrders[index][0]
        let flag = await AsyncStorage.getItem('flag');
        console.log(flag)
        if (flag == 1) {
            console.log('enter if !!! ')
            orders.splice(index, 1)   
            this.passToComplete(nameprod);
            this.setState({ dataOrders: orders })  
        }
        AsyncStorage.removeItem('flag')
        database.ref('orderCompleted/').push({
            test:'test',
            name: nameprod,
            price: this.state.dataOrders[index][2],
        }).then(function () {
            console.log("Document successfully written!");
        }).catch(function (error) {
            console.log("Error writing document: ", error);
        })
        
    }
    renderDetails = async (item, index) => {
        console.log('ITEM  ', item)
        let myOrder=JSON.stringify(this.state.dataOrders[index][3])
        await AsyncStorage.setItem('myOrder', myOrder)
        console.log('  MY order ',myOrder)
        this.props.navigation.navigate('OrderDetailsScreen')
    }

    hasPay=()=>{
        let payed= AsyncStorage.getItem('pay');
        console.log(payed)
        if (payed=="1"){
            AsyncStorage.removeItem('pay')
            return "שולם"
        }
        else{
            AsyncStorage.removeItem('pay')
            return "לא שולם"
        }
        
    }
    //render של ההזמנה 
    _renderItem = (item, index) => {
        return (
            <View style={{ margin: 20, backgroundColor: 'trasnparent', fex: 2, justifyContent: 'space-between', borderBottomColor: "gray", borderBottomWidth: 1, paddingBottom: 10 }}>
                <View style={{ flex: 3, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-around' }} onPress={() => this.renderDetails(item, index)}>
                            <Text style={styles.price}>
                                {item[0]}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.price}>
                            ₪{item[2]}
                        </Text> 
                        {/* <Text style={styles.price}>
                           {this.hasPay()}
                        </Text> */}
                        <TouchableOpacity
                            onPress={() => this.orderPass(index)}>
                            <Text style={styles.price}>
                                הועבר
                                </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 4, justifyContent: 'space-between', margin: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                שם
                            </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                מחיר
                            </Text>
                            {/* <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                שולם
                            </Text> */}
                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                מצב
                            </Text>
                        </View>
                        <FlatList
                            data={this.state.dataOrders}
                            renderItem={({ item, index }) => this._renderItem(item, index)}
                            keyExtractor={(index) => index.toString()}>
                        </FlatList>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop:Platform.OS==="android"?24:0,

    },
    price: {
        //fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 13,
        alignContent: 'center',
        textAlign: 'center',
        //justifyContent:'space-around'

    },
})