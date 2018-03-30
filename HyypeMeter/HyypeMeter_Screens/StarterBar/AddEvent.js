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
  TouchableOpacity, 
  Picker 
} from 'react-native';

import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';
import { NavigationActions } from 'react-navigation';
import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
var defaultimg = require('HyypeMeter/Resources/SignUp/DefaultUploadImg.png');

import ModalPicker from 'react-native-modal-picker';
const rightCheck = require('HyypeMeter/Resources/SignUp/GreenRightCheck_1.png');
var Uncheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var downarrow = require('HyypeMeter/Resources/Home/downarrow.png');


let togglemenu = null;
let userData = null;

let eventnamelen = 0;
let eventdatelen = 0;
let atmospherelen = 0;
let restrictionslen = 0;
let tickettypelen = 0;
let ticketpricelen = 0;
let availableticketlen = 0;

export default class AddEvent extends Component {
 
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
        eventname: '',
        eventdate: '',
        atmosphere: '',
        restrictions: '',
        tickettype: '',
        ticketprice: '', 
        availableticket: '',
        language: 'Java',
        canada: '',
        visible: false,
        textInputValue: '',
        isFreeEvent: false,
        iswithBcost: false,
        isHyypeFive: false,
        isDateTimePickerVisible: false,
      }           
   }

   componentDidMount() {
      this.getUserdata(); 
   }

    _getOptionList() {
        return this.refs['OPTIONLIST'];
      }

  
      _canada(province) {

      this.setState({
          ...this.state,
          canada: province
        });
      }

  static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Hyype Now",
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
  goBackMyEventsAction()
   {
      this.props.navigation.state.params.refresh();    
      this.props.navigation.dispatch(NavigationActions.back({
                key: null
         }) 
      ) 
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
      });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium'
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        this.setState({
          videoSource: response.uri
        });
      }
    });
  }

   render() {
    const { navigate } = this.props.navigation;   
    var barId = this.props.navigation.state.params.barId;

    var dateFormat = require('dateformat');
    var today = new Date();    
    var createdDate = dateFormat(today, "dd-mm-yyyy hh:MM:ss");
    let index = 0;
    const data = [
            { key: index++, label: 'Music' },
            { key: index++, label: 'Crowing' }           
        ];

    return (
      <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}>

      <View style={styles.container}> 
          <ScrollView style={{ height: Dimensions.get('window').height - 50}}>
           <View style={{marginTop: 15}}>      
           <TouchableOpacity style={styles.button1}>
              <Text style={styles.logintext1}> Check Current Hyype</Text> 
           </TouchableOpacity> 
           </View>
            <View>
           <TouchableOpacity style={styles.button1}>
              <Text style={styles.logintext1}> Add A Hyype</Text> 
           </TouchableOpacity> 
           </View>

          <TouchableOpacity onPress={this.selectVideoTapped.bind(this)} >
          <View style={{width: Dimensions.get('window').width - 15, height: 100 , marginLeft: 8,marginTop: 13}}> 
           <Image source={ this.state.avatarSource === null ? defaultimg : this.state.avatarSource } style={{flex:1,width: null,height:null,alignItems: "center"}} />             
          </View> 
          </TouchableOpacity>  

          <View style={{ marginTop: 10 }}>  
           <TextInput
            style={styles.inputStyle}
            placeholder="Event Name" placeholderTextColor= '#999999'
            returnKeyType = { 'next' }                   
            underlineColorAndroid= "transparent"                                                                     
            onChangeText={(eventname) => { this.state.eventname = eventname
                eventnamelen = eventname.length
            }}
            onSubmitEditing={(event) => {                   
                  this.refs.txteventdate.focus(); 
            }} />

            <TextInput
            ref= 'txteventdate'
            style={styles.inputStyle}
            placeholder="Event Date" placeholderTextColor= '#999999'
            returnKeyType = { 'next' }
            underlineColorAndroid= "transparent"                                                       
            onChangeText={(eventdate) => { this.state.eventdate = eventdate
                eventdatelen = eventdate.length
            }} 
            onSubmitEditing={(event) => {                  
                this.refs.txtatmosphere.focus(); 
            }} />   

            <View>          
               <ModalPicker
                      data={data} 
                      initValue= "Atmosphere"
                      style={styles.inputStyle1}                                                     
                      onChange={(option)=>{ this.setState({atmosphere:option.label})}} />  
            </View>

            <TextInput
            ref= 'txtrestrictions'
            style={styles.inputStyle}
            placeholder="Restrictions" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            onChangeText={(restrictions) => { this.state.restrictions = restrictions
                restrictionslen = restrictions.length
            }} 
            onSubmitEditing={(event) => {                
                this.refs.txttickettype.focus(); 
            }} />

            <TextInput
            ref= 'txttickettype'
            style={styles.inputStyle}
            placeholder="Ticket Types" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            onChangeText={(tickettype) => { this.state.tickettype = tickettype
                tickettypelen = tickettype.length
            }} 
             onSubmitEditing={(event) => {                
                this.refs.txtticketprice.focus(); 
            }} />

             <TextInput
            ref= 'txtticketprice'
            style={styles.inputStyle}
            placeholder="Ticket Prices" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            onChangeText={(ticketprice) => { this.state.ticketprice = ticketprice
                ticketpricelen = ticketprice.length
            }} 
             onSubmitEditing={(event) => {                
                this.refs.txttotnotickets.focus(); 
            }} />

            <TextInput
            ref= 'txttotnotickets'
            style={styles.inputStyle}
            placeholder="Totla Number Of Tickets" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'next' }
            onChangeText={(ticketprice) => { this.state.ticketprice = ticketprice
                ticketpricelen = ticketprice.length
            }} 
             onSubmitEditing={(event) => {                
                this.refs.txtavailabletickets.focus(); 
            }} />

             <TextInput
            ref= 'txtavailabletickets'
            style={styles.inputStyle}
            placeholder="Available Tickets" placeholderTextColor= '#999999'
            underlineColorAndroid="transparent"                                                       
            returnKeyType = { 'done' }
            onChangeText={(availableticket) => { this.state.availableticket = availableticket
                 availableticketlen = availableticket.length
            }} />

             <TouchableOpacity onPress = {() => { if (this.state.isFreeEvent == false)
                                     {
                                        this.setState({ isFreeEvent: true })
                                     }
                                     else
                                     {
                                        this.setState({ isFreeEvent: false })
                                     }}}>
            <View style={{ flexDirection: 'row',flexWrap: 'wrap',marginBottom: 20,marginTop: 10 }}>                       
              <Text style= {{fontSize: 14, color: '#000000',paddingLeft: 10}}>                 
                   <Image source={ this.state.isFreeEvent ? rightCheck : Uncheck } style={{width: Platform.OS == 'ios' ? 20 : 100, height: Platform.OS == 'ios' ? 20 : 100,
                    marginTop: Platform.OS == 'ios' ? 8 : 0,marginLeft: 10}} /> Add Free Events                
              </Text>       
            </View>
            </TouchableOpacity> 

             <TouchableOpacity onPress = {() => { if (this.state.iswithBcost == false)
                                     {
                                        this.setState({ iswithBcost: true })
                                     }
                                     else
                                     {
                                        this.setState({ iswithBcost: false })
                                     } }}>
            <View style={{ flexDirection: 'row',flexWrap: 'wrap',marginBottom: 20}}>                       
              <Text style= {{fontSize: 14, color: '#000000',paddingLeft: 10}}>                 
                   <Image source={ this.state.iswithBcost ? rightCheck : Uncheck } style={{width: Platform.OS == 'ios' ? 20 : 100, height: Platform.OS == 'ios' ? 20 : 100,
                    marginTop: Platform.OS == 'ios' ? 8 : 0,marginLeft: 10}} /> Add With Bcost               
              </Text>       
            </View>
            </TouchableOpacity> 
             <TouchableOpacity onPress = {() => { if (this.state.isHyypeFive == false)
                                     {
                                        this.setState({ isHyypeFive: true })
                                     }
                                     else
                                     {
                                        this.setState({ isHyypeFive: false })
                                     } }}>
            <View style={{ flexDirection: 'row',flexWrap: 'wrap',marginBottom: 20}}>                       
              <Text style= {{fontSize: 14, color: '#000000',paddingLeft: 10}}>                 
                   <Image source={ this.state.isHyypeFive ? rightCheck : Uncheck } style={{width: Platform.OS == 'ios' ? 20 : 100, height: Platform.OS == 'ios' ? 20 : 100,
                    marginTop: Platform.OS == 'ios' ? 8 : 0,marginLeft: 10}} /> Add Hyype Five               
              </Text>       
            </View>
            </TouchableOpacity> 

           <TouchableOpacity style={styles.button} onPress= {() => { eventnamelen == 0 || eventdatelen == 0 ||  restrictionslen == 0 ||  tickettypelen == 0 || ticketpricelen == 0 ||  availableticketlen == 0 ? Alert.alert('Please enter all the feilds in order to Add Event.') : Database.updateBardata(barId,this.state.eventname,this.state.eventdate, this.state.atmosphere, this.state.restrictions, this.state.tickettype,this.state.ticketprice, this.state.availableticket,this.state.isFreeEvent,this.state.iswithBcost,this.state.isHyypeFive, (flag) => { this.goBackMyEventsAction() } )}} >
              <Text style={styles.logintext}> Be The Hyype</Text> 
           </TouchableOpacity> 
            <Text></Text>
            <Text></Text>
         </View>
         </ScrollView>
      </View>
      </KeyboardAwareScrollView>
    );
  } 

}

const styles = StyleSheet.create({
  container: {    
    flex: 1,     
    backgroundColor: '#FFFFFF',    
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
  inputStyle1: {
    width: Dimensions.get('window').width - 20,
    height: 45,
    borderWidth: 0.5, 
    padding: 15,
    borderColor: '#D7D7D7',
    borderRadius: 8, 
    marginLeft: 10,    
    marginBottom: 10,
    backgroundColor: '#fafafa'
  },
  button: {       
    borderColor: '#0091FF',
    borderWidth: 2.5,
    borderRadius: 40,    
    height:45,
    backgroundColor: '#0091FF', 
    marginTop: 15, 
    marginLeft: 10,
    marginRight: 10, 
    marginBottom: 10,   
    padding: 10,
  }, 
  logintext: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "center"        
  },
   button1: {       
    borderColor: '#0091FF',
    borderWidth: 1.0,
    borderRadius: 40,    
    height:45,
    backgroundColor: '#FFFFFF', 
    marginTop: 3, 
    marginLeft: 10,
    marginRight: 10, 
    marginBottom: 10,   
    padding: 10,
  }, 
  logintext1: {
    fontSize: 18,    
    color: '#0091ff',
    textAlignVertical: "center",
    textAlign: "center"        
  },
  datestyle: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },

});
