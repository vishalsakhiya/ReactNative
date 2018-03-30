import React, { Component } from 'react';
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
  TouchableOpacity
} from 'react-native';

import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavigationActions } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob';
import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';
const iconimg = require('HyypeMeter/Resources/SignUp/sidemenu.png');
const rightCheck = require('HyypeMeter/Resources/SignUp/GreenRightCheck_1.png');

var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var Uncheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var defaultimg = require('HyypeMeter/Resources/SignUp/DefaultUploadImg.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var emaillen = 0;
var addresslen = 0;
var pwdlen = 0;
var fnamelen = 0;
var lnamelen = 0;
var imglen = 0;

const uploadImage = (uri, mime = 'Image/jpeg') => {

      const storage = firebase.storage()
      const Blob = RNFetchBlob.polyfill.Blob
      const fs = RNFetchBlob.fs
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
      window.Blob = Blob

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('UserImages').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}


export default class SignUPStarter extends Component {
 
   constructor(props)
   {
      super(props);
      this.state = {
        avatarSource: null,
        videoSource: null,     
        terms: Uncheck,  
        emaildata : '', 
        passworddata: '',
        addredss: '',
        firstnamedata: '',
        lastnamedata: '',                
        imgProfiledata: '',     
        uploadURL: '',              
      }           
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
      )
    });

    
    selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };


    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);    
        this.setState({ uploadURL: '' })

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        this.setState({
          avatarSource: source
        });
      } 

      uploadImage(response.uri)
        .then(url => { alert('uploaded'); this.setState({uploadURL: url}) })
        .catch(error => console.log(error))
      });

  }


   render() {
    const { navigate } = this.props.navigation;    
    
    var musicPreferences = this.props.navigation.state.params.music; 
    var moodPreferences = this.props.navigation.state.params.mood; 
    var crowdPreferences = this.props.navigation.state.params.crowd; 
    
    var dateFormat = require('dateformat');
    var today = new Date();    
    var createdDate = dateFormat(today, "dd-mm-yyyy hh:MM:ss");
            
    return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>

      <View style={styles.container}> 
        <ScrollView style={styles.scrollview}>       
         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
          <View style={{width: Dimensions.get('window').width - 15, height: 100, marginLeft: 8,marginTop: 13}}> 
           <Image source={ this.state.avatarSource === null ? defaultimg : this.state.avatarSource } style={{flex:1,width: null,height:null,alignItems: "center"}} />             
          </View> 
          </TouchableOpacity>  
          <View style={{ marginTop: 10 }}>
               <TextInput
            style={styles.inputStyle}
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            placeholder="Email" placeholderTextColor= '#999999'
            onChangeText={(email) => { 
                this.setState({ emaildata: email }) 
                emaillen = email.length }} 
            onSubmitEditing={(event) => { 
                this.refs.txtpwd.focus(); 
            }} />
            <TextInput
            ref= 'txtpwd'
            style={styles.inputStyle}
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            secureTextEntry = {true}
            placeholder="Password" placeholderTextColor= '#999999'
            onChangeText={(password) => { 
                this.setState({ passworddata: password }) 
                passwordlen = password.length }} 
            onSubmitEditing={(event) => { 
                this.refs.txtaddress.focus(); 
            }} />
            <TextInput
            ref= 'txtaddress'
            style={styles.inputStyle}
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            placeholder="Address" placeholderTextColor= '#999999'
            onChangeText={(addredss) => { 
              this.setState({ addredss : addredss }) 
                addresslen = addredss.length }}
            onSubmitEditing={(event) => { 
                this.refs.txtfname.focus(); 
             }}  />
            <TextInput
            ref= 'txtfname'
            style={styles.inputStyle}
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            placeholder="First Name" placeholderTextColor= '#999999'
            onChangeText={(firstname) => {
                  this.setState({ firstnamedata : firstname }) 
                  fnamelen = firstname.length }} 
            onSubmitEditing={(event) => { 
                  this.refs.txtlname.focus(); 
            }} />
            <TextInput
            ref= 'txtlname'
            style={styles.inputStyle}
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'done' }
            placeholder="Last Name" placeholderTextColor= '#999999'
            onChangeText={(lastname) => { 
                this.setState({ lastnamedata : lastname }) 
                lnamelen = lastname.length}} 
            onSubmitEditing={(event) => { 
                  
            }} />
          
            <TouchableOpacity onPress = {() => { this.setState({ terms: rightCheck })}}>
            <View style={{ flexDirection: 'row',flexWrap: 'wrap',}}> 
              <Text style= {{fontSize: 14, color: '#A4A4A4',paddingLeft: 10}}>
                 <Image source={ this.state.terms } style={{width: 25, height: 25,
                    marginTop: 8,marginLeft: 10}} /> I have read 
              </Text>
              <Text style= {{fontSize: 14, marginTop: 12}} > Terms & Conditions </Text> 
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => fnamelen == 0 || lnamelen == 0 || emaillen == 0 || passwordlen == 0 || addresslen == 0 ? Alert.alert('Please enter all the feilds in order to Sign Up.') : Database.saveStarter(createdDate,this.state.emaildata,this.state.passworddata,this.state.addredss,this.state.firstnamedata,this.state.lastnamedata,musicPreferences,moodPreferences,crowdPreferences,this.state.uploadURL, (flag) => { navigate('AddBar',{ type: 'SignUp'}) } ) }>
              <Text style={styles.logintext}> Sign Up </Text>
           </TouchableOpacity> 
         </View>
        </ScrollView>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {    
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height - 20
  },
  imageContainer: {
    flex: 1,
    margin: 50,    
    flexDirection: "row",
    alignItems: "stretch"    
  },
  scrollview: {    
    backgroundColor: '#FFFFFF',   
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
    backgroundColor: '#fafafa'
  },
  button: {       
    borderColor: '#0091FF',
    borderWidth: 2.5,
    borderRadius: 40,    
    height:45,
    backgroundColor: '#0091FF', 
    marginTop: 20, 
    marginLeft: 10,
    marginRight: 10, 
    padding: 10,
  }, 
  logintext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "center"    
  },
});
