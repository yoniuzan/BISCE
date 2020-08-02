import { Card, Icon, Accordion } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, LayoutAnimation, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { auth, database, storage, f, fs } from '../../config/config.js';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
console.ignoredYellowBox = true;

export default class orderDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataOrder: [],
            nameProd: "",
            quantity: "",
            infos: [],
            info_display: [],
        }
    }

    componentDidMount = async () => {
        try {
            let myOrder = await AsyncStorage.getItem('myOrder')

            this.setState({ dataOrder: JSON.parse(myOrder) })
        }
        catch (err) {
            console.log(err)
            alert('Error')
        }
        console.log('DATA   ', this.state.dataOrder)

    }
    displayDetails = () => {
        //************** QUANTITY 
        //console.log('   QUANT   ', this.state.dataOrder[1].quantity)

        //************** INFOS
        var arr = []
        arr = this.state.dataOrder[0].food[1][0][0]
        console.log('    INFOS     ', arr)
        // for (var i = 1; i <= arr.length; i++) {
        //     for (var j in arr[i]) {
        //         this.state.infos.push(arr[i][j])
        //     }
        // }
        // console.log('**********', this.state.infos)

        // var arr2 = []
        // arr2 = this.state.infos
        // for (var i = 0; i <= arr2.length; i++) {

        //     this.state.info_display.push(arr2[i])

        // }
        // console.log('    INFOS     ', this.state.info_display)

    }

    checkOut = async () => {        
        let flag="1";
        await AsyncStorage.setItem('flag', flag);
        AsyncStorage.removeItem('myOrder');
        console.log(flag);
        this.props.navigation.navigate('OrdersScreen')
    }

    render() {
        var name = this.state.dataOrder

        //console.log('    +    ', arr)
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ flex: 4, justifyContent: 'space-around', margin: 20 }}>
                        {
                            name.map((item, index) => {
                                return (
                                    <View>
                                        <View style={{ flex: 2, flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                שם מוצר :
                                        </Text>
                                            <Text style={{ fontSize: 20 }}>
                                                {item.food[0]}
                                            </Text>
                                        </View>
                                        {
                                            ((item.food[0] == 'סלט קטן') || (item.food[0] == 'סלט בינוני') || (item.food[0] == 'סלט גדול') || (item.food[0]== 'טוסט')) ?

                                                <View style={{ flex: 2, marginBottom: 10 }}>
                                                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                        פרטים :
                                                    </Text>
                                                    {
                                                        item.food.map((data, key) => {
                                                            return (
                                                                <View>
                                                                    <Text key={key} style={{ fontSize: 20 }}>
                                                                       {/* {console.log('    DATA TOAST         ',data[0][0])} */}
                                                                       {data[0][0]}
                                                                    </Text>
                                                                </View>
                                                            )//return map2
                                                        })//map function 2
                                                    }{/*fin arr*/}

                                                </View>
                                                :
                                                <View>
                                                </View>
                                        }{/*fin if*/}

                                        <View style={{ flex: 2, flexDirection: 'row', marginBottom: 10 }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                                                כמות :
                                            </Text>
                                            <Text style={{ fontSize: 20 }}>
                                                {item.quantity}
                                            </Text>
                                        </View>
                                    </View>
                                )//return in map
                            })//map function
                        }{/*fin name*/}

                        <TouchableOpacity
                            style={{ marginHorizontal: 15, alignItems: 'center', padding: 10, borderRadius: 5, backgroundColor: 'gray' }}
                            onPress={() => this.checkOut()}>
                            <Text style={{ fontSize: 24, fontWeight: "bold", color: 'white' }}> טופל</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View >
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