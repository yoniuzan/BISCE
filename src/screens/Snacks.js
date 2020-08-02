import React, { Component } from 'react';
import TouchableScale from 'react-native-touchable-scale';
import { View, Text, Button, StyleSheet, Image, Platform, TextInput, I18nManager, ScrollView } from 'react-native';
import { Header, Item, Icon, Container } from 'native-base';
import { ListItem, SearchBar } from 'react-native-elements';
console.disableYellowBox = true;
const list = [
    {
        name: 'חטיפים',
        avatar_url: 'https://ashdodhayom.co.il/wp-content/uploads/2017/03/%D7%97%D7%98%D7%99%D7%A4%D7%99%D7%9D-%D7%A7%D7%98%D7%A0%D7%94-%D7%9C%D7%A4%D7%A1%D7%97-538x330.png',
        // subtitle: 'Vice President'
        it: "HatifScreen"
    },
    {
        name: 'שוקולדים',
        avatar_url: 'https://lh3.googleusercontent.com/proxy/TJ4oA0_vjFkoo9ghBSQqzzXAzBEmrPDnUvVLBFEckgmYF40ZAELmPQlpLYm87iLI-VFItjjGzRbcw1AVDCWc',
        // subtitle: 'Vice President'
        it: "ShokoladScreen"
    },
    {
        name: 'שתייה קרה',
        avatar_url: 'https://www.nougatine.co.il/files/catalog/source/light_drinks.jpg',
        // subtitle: 'Vice President'
        it: "ColdrinkRedScreen"
    },

]
export default class Snacks extends React.Component {
    constructor(props) {
        super(props);
        I18nManager.forceRTL(true);
    }
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };
    render() {
        const { search } = this.state;
        return (
            <ScrollView>
                <View style={styles.Container}>

                    {
                        list.map((l, i) => (
                            <ListItem
                                Component={TouchableScale}
                                key={i}
                                leftAvatar={{ source: { uri: l.avatar_url } }}
                                title={l.name}
                                //subtitle={l.subtitle}
                                bottomDivider
                                chevron
                                onPress={() => this.props.navigation.navigate(l.it)}
                            />
                        ))
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
        //marginTop:Platform.OS==="android"?24:0,
        marginVertical: 20,

    },
    item: {
        backgroundColor: '#4D243D',
        alignItems: 'center',
        flex: 1,
        margin: 1,
        justifyContent: 'center',
        //height:Dimensions.get('window').width/numColumns,
    },
    itemText: {
        color: '#fff'
    }
});

/*const data=[
    {key:'a'}, {key:'b'}
];
const numColumns=3;
const FormData=(data,numColumns)=>{
    const numberOfFullRows= Math.floor(data.length/numColumns);
    let numberOfFullRows= data.length-(numberOfFullRows*numColumns);
    while(numberOfFullRows!==numColumns){
        data.push
    }
    return data;
};
export default class Snacks extends React.Component
{
    renderItem=({item,index})=>{
        return(
            <View
            style={styles.item}>
                <Text style={styles.itemText}>{item.key}</Text>
            </View>
        );
    };
    render() {
        return (
            <ScrollView>
                <FlatList
                    data={FormData( data, numColumns)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />

            </ScrollView>
        )}}

        const styles = StyleSheet.create({
            container: {

                backgroundColor: '#ffffff',
                flex: 1,
                marginTop:Platform.OS==="android"?24:0,
                marginVertical:20,

              },
              item:{
                backgroundColor:'#4D243D',
                alignItems: 'center',
                flex:1,
                margin:1,
                justifyContent:'center',
                height:Dimensions.get('window').width/numColumns,
              },
              itemText:{
                  color:'#fff'
              }
            });*/