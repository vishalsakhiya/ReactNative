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
  Platform,
  Alert,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import SignUpPage from 'HyypeMeter/HyypeMeter_Screens/SignUP/SignUpPage.js';
const background = require('HyypeMeter/Resources/GetStarted/GetStartedBG.png');
import ForgotPassword from 'HyypeMeter/HyypeMeter_Screens/GetStarted/ForgotPassword.js';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

export default class HomePage extends Component {

  static navigateOptions = {
    title: 'Home',
    screenBOption: ''
  };

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.container}>
          <StatusBar
              backgroundColor="rgba(0,116,204, 0.8)"
              barStyle="light-content"  />

        <View style={styles.imageContainer}>
         <Image source={background}  style={styles.image} >
          <View style={{ flex: 1, flexDirection: "row",justifyContent: 'center', marginLeft: 10,marginRight: 5}}>
            <TouchableOpacity style={styles.button} onPress={() => navigate('SignUpPage')}>
                    <Text style={styles.text}> Sign Up </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => navigate('SignIn')}>
                    <Text style={styles.logintext}> Log In </Text>
            </TouchableOpacity>
           </View>
           <TouchableOpacity style={styles.pwd} onPress={() => navigate('ForgotPassword')}>
              <Text style={{ fontSize:13,fontWeight:'bold',color:'#FFFFFF',textAlignVertical: "center",textAlign: "center" }}> Forgot Password </Text>
           </TouchableOpacity>
          </Image>
        </View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.onPressSignUp = this.onPressSignUp.bind(this);
  }

  onPressSignUp()
  {
    Alert.alert('Sign up..........');
  }

  onPressLogIn()
  {
    Alert.alert('Log In...');
  }

  onPressForgotPwd()
  {
    Alert.alert('Forgot Password...');
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  mark: {
    height: 300,
    width: 300,
  },
  image: {
    flex: 1,
    width: null,
    height: null
  },
  imageContainer: {
    flex: 1,
    alignItems: "stretch"
  },
  button: {
    flex: 2,
    borderColor: '#FFFFFF',
    borderWidth: 2.5,
    borderRadius: 46,
    width: 150,
    height: Platform.OS == 'ios' ? 45 : 55,
    backgroundColor: 'transparent',
    marginLeft: 5,
    marginTop: Platform.OS == 'ios' ? Dimensions.get('window').height - 120 : Dimensions.get('window').height - 160,
    padding: 10,
  },
  button2: {
    flex: 2,
    borderColor: '#FFA802',
    borderWidth: 2.5,
    borderRadius: 46,
    width: 150,
    height: Platform.OS == 'ios' ? 45 : 55,
    backgroundColor: '#FFA802',
    marginTop: Platform.OS == 'ios' ? Dimensions.get('window').height - 120 : Dimensions.get('window').height - 160,
    marginLeft: 5,
    padding: 10,
  },
  pwd: {
    flex: 2,
    marginTop: Platform.OS == 'ios' ? Dimensions.get('window').height - 70 : Dimensions.get('window').height - 110,
    backgroundColor: 'transparent',
    height: 40,
  },
  text: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "center"
  },
  logintext: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "center"
  },
});

module.exports = HomePage;
