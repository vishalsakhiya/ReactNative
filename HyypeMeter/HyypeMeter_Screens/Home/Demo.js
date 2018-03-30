import React, { Component } from 'react';
import ActionSheet from 'react-native-actionsheet';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Platform,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
var logo = require('HyypeMeter/Resources/Home/bar.jpg');
import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';
import ModalPicker from 'react-native-modal-picker';

var RNInstagramOAuth = require('react-native-instagram-oauth');
 var instagram: {
     client_id: '1659ab338adc4668bd4aac0b62aeda19',
     redirect_url: 'https://www.instagram.com/', 
 };



export default class Demo extends Component 
{
  
  getInstagramByMyself(access_token)
  {
    fetch('https://api.instagram.com/v1/users/self/?access_token='+access_token)
        .then((response) => response.json()).then((responseData) => {
            console.log('responce =', responseData);
        });
  }

  getdata()
  {   
      fetch('https://api.instagram.com/v1/tags/testing/media/recent?access_token=5930044114.1659ab3.0ef646b9c1054d468862c56791104ca2&scope=public_content')
         .then((response) => response.json()).then((responseData) => {
            console.log('responce =', responseData);
            

      });      

  }

   constructor(props)
   {
      super(props);
      this.state = {
          username: '',
          pwd: '',            
          img: 'https://facebook.github.io/react/img/logo_og.png',
      }           
   }

  render()
  { 
         // RNInstagramOAuth('1659ab338adc4668bd4aac0b62aeda19', 'https://www.instagram.com/', (err, access_token) => {
         //    console.log('access_token',access_token);

         //    if (err) { console.log(err) }
         //    if (access_token !== undefined) {
         //        console.log('access_token',access_token);
         //        getInstagramByMyself(access_token);
         //    }
         // });

      this.getdata();

       return (
       <View style={{flex:1, justifyContent:'space-around', padding:50}}>      
        <Text> sfdfs </Text>       
       </View>
  );
  }
}
