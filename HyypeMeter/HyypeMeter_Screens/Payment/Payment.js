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
  TouchableOpacity
} from 'react-native';

var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
import { NavigationActions } from 'react-navigation';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import Stripe from 'react-native-stripe-api';

var totchargelen = 0;
var cardnumlen = 0;
var cvvlen = 0;
var expiremonthlen = 0;
var cardnamelen = 0;

export default class Payment extends Component {
 
  constructor(props) {
    super(props);
       
    this.state = {
      totcharge: '',
      cardnum: '',
      cvv: '',
      expiremonth: '',
      cardname: '',   
      dobDate: null,  
      dobText: '',
   };
  }

  payme()
  {
      const apiKey = 'sk_test_mpyJC58uEg1Spku0X99mFQOw';
      const client = new Stripe(apiKey);
      client.createToken('4242424242424242','09','18','111').then((x) => {
          console.log(x);
      }).catch((e) => {
        console.log(e);
      })

  }

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Payment",
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

  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if(!dobDate || dobDate == null){
      dobDate = new Date();
      this.setState({
        dobDate: dobDate
      });      
    }

    this.refs.dobDialog.open({
                              date: this.state.dobDate,
                              maxDate: new Date()
                            });

  }

  onDOBDatePicked = (date) => {
    this.setState({
      dobDate: date,
      dobText: moment(date).format('DD-MMM-YYYY')
    });
  }

   render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>  
          <View style={{marginTop: 20}}>
               <TextInput
                  style={styles.inputStyle}                  
                  returnKeyType = { 'next' }                                          
                  placeholder="Total Charge" 
                  underlineColorAndroid="transparent" 
                  onChangeText={(totcharge) => { 
                    totchargelen = totcharge.length                    
                    this.setState({ totcharge : totcharge })
               }}         
               onSubmitEditing={(event) => {                   
                  this.refs.txtcardnum.focus() }} /> 

              <View style= {{width: Dimensions.get('window').width - 20 ,height: 1, backgroundColor:"#cbd1db",marginLeft: 10, marginRight: 10, marginBottom: 10 }} />                
                  <TextInput
                  ref= 'txtcardnum'  
                  style={styles.inputStyle}                  
                  returnKeyType = { 'next' }  
                  placeholder="Card Number" 
                  underlineColorAndroid="transparent"
                   onChangeText={(cardnum) => {  
                   cardnamelen = cardnum.length                       
                    this.setState({ cardnum : cardnum })
                 }}         
               onSubmitEditing={(event) => {                   
                  this.refs.txtcvv.focus() }}/>  

              <View style= {{width: Dimensions.get('window').width - 20 ,height: 1, backgroundColor:"#cbd1db", marginLeft: 10, marginRight: 10, marginBottom: 10 }} />  
                <View style = {{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                      <TextInput
                        ref= 'txtcvv'
                        style={styles.inputStyle}                  
                        returnKeyType = { 'next' }  
                        placeholder="CVV/CCV" 
                        underlineColorAndroid="transparent"                       
                        onChangeText={(cvv) => {       
                        cvvlen = cvv.length                  
                          this.setState({ cvv : cvv })
                       }}         
                   onSubmitEditing={(event) => {                   
                      this.refs.txtexpmon.focus() }}/>  

                     <View style= {{width: Dimensions.get('window').width / 2 - 10 ,height: 1, backgroundColor:"#cbd1db", marginLeft: 10,  marginBottom: 10 }} />  
                  </View>

                  <View style={{position: 'absolute'}}>
                       <TextInput
                            ref= 'txtexpmon'
                            style={{marginLeft: Dimensions.get('window').width/2 + 15 ,fontSize: 12, marginTop: 10 ,marginBottom: 10,marginRight: 10 }}                  
                            returnKeyType = { 'next' }  
                            placeholder="Expire Month" 
                            underlineColorAndroid="transparent"                            
                            onChangeText={(expiremonth) => {   
                            expiremonthlen = expiremonth.length                      
                                this.setState({ expiremonth : expiremonth })
                             }}      
                           onFocus = {() => { this.onDOBPress() }
                          }   
                         onSubmitEditing={(event) => {                   
                            this.refs.txtcardholdnm.focus() }}/>  
                       <View style= {{width: Dimensions.get('window').width / 2 - 20,height: 1, backgroundColor:"#cbd1db", marginLeft: Dimensions.get('window').width/2 + 10 }} />  
                       <DatePickerDialog ref="dobDialog" onDatePicked={ this.onDOBDatePicked.bind(this) } />
                  </View>
                </View>
                  <TextInput
                  ref = 'txtcardholdnm'
                  style={styles.inputStyle}                  
                  returnKeyType = { 'done' }                                          
                  placeholder="Card Holder Name" 
                  underlineColorAndroid="transparent"
                  onChangeText={(cardname) => {   
                                cardnamelen = cardname.length                      
                                this.setState({ cardname : cardname })
                             }}  />  

            <View style= {{width: Dimensions.get('window').width - 20,height: 1, backgroundColor:"#cbd1db",marginLeft: 10, marginRight: 10,  marginBottom: 10 }} />  
            <TouchableOpacity style={styles.paymentbutton} onPress={() => this.payme() } >
                <Text style={styles.paymenttext}> Payment </Text> 
            </TouchableOpacity> 

            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF',
  },
  inputStyle: {
    margin: 10,
    fontSize: 12,
  },
  paymentbutton: {       
    borderColor: '#0091FF',
    borderWidth: 2.5,
    borderRadius: 40,    
    height:45,
    backgroundColor: '#0091FF', 
    marginTop: 220, 
    marginLeft: 10,
    marginRight: 10, 
    marginBottom: 10,   
    padding: 10,
  }, 
  paymenttext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "center"        
  },
});
