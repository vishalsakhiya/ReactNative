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
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import * as firebase from "firebase";
import { NavigationActions } from 'react-navigation';
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
const background = require('HyypeMeter/Resources/SignUp/SignUpBG.png');
var rightCheck = require('HyypeMeter/Resources/SignUp/GreenRightCheck.png');
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var hyype = require('HyypeMeter/Resources/Home/hyype.png');
var video = require('HyypeMeter/Resources/Home/video.png');

var rightUnCheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var live = require('HyypeMeter/Resources/Home/Live.png');
var defaultimg = require('HyypeMeter/Resources/Home/Bars.jpg');
var noevent = require('HyypeMeter/Resources/Home/NoEvent.png');

var arrControls = [];
var arrControls1 = [];

var togglemenu = null;
var vals = null; 

var search = require('HyypeMeter/Resources/Home/search.png');

export default class BarEvents extends Component {

  constructor(props) {
    super(props);
    const arrBarDetails = [];
    const arrBarDetails1 = [];
     this.goAddEventAction = this.goAddEventAction.bind(this);
    this.calc = this.calc.bind(this);
    this.state = {
     isdata: false,
     isNew: true,
     arrBarDetails,
     arrBarDetails1,
     barImg: '',
     barId: '',
   };

  }

 getBarImage()
 {                  
    Database.getBarImageUrl(this.props.navigation.state.params.barId,(flag) => { this.setState({ barImg: flag }) });    
 }

  componentDidMount() {

    this.getBarImage();

     togglemenu = this.goAddEventAction;
     vals = this.calc;

    if (this.state.arrBarDetails.length == 0)
    { 
        this.setState({
          isdata: false
        });
        arrControls.push(
          <View key = { 0 }> 
               <View style={{width: 300, height: 320}}>      
                    <Image source= {noevent} style={{width: 90, height: 90, marginLeft : 110, marginTop: 110}} />  
               </View>
          </View>
        )
    }
    else{      

       this.state.arrBarDetails.splice(0, this.state.arrBarDetails.length);
       arrControls.splice(0,arrControls.length);

      setTimeout(() => {
        this.state.arrBarDetails.forEach((value,index,arr) =>
        {            
            this.setState({
                isdata: true
            });           

            arrControls.push(              
              <View key = { index }>                                     
                  <View style={{marginBottom: 8, height: 100, backgroundColor: '#fafafa', borderRadius:10, borderColor: '#d7d7d7', borderWidth: 1}}>               
                     <TouchableOpacity>
                         <View style={{width: 300, height: 98, backgroundColor: '#fafafa', flexDirection: 'row', borderRadius: 10}}>  
                              <View style={{width: 100, height: 98,borderTopLeftRadius: 10, borderBottomLeftRadius: 10,overflow: "hidden"}}>      
                                   <Image source= {defaultimg} style={{width: 100, height: 98}} >
                                        <Image source={video} style={{width: 30 , height: 30,marginLeft: 35,marginTop: 32,opacity: 0.7}}/>
                                    </Image>                                        
                              </View> 
                              <View style={{width: 200, height: 100}}>      
                                    <Text style={{width: 100, height: 35, color: 'black', fontSize: 16, fontWeight: '400', paddingLeft: 10, paddingTop: 10}}>
                                        { value.eventName }
                                    </Text>  
                                    <View style={{flexDirection: 'row', marginTop: 3}}>
                                           <View style={{width: 30, height: 15, backgroundColor: '#0091FF', marginLeft: 12, borderColor: '#0091FF', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12}}>      
                                                <Text style={{width: 20, height: 12, color: 'white', fontSize: 9, fontWeight: '500', marginLeft: 7, marginTop: 2}}>
                                                 541
                                              </Text>  
                                           </View> 
                                           <View style={{width: 120, height: 14, marginLeft: 2, marginTop: 0.8}}>
                                              <Text style={{width: 120, height: 14, color: '#b5b5b5', fontSize: 11, fontWeight: '500', textAlign: 'center'}}>
                                                 HYYPERS Checked In
                                              </Text>  
                                           </View>
                                    </View>
                                    <TouchableOpacity onPress={() => this.clickHandler(value.eventId) }>
                                      <View style={{width: 110, height: 25, backgroundColor: '#FFA802', marginTop: 14, marginLeft: 90, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12}}>      
                                            <Text style={{width: 80, height: 15, color: 'white', fontSize: 14, fontWeight: '600', textAlign: 'center', marginTop: 3.5, marginLeft: 14}}>
                                               Get HYYPE
                                            </Text>  
                                      </View>
                                    </TouchableOpacity>
                              </View> 
                         </View>  
                     </TouchableOpacity>   
                  </View>   
              </View>
            ) 
             this.forceUpdate();           
        })    
      }, 1500)
        
    }

  }

 static navigationOptions = ({ navigation, screenProps }) => ({
      title: "HYYPEMETER Says",
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
          <TouchableOpacity onPress={() => togglemenu() }>
           <Image source= {live} style={{marginRight: 15,width: 50,height: 30 }} />    
          </TouchableOpacity>
      )
   });


  goAddEventAction() 
  {    
      const { navigation } = this.props;
      navigation.navigate('AddEvent', { barId: navigation.state.params.barId, refresh: this.refreshFunction });
  }
  refreshFunction()
  { 
      vals();
  }
  
  calc()
  { 
     const { navigate } = this.props.navigation;
     this.setState({ isNew: false });      
     this.state.arrBarDetails1.splice(0, this.state.arrBarDetails1.length);
     arrControls1.splice(0,arrControls1.length);

      setTimeout(() => {
           this.state.arrBarDetails1.forEach((value,index,arr) =>
           {
              arrControls1.push(
                <View key = { index }>                                     
                  <View style={{marginBottom: 8, height: 100, backgroundColor: '#fafafa', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderColor: '#d7d7d7', borderWidth: 1}}>               
                     <TouchableOpacity>
                         <View style={{width: 300, height: 97, backgroundColor: '#fafafa', flexDirection: 'row',  marginTop: 0.4, marginLeft: 1, borderBottomLeftRadius: 12, borderTopLeftRadius: 12, borderBottomRightRadius: 12, borderTopRightRadius: 12}}>  

                              <View style={{width: 110, height: 98, borderBottomLeftRadius: 12, borderTopLeftRadius: 12}}>      
                                    <Image source= {defaultimg} style={{width: 100, height: 90, marginLeft : 5, marginTop: 4}} >
                                        <Image source={video} style={{width: 20 , height: 20,alignItems: 'center'}}/>
                                    </Image>                                       
                              </View> 
                              <View style={{width: 200, height: 100}}>      
                                    <Text style={{width: 100, height: 35, color: 'black', fontSize: 16, fontWeight: '400', paddingLeft: 10, paddingTop: 10}}>
                                        { value.eventName }
                                    </Text>  
                                    <View style={{flexDirection: 'row', marginTop: 3}}>
                                           <View style={{width: 30, height: 15, backgroundColor: '#0091FF', marginLeft: 12, borderColor: '#0091FF', borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12}}>      
                                                <Text style={{width: 20, height: 12, color: 'white', fontSize: 9, fontWeight: '500', marginLeft: 7, marginTop: 2}}>
                                                 541
                                              </Text>  
                                           </View> 
                                           <View style={{width: 120, height: 14, marginLeft: 2, marginTop: 0.8}}>
                                              <Text style={{width: 120, height: 14, color: '#b5b5b5', fontSize: 11, fontWeight: '500', textAlign: 'center'}}>
                                                 HYYPERS Checked In
                                              </Text>  
                                           </View>
                                    </View>
                                    <TouchableOpacity onPress={() => { this.clickHandler(value.eventId) } }>
                                      <View style={{width: 110, height: 25, backgroundColor: '#FFA802', marginTop: 14, marginLeft: 75, borderBottomLeftRadius: 12, borderBottomRightRadius: 12, borderTopLeftRadius: 12, borderTopRightRadius: 12}}>      
                                            <Text style={{width: 80, height: 15, color: 'white', fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 3.5, marginLeft: 14}}>
                                               Get HYYPE
                                            </Text>  
                                      </View>
                                    </TouchableOpacity>
                              </View> 
                         </View>  
                     </TouchableOpacity>   
                  </View>   
              </View>
              )
              this.forceUpdate()
          })    
       }, 1500)
  }

  clickHandler(id){  
    const { navigate } = this.props.navigation;
    navigate('CheckIn',{ barId: this.props.navigation.state.params.barId, eventId: id } )
  }

  render() {  

    if (this.state.isNew)
    {
      Database.getbarDetails(this.props.navigation.state.params.barId,(flag) => { this.state.arrBarDetails = flag } );                    
    }
    else
    {
      Database.getbarDetails(this.props.navigation.state.params.barId,(flag) => { this.state.arrBarDetails1 = flag } );                   
    }

    return (
      <View style= {{flex: 1, height: Dimensions.get('window').height,width: Dimensions.get('window').width,backgroundColor: '#FFFFFF'}}>
        <View style={{width: Dimensions.get('window').width, height: 150}}>      
            <Image source= {{uri: this.state.barImg.length == 0 ? 'https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png' : this.state.barImg }} style={{width: Dimensions.get('window').width, height: 150}} > 
              <View style= {{flexDirection: 'row',marginTop: 10 }}> 
                  <View>
                     <TextInput
                            style={styles.inputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Search" placeholderTextColor= '#D7D7D7' />  
                  </View>
                  <View style={{marginLeft:Dimensions.get('window').width - 50 , marginTop: 13, position: 'absolute'}}>
                    <Image source= {search} style={{width: 20, height: 20}}/> 
                  </View>
              </View>
              <View style={{alignItems: 'center'}}>
                  <Image source={hyype} style={{width: 200, height: 50, marginTop: 10}}/>
              </View>              
            </Image>
        </View> 
        <ScrollView style={{width: Dimensions.get('window').width - 6, height: 350, paddingLeft: 6.5,marginTop: 10}}>
            <View>                  
                { this.state.isNew ? arrControls : arrControls1 } 
            </View>  
        </ScrollView>
     </View>      
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
    fontWeight: '500',
    borderRadius: 8, 
    marginLeft: 10,
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
    backgroundColor: 'rgba(57, 57, 57, 0.4)',
  }, 

});
