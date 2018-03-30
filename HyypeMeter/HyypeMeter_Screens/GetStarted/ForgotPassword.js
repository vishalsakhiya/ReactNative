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
  TouchableOpacity
} from 'react-native';

export default class ForgotPassword extends Component {
 
   render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.imageContainer}>
        <Text> ForgotPassword..... </Text>  
        <Button title= 'save' onPress= {() => navigate('samp') } />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    margin: 50,
    flexDirection: "row",
    alignItems: "stretch"    
  },
  

});
