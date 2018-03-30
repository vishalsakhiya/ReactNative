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
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob';
import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';

import { NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';
const iconimg = require('HyypeMeter/Resources/SignUp/sidemenu.png');
const rightCheck = require('HyypeMeter/Resources/SignUp/GreenRightCheck_1.png');
var Uncheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var defaultimg = require('HyypeMeter/Resources/SignUp/DefaultUploadImg.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');

var barNamelen = 0;
var barAddresslen = 0;
var barOpenTimelen = 0;
var barCloseTimelen = 0;
var barimgUrllen = 0;
var barCapacitylen = 0;

let togglemenu = null;
let userData = null;

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


export default class AddBar extends Component {
 
   constructor(props)
   {
      super(props);
      const arrmybar = [];

      this.state = {
        avatarSource: null,
        videoSource: null,     
        terms: Uncheck,   
        flag : false , 
        userId : '',
        arrmybar,  
        barName : '',
        barAddress:  '',
        barOpenTime: '',
        barCloseTime: '',
        barimgUrl: '',
        barCapacity: '',     

      }           
   }

   componentDidMount() {
      this.getUserdata(); 
   }

   goBackMyBarsAction()
   {
      this.props.navigation.state.params.refresh();    
      this.props.navigation.dispatch(NavigationActions.back({
                key: null
         }) 
      ) 
   }

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Add Bar",
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

  getUserdata()
  {
      AsyncStorage.getItem('userId', (err, result) =>
      { 
         this.setState( { userId : result.toString() } );                 
      });
  }

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
       
    var dateFormat = require('dateformat');
    var today = new Date();    
    var createdDate = dateFormat(today, "dd-mm-yyyy hh:MM:ss");
    var isSignUp = this.props.navigation.state.params.type; 

    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>

      <View style={styles.container}>       
         <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} >
          <View style={{width: Dimensions.get('window').width - 15, height: 100 , marginLeft: 8,marginTop: 13}}> 
              <Image source={ this.state.avatarSource === null ? defaultimg : this.state.avatarSource } style={{flex:1,width: null,height:null,alignItems: "center"}} />             
          </View> 
          </TouchableOpacity>  
          <View style={{ marginTop: 10 }}>  
            <TextInput
            style={styles.inputStyle}
            placeholder="Bar Name" placeholderTextColor= '#999999'
            returnKeyType = { 'next' }                   
            underlineColorAndroid= "transparent"                                                                     
            onChangeText={(barname) => { this.state.barName = barname 
                barNamelen = barname.length
            }}
            onSubmitEditing={(event) => {                   
                  this.refs.txtbarAddress.focus(); 
            }} />

            <TextInput
            ref= 'txtbarAddress'
            style={styles.inputStyle}
            placeholder="Bar Address" placeholderTextColor= '#999999'
            returnKeyType = { 'next' }
            underlineColorAndroid= "transparent"                                                       
            onChangeText={(baraddress) => { this.state.barAddress = baraddress 
                barAddresslen = baraddress.length
            }} 
            onSubmitEditing={(event) => {                  
                this.refs.txtOpenTime.focus(); 
            }} />

            <TextInput
            ref= 'txtOpenTime'
            style={styles.inputStyle}
            placeholder="Open Time" placeholderTextColor= '#999999'
            returnKeyType = { 'next' }
            underlineColorAndroid="transparent"                                                       
            onChangeText={(baropentime) => { this.state.barOpenTime = baropentime 
                barOpenTimelen = baropentime.length
            }}
            onSubmitEditing={(event) => {                
                this.refs.txtCloseTime.focus(); 
            }}  />

            <TextInput
            ref= 'txtCloseTime'
            style={styles.inputStyle}
            placeholder="Close Time" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            onChangeText={(barclosetime) => { this.state.barCloseTime = barclosetime 
                barCloseTimelen = barclosetime.length
            }} 
            onSubmitEditing={(event) => {                
                this.refs.txtBarCapacity.focus(); 
            }} />

            <TextInput
            ref= 'txtBarCapacity'
            style={styles.inputStyle}
            placeholder="Bar Capacity" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'done' }
            onChangeText={(barcapacity) => { this.state.barCapacity = barcapacity 
                barCapacitylen = barcapacity.length
            }} />

            <TouchableOpacity style={styles.button} onPress={() => barNamelen == 0 || barAddresslen == 0 || barOpenTimelen == 0 || barCloseTimelen == 0 || barCapacitylen == 0  ? Alert.alert('Please enter all the feilds in order to Add Bar.') : Database.setBardata(createdDate,this.state.userId,this.state.barName,this.state.barAddress,this.state.barOpenTime,this.state.barCloseTime,this.state.barCapacity,this.state.uploadURL, (flag) => { isSignUp == 'SignUp'? navigate('HomeScreenPage') : this.goBackMyBarsAction() } ) }>            
              <Text style={styles.logintext}> Done </Text> 
           </TouchableOpacity> 
         </View>
      </View>
      </KeyboardAwareScrollView>
    );
  } 

}

const styles = StyleSheet.create({
  container: {    
    flex: 1,     
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,    
  },
  imageContainer: {
    flex: 1,
    margin: 50,    
    flexDirection: "row",
    alignItems: "stretch"    
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
    marginTop: 30, 
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
