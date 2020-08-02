import React, { Component } from 'react';
import {View, Text, Button, AsyncStorage, StyleSheet, Image, Platform, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {Header,  Item, Icon, Container, Card, CardItem } from 'native-base';
import { CheckBox } from 'react-native-elements';
import {auth, database, f, fs} from '../../config/config.js' ;

console.disableYellowBox = true;
export default class saladsDB extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dataFood:[],
            dataDrink:[],
            summaryOrder: [],
            loggeedin: false,
            email: "",
            password: "",
            userName:"",
            name:"",
            flag: 0,
            registercheck:0,
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

        console.log('new enter function');
        database.ref('/products/חלבי/תוספת').on('value', querySnapshot => {
            let data = querySnapshot.val()
            console.log('data:', data)
            //let totItems = [...data];
            var arr = []
            querySnapshot.forEach(s => {
                arr.push([s.val().name, s.val().price, false])
            })
            console.log('arr', arr)
            this.setState({
                dataFood: arr
            });
            console.log('datafood', this.state.dataFood);
        });

        console.log('drink component');
        database.ref('/products/חלבי/שתייה קרה').on('value', querySnapshot => {
            let data = querySnapshot.val()
            console.log('data:', data)
            //let totItems = [...data];
            var arr = []
            querySnapshot.forEach(s => {
                arr.push([s.val().name, s.val().price,false])
            })
            console.log('arr', arr)
            this.setState({
                dataDrink: arr
            });
            console.log('dataDrink', this.state.dataDrink);
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
    
      checkThisBox = (item, index) => {
        let checked = this.state.dataFood
        checked[index][2] = !checked[index][2];
        this.setState({ dataFood: checked });
        console.log('datafood check', this.state.dataFood)
        
        if (checked[index][2]==true){
            this.state.summaryOrder.push([item])
        }

    }

    checkThisBoxDrink = (item, index) => {
        let checked = this.state.dataDrink
        for (var c in checked){
            //console.log('***', checked[c][2])
            if (checked[c][2]==true){
                checked[c][2] = !checked[c][2];
            }
        }
        checked[index][2] = !checked[index][2];
        this.setState({ dataDrink: checked });

        var arr=[]
        if (checked[index][2]==true){
            arr[0]=item
        }
        this.setState({summaryOrder:arr})

    }

    _renderItemFood = (item, index) => {
        return (
          <ScrollView>
              <CheckBox
                  title={item[0]}
                  onPress={() => this.checkThisBox(item, index)}
                  checked={this.state.dataFood[index][2]}
                  size={30}

              />
          </ScrollView>
      )


  }

  _renderItemDrink = (item, index) => {
    return (
        <ScrollView>
            <CheckBox
                title={item[0]}
                onPress={() => this.checkThisBoxDrink(item, index)}
                checked={this.state.dataDrink[index][2]}
                size={30}

            />
        </ScrollView>
    )
}

    render(){
        return (
            <View style={styles.container}>
                <ScrollView>
                <CardItem header>
                        <Text style={{fontWeight: 'bold',fontSize:20,textAlign:"center" }}>טוסט עם תוספות ושתייה לבחירה- 17 ₪ </Text>
                    </CardItem>
                    <CardItem header>
                        <Text style={{fontWeight: 'bold',fontSize:25 }}>בחר שתייה</Text>
                    </CardItem>
                    <FlatList
                        data={this.state.dataDrink}
                        renderItem={({item, index})=>this._renderItemDrink(item, index)}
                        keyExtractor={(index)=>index.toString()}>
                    </FlatList>
                    <CardItem header>
                        <Text style={{fontWeight: 'bold',fontSize:25 }}> בחר תוספות </Text>
                    </CardItem>
                    <FlatList
                        data={this.state.dataFood}
                        renderItem={({item, index})=>this._renderItemFood(item, index)}
                        keyExtractor={(index)=>index.toString()}>
                    </FlatList>
                    
                    <TouchableOpacity style={{ height: 50, backgroundColor: "blue", alignItems: 'center', justifyContent: "center", borderRadius: 5, padding: 5 }}
                                onPress={()=>this.onClickAddCart()}>
                        <Text style={{ fontSize: 18, color: "white", fontWeight: "bold" }}>הוסף לעגלה</Text>
                    </TouchableOpacity>
                    <Text/>
                    <Text/>
                    {this.state.email == "ir@gmail.com"
                        ? <View>
                            <TouchableOpacity 
                                onPress={() => this.props.navigation.navigate('AddItemScreen')}>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize:30, textAlign:"center"}}> הוספת מוצר </Text>
                            </TouchableOpacity>
                            <Text/>
                        </View>
                        :
                        <View>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }

    async onClickAddCart() {

        let arr_p=this.state.summaryOrder
        arr_p[0]='טוסט'
        console.log('***   ARR     ******', arr_p)
        var price=17
        console.log('*****   PRICE    *****', price)
        for (var i=1; i<arr_p.length; i++){
            for(var count in arr_p[i]){
                price=price + parseInt(arr_p[i][count][1])
                console.log('ici ', price)
            }
        }
        console.log('*****   PRICE TOTAL   *****', price)
        const itemcart={
            food: this.state.summaryOrder,
            pricetotal:price, 
            quantity: 1  ,
            time: "10"
        }  
        console.log('***  ITEM   ****', itemcart) 
        
        try {
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
        }catch (error){
            alert(error)
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
    
        backgroundColor: '#ffffff',
        flex: 1,
        //marginTop:Platform.OS==="android"?24:0,
        
      },
      stretch: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch',
        alignContent:'center',
      },
      price: {
        fontWeight: 'bold',
        marginBottom: 10, 
        fontSize:20,
        alignContent:'center',
        textAlign: 'center',
    },
})