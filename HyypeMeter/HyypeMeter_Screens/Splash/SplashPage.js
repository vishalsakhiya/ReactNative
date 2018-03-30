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

const backgroundimg = require('HyypeMeter/Resources/Splash/SplashScreen.png');

export default class SplashPage extends Component {

     componentWillMount () {
        const { navigate } = this.props.navigation;
        setTimeout (() => {
            navigate('HomePage');
        }, 1000); 
    }

   render() {
    return (
      <View style={styles.imageContainer}>
        <Image source={backgroundimg}  style={styles.image} />
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
    flexDirection: "row",
    alignItems: "stretch"    
  },

});
