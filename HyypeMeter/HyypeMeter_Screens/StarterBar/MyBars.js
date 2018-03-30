import React, { Component } from 'react';
import {createStore} from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  ScrollView,
  WebView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  ActivityIndicator
} from 'react-native';

import { NavigationActions } from 'react-navigation';
import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';
var rightUnCheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var circle = require('HyypeMeter/Resources/Preferences/Uncheck.png');
var check = require('HyypeMeter/Resources/Preferences/check.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var live = require('HyypeMeter/Resources/Home/plus.png');
var arrControls = [];
var arrControls1 = [];
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var togglemenu = null;
var vals = null; 

import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";

export default class MyBars extends Component {
 
  constructor(props) {
    super(props);
    const arrMyBars = [];
    const arrMyBars1 = [];
    this.goAddBarAction = this.goAddBarAction.bind(this);
    this.calc = this.calc.bind(this);
    this.state = {
      visible: false,
      userId: '',
      arrMyBars,
      arrMyBars1,
      isNew: true,
      animating: true,
      num: 2    
    };
  }
  
  goAddBarAction() 
  {    
      const { navigation } = this.props;
      navigation.navigate('AddBar', {refresh: this.refreshFunction });
  }
  refreshFunction()
  { 
      vals();
  }
  
  calc()
  { 
     const { navigate } = this.props.navigation;
     this.setState({ isNew: false });      
     this.state.arrMyBars1.splice(0, this.state.arrMyBars.length);

      setTimeout(() => {
           this.state.arrMyBars1.forEach((value,index,arr) =>
           {
              arrControls1.push(
                <View key = { index }> 
                  <TouchableOpacity style={styles.Topbutton} onPress={() => navigate('MyEvents', { userId: value.userId, barId: value.barId }) }>            
                        <Text style={styles.Topbuttontext}> { value.barName } </Text> 
                  </TouchableOpacity>  
                </View>
              )
              this.forceUpdate()
          })    
       }, 1500)
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Hyype File",
      headerStyle: { backgroundColor: '#0091ff' },  
      headerTitleStyle: { color: '#FFFFFF', width : 180},
      headerLeft: (
        <View>
           <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back({
                key: null
            }) ) } >
            <Image source= {back_button} style={{marginLeft: 10,width: 20,height: 20 }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (             
         <TouchableOpacity onPress={() => togglemenu() }>
           <Image source= {live} style={{marginRight: 15,width: 20,height: 20 }} />
         </TouchableOpacity>
      )
   });

  getUserdata()
  {
      AsyncStorage.getItem('userId', (err, result) =>
      { 
         this.setState( { userId : result.toString() } );         
      });
  }
 closeActivityIndicator = () => setTimeout(() => this.setState({ 
    animating: false }), 1500) 

  componentDidMount() {
    this.getUserdata();

      togglemenu = this.goAddBarAction;
      vals = this.calc;
      this.closeActivityIndicator();
      const { navigate } = this.props.navigation;

       
       this.state.arrMyBars.splice(0, this.state.arrMyBars.length);
       arrControls.splice(0,arrControls.length);
      setTimeout(() => {
           this.state.arrMyBars.forEach((value,index,arr) =>
           {
              arrControls.push(
                <View key = { index }> 
                  <TouchableOpacity style={styles.Topbutton} onPress={() => navigate('MyEvents', { userId: value.userId, barId: value.barId }) }>            
                        <Text style={styles.Topbuttontext}> { value.barName } </Text> 
                  </TouchableOpacity>  
                </View>
              )
              this.forceUpdate()
          })    
       }, 1500)
    }

    render() {
       const animating = this.state.animating;

      if (this.state.isNew)
      {
        Database.getBarOfUser(this.state.userId,(flag) => {  this.state.arrMyBars = flag } )
      }
      else
      {
         Database.getBarOfUser(this.state.userId,(flag) => { this.state.arrMyBars1 = flag } )
      }
        return (
            <View style={styles.container}>
              <TextInput
                    style={styles.inputStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Search" placeholderTextColor= '#999999' />   
                <ScrollView style={styles.ScrollView}>
                      { this.state.isNew ? arrControls : arrControls1 }                                                                
                
                 <ActivityIndicator
                                 animating = {animating}
                                 color = '#0091ff'
                                 size = "large"
                                 style = {styles.activityIndicator}/>   
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',        
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: '#ececec',
        marginTop: 12, 
        width: Dimensions.get('window').width,
        marginBottom: 3
    },
    ScrollView: {
        marginBottom: 10
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80, 
      marginTop: 150
    },
    inputStyle: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    borderWidth: 0.5, 
    padding: 15,
    borderColor: '#D7D7D7',
    borderRadius: 8, 
    marginLeft: 10,
    fontSize: 14,
    marginBottom: 10,
    marginTop:10,
    backgroundColor: '#fafafa'
   },
   Topbutton: {       
    borderColor: '#FFA802',
    borderWidth: 2.5,
    borderRadius: 40,    
    height: 37,
    backgroundColor: '#FFA802', 
    marginTop: 7, 
    marginLeft: 10,
    marginRight: 10,    
    padding: 7,
  }, 
  Topbuttontext: {
    fontSize: 14,    
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "left",
    fontWeight: '100'         
  },
  Bottombutton: {       
    borderColor: '#ececec',
    borderWidth: 1.0,
    borderRadius: 40,    
    height: 37,
    backgroundColor: '#FFFFFF', 
    marginTop: 7, 
    marginLeft: 10,
    marginRight: 10,    
    padding: 9,
  }, 
  Bottombuttontext: {
    fontSize: 14,    
    color: '#000000',
    textAlignVertical: "center",
    textAlign: "left",
    fontWeight: '100'        
  },
  ShowAllbtn: {
    color: '#ababab', 
    fontSize: 12, 
    textAlign: 'center',
    marginTop:15
  }
})