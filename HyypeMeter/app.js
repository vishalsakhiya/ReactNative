import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Button,    
  View
} from 'react-native';

import SplashPage from 'HyypeMeter/HyypeMeter_Screens/Splash/SplashPage';
import HomePage from 'HyypeMeter/HyypeMeter_Screens/GetStarted/HomePage';
import SignUpPage from 'HyypeMeter/HyypeMeter_Screens/SignUP/SignUpPage';
import SignUPER from 'HyypeMeter/HyypeMeter_Screens/SignUP/SignUPER';
import SignUPStarter from 'HyypeMeter/HyypeMeter_Screens/SignUP/SignUPStarter';
import SignIn from 'HyypeMeter/HyypeMeter_Screens/LogIn/SignIn';
import ForgotPassword from 'HyypeMeter/HyypeMeter_Screens/GetStarted/ForgotPassword';
import PreferencePage from 'HyypeMeter/HyypeMeter_Screens/Preference/PreferencePage';
import HomeScreenPage from 'HyypeMeter/HyypeMeter_Screens/Home/HomeScreen';
import BarEvents from 'HyypeMeter/HyypeMeter_Screens/Home/BarEvents';
import ShowAllBar from 'HyypeMeter/HyypeMeter_Screens/Home/ShowAllBars';
import CheckIn from 'HyypeMeter/HyypeMeter_Screens/Home/CheckIn';
import AddBar from 'HyypeMeter/HyypeMeter_Screens/SignUP/AddBar';
import MyBars from 'HyypeMeter/HyypeMeter_Screens/StarterBar/MyBars';
import MyEvents from 'HyypeMeter/HyypeMeter_Screens/StarterBar/MyEvents';
import AddEvent from 'HyypeMeter/HyypeMeter_Screens/StarterBar/AddEvent';
import Demo from 'HyypeMeter/HyypeMeter_Screens/Home/Demo';
import Parent from 'HyypeMeter/HyypeMeter_Screens/LogIn/Parent';
import Child from 'HyypeMeter/HyypeMeter_Screens/LogIn/Child';
import Payment from 'HyypeMeter/HyypeMeter_Screens/Payment/Payment';
import {
  StackNavigator,
} from 'react-navigation';

export default class HyperMeter extends Component {

   constructor(props){
    super(props);       
  }

  static navigateOptions = {
    title: 'Welcome',    
  };

  render() {
    return (
      <View style={styles.container}>         
      </View>
    );
  } 
}

const HyypeMeterNav = StackNavigator({       
  HomePage: { screen: HomePage, navigationOptions: { header: null }},  
  SignUpPage: { screen: SignUpPage, navigationOptions: { header: null } },  
  ForgotPassword: { screen: ForgotPassword, navigationOptions: { header: null }},
  PreferencePage: { screen: PreferencePage },   
  SignUPER: { screen: SignUPER },
  SignUPStarter: { screen: SignUPStarter },  
  SignIn: { screen: SignIn , navigationOptions: { header: null } },  
  HomeScreenPage: { screen: HomeScreenPage},
  BarEvents: { screen: BarEvents},
  CheckIn: { screen: CheckIn},  
  ShowAllBar: { screen: ShowAllBar},
  MyBars: { screen: MyBars},
  Demo: { screen: Demo},
  AddBar: { screen: AddBar},
  Parent: { screen: Parent},
  Child: { screen: Child},
  MyEvents: { screen: MyEvents },
  AddEvent : { screen : AddEvent },
  Payment: { screen: Payment }
},{}
);

const styles = StyleSheet.create({
  container: {    
    flex: 1,    
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },  
});

AppRegistry.registerComponent('HyypeMeter', () => HyypeMeterNav);