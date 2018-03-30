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
  ActivityIndicator
} from 'react-native';

import Child from 'HyypeMeter/HyypeMeter_Screens/LogIn/Child';

export default class Parent extends Component {
    constructor() {
        super();
        this.state = {
            result: 0,
            animating: true,
        };
    }
   closeActivityIndicator = () => setTimeout(() => this.setState({ 
      animating: false }), 3000)

   componentDidMount = () => this.closeActivityIndicator()
   render() {
      const animating = this.state.animating
      return (
         <View style = {styles.container}>
            <ActivityIndicator
               animating = {animating}
               color = '#0091ff'
               size = "large"
               style = {styles.activityIndicator}/>
         </View>
      )
   }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
})

