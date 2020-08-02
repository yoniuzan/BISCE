import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import {Platform, TouchableOpacity, View, Text, AsyncStorage} from 'react-native';
import Home from "./src/screens/Home.js";
import login from "./src/screens/login.js";
import React from 'react';
import Register from './src/screens/Register.js';
import HomeLogin from './src/screens/HomeLogin.js';
import milk from './src/screens/milk.js';
import meat from './src/screens/meat.js';
import forgetPassword from './src/screens/forgetPassword.js';
import drinks from './src/screens/drinks.js';
import toasts from './src/screens/toasts.js';
import salads from './src/screens/saladsDB.js';
import Snacks from './src/screens/Snacks.js';
import corason from './src/screens/corason.js';
import shawarma from './src/screens/shawarma.js';
import kabab from './src/screens/kabab.js';
import shnicel from './src/screens/shnicel.js';
import pargit from './src/screens/pargit.js';
import addItem from './src/screens/addItem.js';
import profile from './src/screens/profile.js';
import antri from './src/screens/antri.js';
import lev from './src/screens/lev.js';
import adds from './src/screens/adds.js';
import typePay from './src/screens/typePay.js';
import card from './src/screens/card.js';
import shop from './src/screens/shop';
import shokolad from './src/screens/shokolad.js';
import hatif from './src/screens/hatif.js';
//import coldrink from './src/screens/coldrinkRed.js/index.js';
import DrawerContainer from './src/screens/DrawerContainer.js'
import { createDrawerNavigator } from 'react-navigation-drawer';
import setting from './src/screens/shop';
import CCard from './src/screens/ccard.js';
import editProfile from './src/screens/editProfile.js';
import coldrinkRed from './src/screens/coldrinkRed.js'; 
import addd from './src/screens/addd.js';
import cart from './src/screens/cart.js';
import orders from './src/screens/orders.js'
import cartB from './src/screens/cartB.js';
import orderDetails from './src/screens/orderDetails.js'
const RootStack = createStackNavigator({

  HomeScreen: {
    screen:Home,
    navigationOptions:{
      headerTitle:"מנזה מהירה",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 115,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    }
  },
  LoginScreen:{
    screen: login,
    navigationOptions:{
      headerTitle:"מנזה מהירה",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 115,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    }
  },
  RegisterScreen:{
    screen: Register,
    navigationOptions:{
      headerTitle:"מנזה מהירה",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    }
  },
  HomeLoginScreen: {
    screen: HomeLogin,
    navigationOptions: ({navigation})=>({
      headerTitle: "מנזה מהירה",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 60,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ColdrinkRedScreen:{
    screen:coldrinkRed,
    navigationOptions:({navigation})=>({
      headerTitle:"שתייה קרה",
      headerRight: (
        <TouchableOpacity onPress={() =>navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 30,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?27:null,
      },
    })
  },
  MilkScreen:{
    screen: milk,
    navigationOptions:({navigation})=>({
      headerTitle:"תפריט חלבי",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 60,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  MeatScreen:{
    screen: meat,
    navigationOptions: ({navigation})=>({
      headerTitle:"תפריט בשרי",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 60,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ForgetPasswordScreen:{
    screen: forgetPassword,
    navigationOptions: ({navigation})=>({
      headerTitle:"מנזה מהירה",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70.5,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  DrinkScreen:{
    screen: drinks,
    navigationOptions: ({navigation})=>({
      headerTitle:"משקאות",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ToastsScreen:{
    screen: toasts,
    navigationOptions:({navigation})=>({
      headerTitle:"טוסטים",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
     headerTitleStyle:{
      alignSelf:'center',
      textAlign:'center',
      flex:2,
      padding: 70,
      textAlignVertical:'center',
      justifyContent:'center',
      marginBottom:Platform.OS==='ios'?30:null,
    },
    })
  },
  SaladScreen :{
    screen: salads,
    navigationOptions: ({navigation})=>({
      headerTitle:"סלטים",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  SnacksScreen:{
    screen: Snacks,
    navigationOptions: ({navigation})=>({
      headerTitle:"מזון מהיר",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  CorasonScreen:{
    screen: corason,
    navigationOptions: ({navigation})=>({
      headerTitle:"מאפים",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ShawarmaScreen:{
    screen: shawarma,
    navigationOptions: ({navigation})=>({
      headerTitle:"שווארמה",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  KababScreen:{
    screen: kabab,
    navigationOptions: ({navigation})=>({
      headerTitle:"קבב",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ShnicelScreen:{
    screen: shnicel,
    navigationOptions: ({navigation})=>({
      headerTitle:"שניצל",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  PargitScreen:{
    screen: pargit,
    navigationOptions: ({navigation})=>({
      headerTitle:"פרגית",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  AddItemScreen:{
    screen: addItem,
    navigationOptions: ({navigation})=>({
      headerTitle:"הוספת מוצר",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  AntriScreen:{
    screen: antri,
    navigationOptions: ({navigation})=>({
      headerTitle:"אנטריקוט",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  LevScreen:{
    screen: lev,
    navigationOptions: ({navigation})=>({
      headerTitle:"לבבות",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  AddsScreen:{
    screen: adds,
    navigationOptions: ({navigation})=>({
      headerTitle:"תוספות",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  TypePayScreen:{
    screen: typePay,
    navigationOptions: ({navigation})=>({
      headerTitle:"שיטת תשלום",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 50,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  EditProfileScreen:{
    screen: editProfile,
    navigationOptions: ({navigation})=>({
      headerTitle:"עריכת פרופיל",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ProfileScreen:{
    screen: profile,
    navigationOptions: ({navigation})=>({
      headerTitle:"פרופיל",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  AdddScreen:{
    screen: addd,
    navigationOptions: ({navigation})=>({
      headerTitle:"תוספות",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ShopScreen:{
    screen: shop,
    navigationOptions: ({navigation})=>({
      headerTitle:"עגלת הקניות",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  CartScreen:{
    screen: cart,
    navigationOptions: ({navigation})=>({
      headerTitle:"עגלת הקניות חלבי",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 30,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  CartBScreen:{
    screen: cartB,
    navigationOptions: ({navigation})=>({
      headerTitle:" עגלת הקניות בשרי",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 30,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  ShokoladScreen:{
    screen: shokolad,
    navigationOptions: ({navigation})=>({
      headerTitle:"שוקולדים",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  HatifScreen:{
    screen: hatif,
    navigationOptions: ({navigation})=>({
      headerTitle:"חטיפים",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  SettingScreen:{
    screen: setting,
    navigationOptions: ({navigation})=>({
      headerTitle:"הגדרות",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    })
  },
  CardPayScreen:{
    screen: card,
    navigationOptions: ({navigation})=>({
      headerTitle:"תשלום באשראי",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 50,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    }) 

  },
  OrdersScreen:{
    screen: orders,
    navigationOptions: ({navigation})=>({
      headerTitle:"רשימת הזמנות",
      headerRight: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    } )

  },
  OrderDetailsScreen:{
    screen: orderDetails,
    navigationOptions:{
      headerTitle:" פרטי הזמנה ",
      headerTitleStyle:{
        alignSelf:'center',
        textAlign:'center',
        flex:2,
        padding: 70,
        textAlignVertical:'center',
        justifyContent:'center',
        marginBottom:Platform.OS==='ios'?30:null,
      },
    } 
  },

},

  {
    initialRouteName: 'HomeScreen',
  },
);

const DrawerStack = createDrawerNavigator(
  {
    Main:RootStack
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
)



export default createAppContainer(DrawerStack);