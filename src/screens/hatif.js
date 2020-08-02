import { Card,Icon } from 'native-base';
import React, { Component } from 'react';
import { AsyncStorage, FlatList, Image, ScrollView, StyleSheet, Text,TextInput, TouchableOpacity, View } from 'react-native';
import { auth, database, storage, f, fs } from '../../config/config.js';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
console.ignoredYellowBox = true;
console.disableYellowBox = true;
/*const DATAPROD = [{
    id: 123,
    name:'Fuze Tea',
    price:'₪6',
    image:require('../images/c1.jpg')
},
{
    id:234,
    name:'מים קטן',
    price:'₪5',
    image:require('../images/c2.jpg')
},
{
    id:345,
    name:'נביעות אפרסק קטן',
    price:'₪6.5',
    image:require('../images/c3.jpg')
},
{
    id:456,
    name:'נביעות תפוח קטן',
    price:' ₪6.5',
    image:require('../images/c4.jpg')
},
{
    id:567,
    name:'נביעות ענבים קטן',
    price:' ₪6.5',
    image:require('../images/c5.jpg')
}
];*/

export default class hatif extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataFood: [],
            //name:'',
            //price:'',
            type: "",//halavi or bassari
            screen: "",
            name: "",
            description: "",
            price: "",
            time: "",
            avatar: "",
            isTrue: "",
            image: "",
            loggeedin: false,
            email: "",
            password: "",
            userName: "",
            name: "",
            flag: 0,
            registercheck: 0,
        }
    }
    PickAvatar = async () => {
        console.log("ddd");
        // UserPermission.getCameraPermission()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ avatar: result.uri });
            console.log("liron")
            database.ref('users').child(this.state.userid).child('avatar').set(this.state.avatar);

        }

    };
    chooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.cancelled) {
            this.setState({ image: result.uri });
            database.ref().child("images/" + this.state.screen + "/" + this.state.name);

        }
    }
    deleteProduct = (nameProd) => {
        var id;
        let prodRef = database.ref('/products/חלבי/שתייה קרה')
        return new Promise((resolve, reject) => {
            prodRef.on('value', function (snapshot) {

                if (snapshot.val() == null) {
                    reject(null);
                } else {
                    snapshot.forEach(function (data) {
                        if (data.val().name == nameProd) {
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
            let toDelete = database.ref('products/חלבי/שתייה קרה/' + id.key)
            toDelete.remove()

        })
    }

    updatename= (nameProd) => {
        var id;
        let prodRef = database.ref('/products/חלבי/שתייה קרה')
        return new Promise((resolve, reject) => {
            prodRef.on('value', function (snapshot) {

                if (snapshot.val() == null) {
                    reject(null);
                } else {
                    snapshot.forEach(function (data) {
                        if (data.val().name == nameProd) {
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
            let toDelete = database.ref('products/חלבי/שתייה קרה/' + id.key)
            toDelete.update({
                name:this.state.nameprod,
            })

        })
    }

    updatetime= (nameprod) => {
        var id;
        let prodRef = database.ref('/products/חלבי/שתייה קרה')
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
                    //console.log('       ID      ', id.key)
                }
            })
            let toDelete = database.ref('products/חלבי/שתייה קרה/' + id.key)
            toDelete.update({
                time:this.state.timeprod,
            })

        })
    }

    updateprice= (nameprod) => {
        var id;
        let prodRef = database.ref('/products/חלבי/שתייה קרה')
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
                    //console.log('       ID      ', id.key)
                }
                
            
            })
            const p=this.state.priceprod
            let toDelete = database.ref('products/חלבי/שתייה קרה/' + id.key)
            toDelete.update({
                price:p,
            })
           
        })
    }


    componentDidMount = async () => {
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
        console.log('&&&&new enter function');
        database.ref('/products/חלבי/חטיפים').on('value', querySnapshot => {
            console.log('enter once');
            let data = querySnapshot.val()
            //console.log ('data:', data)
            //let totItems = [...data];
            //var arr = []
            querySnapshot.forEach(s => {

                this.state.dataFood.push([s.val().name, s.val().price, s.val().avatar, s.val().time])

            })
            //console.log('arr', arr)

            this.setState({
                dataFood: this.state.dataFood
            })
            console.log('datafood', this.state.dataFood);
        })
        console.log('name     ', this.state.dataFood[1][0][2][3])
        // const ref = storage.ref('images/שתייה קרה/'+this.state.dataFood[1][0]+'/')
        // const url = await ref.getDownloadURL();


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
                userid: userid,
            });
        });
    }
    _renderItemFood(item, index) {
        return (
            <Card>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{
                        marginTop: 20, alignItems: 'center', fontSize: 20, alignContent: 'center',
                        textAlign: 'center', fontWeight: 'bold',
                    }}>
                        {item[0]}
                    </Text>
                    <Text />
                    {this.state.email == "ir@gmail.com" ?
                        <View style={{ alignItems: 'center', textAlign: "center", flex:4 }} >
                            <View style={styles.fix}>
                                <Icon name="trash"></Icon>
                                <TouchableOpacity
                                    style={styles.but}
                                    onPress={() => this.deleteProduct(item[0])}
                                >
                                    <Text> הסר מוצר </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fix}>
                                <Icon name="md-create"></Icon>
                                                            
                                   <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="עריכת שם מוצר" 
                                onChangeText={(text) => this.setState({ nameprod: text })}
                                editable={true}
                                >
                                </TextInput>
                                <TouchableOpacity
                                    onPress={()=>this.updatename(item[0])}>
                                    <Text style={{fontSize:10}}> שמור </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fix}>
                                <Icon name="md-create"></Icon>
                                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="עריכת זמן מוצר" 
                                onChangeText={(text) => this.setState({ timeprod: text })}
                                editable={true}
                                >
                                </TextInput>
                                <TouchableOpacity
                                    onPress={()=>this.updatetime(item[0])}>
                                    <Text style={{fontSize:10}}> שמור </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.fix}>
                                <Icon name="md-create"></Icon>
                                <TextInput style={styles.inputBox} underlineColorAndroid='rgba(0,0,0,0)' placeholderTextColor="#000000" placeholder="עריכת מחיר מוצר" 
                                onChangeText={(text) => this.setState({ priceprod: text })}
                                editable={true}
                                >
                                </TextInput>
                                <TouchableOpacity
                                    onPress={()=>this.updateprice(item[0])}>
                                    <Text style={{fontSize:10}}> שמור </Text>
                                </TouchableOpacity>
                            </View>
                           
                            <TouchableOpacity style={styles.avatarPlaceholder} >
                                <Image source={{ uri: item[2] }} style={styles.avatar} />
                                
                            </TouchableOpacity>
                            
                        </View>
                        :
                        <View style={{ flex: 3, justifyContent: 'flex-end' }}>

                            <TouchableOpacity style={styles.avatarPlaceholder} >
                                <Image source={{ uri: item[2] }} style={styles.avatar} />

                            </TouchableOpacity>
                        </View>
                    }
                </View>
                <Text />




                <Text style={styles.price} >
                    ₪{item[1]}

                </Text>

                <TouchableOpacity style={{ height: 50, backgroundColor: "blue", alignItems: 'center', justifyContent: "center", borderRadius: 5, padding: 5 }}
                    onPress={() => this.onClickAddCart(item, index)}>
                    <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>הוסף לעגלה</Text>
                </TouchableOpacity>


            </Card>
        )
    }

    



    render() {
        return (

            <View style={styles.container}>
                <View>

                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.dataFood}
                        // numColumns={1}
                        renderItem={({ item, index }) => this._renderItemFood(item, index)}
                        keyExtractor={(index) => index.toString()}
                    //keyExtractor={({item})=>this.keyExtract(item)}
                    >
                    </FlatList>
                    <Text />
                    <Text />
                    {this.state.email == "ir@gmail.com"
                        ? <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('AddItemScreen')}>
                                <Text style={{ color: 'black', fontWeight: 'bold', textAlign: "center", fontSize: 30 }}> הוספת מוצר </Text>
                            </TouchableOpacity>
                            <Text />
                        </View>
                        :
                        <View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }




    async onClickAddCart(data) {

        const itemcart = {
            food: data,
            quantity: 1,
            pricetotal: data[1],
            time: data[3]
        };


        try {
            //const cart = JSON.parse (data)
            /*console.log(data)
            const cart = []
            cart.push(itemcart);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            console.log('cart: ', cart)*/
            let datacart = await AsyncStorage.getItem('cart');
            console.log('datacart: ', datacart);
            if (datacart !== null) {
                const cart = JSON.parse(datacart);// cart devient un objet JS
                cart.push(itemcart)//push ne marche que avec array
                await AsyncStorage.setItem('cart', JSON.stringify(cart));//la on envoie un string
                console.log('cart: ', cart)
            }
            else {
                const cart = []
                cart.push(itemcart)
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
                //console.error(datacart);
            }
            alert("המוצר התווסף לעגלה ! ")


        } catch (error) {
            alert(error)
        }

        /*AsyncStorage.getItem('cart').then((datacart) => {
            console.log('datacart: ', datacart)
            if (datacart !== null) {
                // We have data!!
                const cart = JSON.parse(datacart);
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
                console.log('cart: ', cart)
            }
            else {
                const cart = []
                cart.push(itemcart)
                AsyncStorage.setItem('cart', JSON.stringify(cart));
            }
            alert("המוצר התווסף לעגלה ! ")
        }).catch((err) => {
            alert(err)
        })*/
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop:Platform.OS==="android"?24:0,

    },
    stretch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch',
        alignContent: 'center',
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 20,
        alignContent: 'center',
        textAlign: 'center',
    },
    avatar: {
        position: "absolute",
        width: 150,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 30,
    },
    avatarPlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: "#E1E2E6",
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center",
        //marginLeft : 110,


    },
    fix: {
        flexDirection: 'row',
        //justifyContent:'space-between',
        //padding: 40,
        alignItems: 'center',
        textAlign: "center"
    },
})