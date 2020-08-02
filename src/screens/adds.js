import React, { Component } from 'react';
import {View, Text, Button, StyleSheet, AsyncStorage, Image, Platform, TextInput, ScrollView, FlatList, TouchableOpacity} from 'react-native';
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
            summaryOrder:[], 
            price:"",
            loggeedin: false,
            email: "",
            password: "",
            userName:"",
            name:"",
            price:"",
            flag: 0,
            registercheck:0,
            bassar:"",
           
            
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
        database.ref('/products/בשרי/תוספת').on('value', querySnapshot => {
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
        database.ref('/products/בשרי/שתייה').on('value', querySnapshot => {
            let data = querySnapshot.val()
            console.log('data:', data)
            //let totItems = [...data];
            var arr = []
            querySnapshot.forEach(s => {
                arr.push([s.val().name, s.val().price, false])
            })
            console.log('arr', arr)
            this.setState({
                dataDrink: arr
            });
            console.log('dataDrink', this.state.dataDrink);
            console.log('                       PRICE                ', this.state.price)
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

    _renderItemFood(item, index) {
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

    _renderItemDrink(item, index) {
        console.log('enter funct render food')
        console.log('item: ', item[1])

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
                        <Text style={{fontWeight: 'bold',fontSize:25 }}>בחר שתייה</Text>
                    </CardItem>
                    <FlatList
                        data={this.state.dataDrink}
                        renderItem={({item, index})=>this._renderItemDrink(item, index)}
                        keyExtractor={(index)=>index.toString()}>
                    </FlatList>
                    <CardItem header>
                        <Text style={{fontWeight: 'bold',fontSize:25 }}>בחר תוספות</Text>
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
        
        try{
            let prices= await AsyncStorage.getItem('price');
            this.setState({price: prices})
        }
        catch(err){
            console.log(err)
        }
        try{
            let viande= await AsyncStorage.getItem('bassar');
            this.setState({bassar: viande})
        }
        catch(err){
            console.log(err)
        }
        var type=""
        if (this.state.price=="25"){
            type="פיתה "+this.state.bassar
        }else if (this.state.price=="32"){
            type="באגט "+this.state.bassar
        }else if (this.state.price=="35"){
            type="לאפה "+this.state.bassar
        }else{
            type="צלחת "+this.state.bassar
        }
        let arr=this.state.summaryOrder
        arr[0]=type
        const itemcart = {
            food: this.state.summaryOrder,
            pricetotal:this.state.price,
            quantity: 1,
            time:"12"
        };
        
        console.log('       PRICE      ', this.state.price)

        try {
            let datacart = await AsyncStorage.getItem('cartB');
            console.log('datacart: ', datacart);
            if (datacart !== null) {
                const cartB = JSON.parse(datacart);// cart devient un objet JS
                cartB.push(itemcart)//push ne marche que avec array
                await AsyncStorage.setItem('cartB', JSON.stringify(cartB));//la on envoie un string
                console.log('cartB: ', cartB)
            }
            else {
                const cartB = []
                cartB.push(itemcart)
                await AsyncStorage.setItem('cartB', JSON.stringify(cartB));
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