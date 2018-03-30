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
  Alert
} from 'react-native';

var rightUnCheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var circle = require('HyypeMeter/Resources/Preferences/Uncheck.png');
var check = require('HyypeMeter/Resources/Preferences/check.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var live = require('HyypeMeter/Resources/Home/Live.png');
var arrControls = [];
var arrBottomControls = [];
var arrShowAll = [];
var arrSeperator = [];
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');

import { NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import CheckBox from 'react-native-check-box';
import keys from 'HyypeMeter/keys.json';
import Toast from 'react-native-easy-toast';

export default class ShowAllBars extends Component {
 
  constructor(props) {
    super(props);
    const arrAllBars = [];

    this.state = {
      visible: false,
      arrAllBars    
    };
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
         <TouchableOpacity>
           <Image source= {live} style={{marginRight: 5,width: 50,height: 30 }} />
         </TouchableOpacity>
      )
   });

  componentDidMount() {
      const { navigate } = this.props.navigation;
         this.state.arrAllBars.splice(0, this.state.arrAllBars.length);
         
         setTimeout(() => {
         this.state.arrAllBars.forEach((value,index,arr) =>
         {
            arrControls.push(
              <View key = { index }> 
                <TouchableOpacity style={styles.Topbutton} onPress={() => navigate('BarDetails', { userId: value[index].userId, barId: value[index].barId }) }>            
                      <Text style={styles.Topbuttontext}> { value[index].barName } </Text> 
                </TouchableOpacity>  
              </View>
            )
            this.forceUpdate()
        })    
       }, 3000)
    }

    render() {

        var config = {
          apiKey: "AIzaSyDZFIm6IzuWvXMnRj1mUnsTI45YB-_Fo14",
          authDomain: "hyypemeter-4d87c.firebaseapp.com",
          databaseURL: "https://hyypemeter-4d87c.firebaseio.com",
          projectId: "hyypemeter-4d87c",
          storageBucket: "hyypemeter-4d87c.appspot.com",
          messagingSenderId: "834282316060"
        };
        !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
        Database.getAllBars((flag) => { this.state.arrAllBars.push(flag) } )

        return (
            <View style={styles.container}>
              <TextInput
                    style={styles.inputStyle}
                    underlineColorAndroid="transparent"
                    placeholder="Search" placeholderTextColor= '#999999' />   
                <ScrollView>
                      { arrControls }                                                                
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
})