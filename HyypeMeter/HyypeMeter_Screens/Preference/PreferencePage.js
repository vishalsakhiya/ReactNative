import React, { Component } from 'react';
import RadioButton from 'react-native-radio-button';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,  
  Dimensions,
  TextInput,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';

import CheckBox from 'react-native-check-box';
import { NavigationActions } from 'react-navigation';
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');

var circle = require('HyypeMeter/Resources/Preferences/Uncheck.png');
var check = require('HyypeMeter/Resources/Preferences/check.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
var musicdata = '';
var mooddata = '';
var crowddata = '';


export default class PrefencePage extends Component 
{
   constructor(props)
     {
        super(props);  
        const musicval = [];
        const moodval = [];
        const crowdval = [];
        this.state = {
          avatarSource: null,
          videoSource: null,     
          isOpen: false,
          selectedItem: 'About', 
          ischeck: false,
          top40 : false, country: false, hiphop: false , soul: false, pop: false,electronica: false,latin: false, dancehall: false, afrobeat: false, karaoke: false,
          upscale: false, chill: false, social : false, high : false, laid : false, hybrid: false,
          vip: false, college: false, Professional: false , urban: false, mature: false, international: false,     
          userType: '',
          musicval,
          moodval,
          crowdval,
        }           
     }
    
  static navigationOptions = ({ navigation, screenProps }) => ({    
    title: "How Do You Hyype",
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

   render() {
    const { navigate } = this.props.navigation;
   
    return (       
      <View style={styles.container}>       
        <ScrollView contentContainerStyle={styles.contentContainer}>       
            <Text style={styles.music}>Music Preferences</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1,marginLeft: 5,marginTop: 10}}>
                 <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.top40 == false )
                              {
                                  this.setState({
                                    top40: true
                                  })                                 
                                  this.state.musicval.push('Top 40')
                              }
                              else
                              {
                                  this.setState({
                                    top40: false
                                  })
                                  var index = this.state.musicval.indexOf('Top 40')
                                  this.state.musicval.splice(index, 1)  
                              }                              
                          } }
                         isChecked= { this.state.top40 }
                         rightText= 'Top 40' />    
                 <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.country == false )
                              {
                                  this.setState({
                                    country: true
                                  })                                 
                                  this.state.musicval.push('Country')
                              }
                              else
                              {
                                  this.setState({
                                    country: false
                                  })
                                var index = this.state.musicval.indexOf('Country')
                                this.state.musicval.splice(index, 1)                                
                              } 

                          } }
                         isChecked= { this.state.country }
                         rightText= 'Country' />   
                <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.hiphop == false )
                              {
                                  this.setState({
                                    hiphop: true
                                  })
                                  this.state.musicval.push('Hip Hop')
                              }
                              else
                              {
                                  this.setState({
                                    hiphop: false
                                  })
                                  var index = this.state.musicval.indexOf('Hip Hop')
                                  this.state.musicval.splice(index, 1) 
                              }                              
                          } }
                         isChecked= { this.state.hiphop }
                         rightText= 'Hip Hop' />  
                  <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.soul == false )
                              {
                                  this.setState({
                                    soul: true
                                  })
                                  this.state.musicval.push('Soul/R&B')
                              }
                              else
                              {
                                  this.setState({
                                    soul: false
                                  })
                                  var index = this.state.musicval.indexOf('Soul/R&B')
                                  this.state.musicval.splice(index, 1)
                              }                              
                          } }
                         isChecked= { this.state.soul }
                         rightText= 'Soul/R&B' /> 
                  <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.pop == false )
                              {
                                  this.setState({
                                    pop: true
                                  })
                                  this.state.musicval.push('Pop/Alternative')
                              }
                              else
                              {
                                  this.setState({
                                    pop: false
                                  })
                                   var index = this.state.musicval.indexOf('Pop/Alternative')
                                  this.state.musicval.splice(index, 1)
                              }                              
                          } }
                         isChecked= { this.state.pop }
                         rightText= 'Pop/Alternative' />      
              </View>
               <View style={{position:'absolute',marginLeft: 140, marginTop: 10 }}>
                     <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.electronica == false )
                              {
                                  this.setState({
                                    electronica: true
                                  })
                                  this.state.musicval.push('Electronica/House')
                              }
                              else
                              {
                                  this.setState({
                                    electronica: false
                                  })
                                   var index = this.state.musicval.indexOf('Electronica/House')
                                  this.state.musicval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.electronica }
                         rightText= 'Electronica/House' />    
                 <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.latin == false )
                              {
                                  this.setState({
                                    latin: true
                                  })
                                  this.state.musicval.push('Latin/Salsa/Merengue')
                              }
                              else
                              {
                                  this.setState({
                                    latin: false
                                  })
                                  var index = this.state.musicval.indexOf('Latin/Salsa/Merengue')
                                  this.state.musicval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.latin }
                         rightText= 'Latin/Salsa/Merengue' />   
                  <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.dancehall == false )
                              {
                                  this.setState({
                                    dancehall: true
                                  })
                                  this.state.musicval.push('Reggae/Dancehall')
                              }
                              else
                              {
                                  this.setState({
                                    dancehall: false
                                  })
                                  var index = this.state.musicval.indexOf('Reggae/Dancehall')
                                  this.state.musicval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.dancehall }
                         rightText= 'Reggae/Dancehall' />
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.afrobeat == false )
                              {
                                  this.setState({
                                    afrobeat: true
                                  })
                                  this.state.musicval.push('Afrobeat')
                              }
                              else
                              {
                                  this.setState({
                                    afrobeat: false
                                  })
                                  var index = this.state.musicval.indexOf('Afrobeat')
                                  this.state.musicval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.afrobeat }
                         rightText= 'Afrobeat' /> 
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.karaoke == false )
                              {
                                  this.setState({
                                    karaoke: true
                                  })
                                  this.state.musicval.push('Karaoke')
                              }
                              else
                              {
                                  this.setState({
                                    karaoke: false
                                  })
                                   var index = this.state.musicval.indexOf('Karaoke')
                                  this.state.musicval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.karaoke }
                         rightText= 'Karaoke' /> 

                </View>
            </View>              
            <Text style={styles.music}>Mood</Text>
              <View style={{flexDirection: 'row'}}>
              <View style={{flex:1,marginLeft: 5,marginTop: 10}}>
              <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.upscale == false )
                              {
                                  this.setState({
                                    upscale: true
                                  })
                                  this.state.moodval.push('Upscale')
                              }
                              else
                              {
                                  this.setState({
                                    upscale: false
                                  })
                                  var index = this.state.moodval.indexOf('Upscale')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.upscale }
                         rightText= 'Upscale' /> 
                <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.social == false )
                              {
                                  this.setState({
                                    social: true
                                  })
                                  this.state.moodval.push('Social')
                              }
                              else
                              {
                                  this.setState({
                                    social: false
                                  })
                                  var index = this.state.moodval.indexOf('Social')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.social }
                         rightText= 'Social' /> 
                <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.laid == false )
                              {
                                  this.setState({
                                    laid: true
                                  })
                                  this.state.moodval.push('Laid Back')
                              }
                              else
                              {
                                  this.setState({
                                    laid: false
                                  })
                                  var index = this.state.moodval.indexOf('Laid Back')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.laid }
                         rightText= 'Laid Back' /> 
                </View>
               <View style={{position:'absolute',marginLeft: 140, marginTop: 10 }}>
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.chill == false )
                              {
                                  this.setState({
                                    chill: true
                                  })
                                  this.state.moodval.push('Chill')
                              }
                              else
                              {
                                  this.setState({
                                    chill: false
                                  })
                                  var index = this.state.moodval.indexOf('Chill')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.chill }
                         rightText= 'Chill' /> 
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.high == false )
                              {
                                  this.setState({
                                    high: true
                                  })
                                  this.state.moodval.push('High Energy')
                              }
                              else
                              {
                                  this.setState({
                                    high: false
                                  })
                                  var index = this.state.moodval.indexOf('High Energy')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.high }
                         rightText= 'High Energy' /> 
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.hybrid == false )
                              {
                                  this.setState({
                                    hybrid: true
                                  })
                                  this.state.moodval.push('Hybrid')
                              }
                              else
                              {
                                  this.setState({
                                    hybrid: false
                                  })
                                  var index = this.state.moodval.indexOf('Hybrid')
                                  this.state.moodval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.hybrid }
                         rightText= 'Hybrid' /> 
               </View>
            </View>   
            <Text style={styles.music}>Crowd</Text>  
             <View style={{flexDirection: 'row'}}>
              <View style={{flex:1,marginLeft: 5,marginTop: 10}}>
              <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.vip == false )
                              {
                                  this.setState({
                                    vip: true
                                  })
                                  this.state.crowdval.push('VIP')
                              }
                              else
                              {
                                  this.setState({
                                    vip: false
                                  })
                                  var index = this.state.crowdval.indexOf('VIP')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.vip }
                         rightText= 'VIP' /> 
                <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.Professional == false )
                              {
                                  this.setState({
                                    Professional: true
                                  })
                                  this.state.crowdval.push('Professional')
                              }
                              else
                              {
                                  this.setState({
                                    Professional: false
                                  })
                                  var index = this.state.crowdval.indexOf('Professional')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.Professional }
                         rightText= 'Professional' /> 
                <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.mature == false )
                              {
                                  this.setState({
                                    mature: true
                                  })
                                  this.state.crowdval.push('Mature')
                              }
                              else
                              {
                                  this.setState({
                                    mature: false
                                  })
                                  var index = this.state.crowdval.indexOf('Mature')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.mature }
                         rightText= 'Mature' /> 
                </View>
               <View style={{position:'absolute',marginLeft: 140, marginTop: 10 }}>
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.college == false )
                              {
                                  this.setState({
                                    college: true
                                  })
                                  this.state.crowdval.push('College')
                              }
                              else
                              {
                                  this.setState({
                                    college: false
                                  })
                                  var index = this.state.crowdval.indexOf('College')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.college }
                         rightText= 'College' /> 
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.urban == false )
                              {
                                  this.setState({
                                    urban: true
                                  })
                                  this.state.crowdval.push('Urban')
                              }
                              else
                              {
                                  this.setState({
                                    urban: false
                                  })
                                  var index = this.state.crowdval.indexOf('Urban')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.urban }
                         rightText= 'Urban' /> 
                    <CheckBox
                         style={{paddingLeft: 5, paddingBottom: 10}}
                         onClick={()=> {
                              if ( this.state.international == false )
                              {
                                  this.setState({
                                    international: true
                                  })
                                  this.state.crowdval.push('International')                                   
                              }
                              else
                              {
                                  this.setState({
                                    international: false
                                  })
                                  var index = this.state.crowdval.indexOf('International')
                                  this.state.crowdval.splice(index, 1)
                              } 
                          } }
                         isChecked= { this.state.international }
                         rightText= 'International' /> 
               </View>
            </View>   
                        
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.state.params.name == 'ER' ? this.state.musicval.length == 0 || this.state.moodval.length == 0 || this.state.crowdval.length == 0 ? Alert.alert('HyypeMeter','Please select atleast one preference from Music, Mood and Crowd'): navigate('SignUPER',{ music: this.state.musicval.toString(), mood: this.state.moodval.toString() , crowd: this.state.crowdval.toString() }) : this.state.musicval.length == 0 || this.state.moodval.length == 0 || this.state.crowdval.length == 0 ? Alert.alert('HyypeMeter','Please select atleast one Preference from Music, Mood and Crowd'): navigate('SignUPStarter',{ music: this.state.musicval.toString(), mood: this.state.moodval.toString() , crowd: this.state.crowdval.toString() })} >
              <Text style={styles.logintext}> Sign Up </Text>
           </TouchableOpacity>  
           <Text></Text>  
           </ScrollView>       
      </View>      
    );
  }  
 
  }

const titleConfig = {
  title: 'How Do You Hyype',
  tintColor: '#FFFFFF'
};

const rightButtonConfig = {
  title: 'Next',
  tintColor: '#FFFFFF',  
  handler: () => alert('hello!'),
};

class UserModel extends Component {
    constructor(props){
      super(props);
      this.state = {
          userType: null,
          musicval: null,
          moodval: null,
          crowdval: null,  
      }       
    }    

}

class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: this.props.options[0],               
    };
  }
  updateActiveOption = (activeOption) => {
    this.setState({
      activeOption,                  
    });
  };
  render() {
    return (
      <View
        style={{          
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 10,
          marginLeft: 5,          
        }}
      >      
        {this.props.options.map((option, index) => (
          <TouchableOpacity key= {index}
            onPress={() => {
              this.props.onChange(option);
              this.updateActiveOption(option);
            }} >          
              
            <Text style={{              
                width: Dimensions.get('window').width / 2 - 3,                
                height: 50,
                paddingLeft: 10,                
                fontSize: responsiveFontSize(2),                   
                color: this.state.activeOption === option ? 'black' : '#A4A4A4',
              }} > 
              <Image source={this.state.activeOption === option ? check : circle}
                     style={styles.checkIcon} />
            {option} 
            </Text> 
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }, 
  image: {
    flex: 1,  
    width: null,
    height: null
  },
  imageContainer: {
    flex: 1,
    margin: 50,
    flexDirection: "column",
    alignItems: "stretch"    
  },
  imgshadow: {    
    width:55,
    height: 55       
  },
  checkIcon: {
   width: Platform.OS == 'ios' ? 25 : 80,
   height: Platform.OS == 'ios' ? 25 : 80,
   marginTop: Platform.OS == 'ios' ? 8 : 0,   
  },
  navBar: {
    
  },
  music: {
    color: '#ffa802',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10
  },
  musicoptions: {
    fontSize: responsiveFontSize(2),
    color: '#A4A4A4',
    marginLeft: 12,  
    marginTop: 10,            
  },
  musicoptions1: {    
    fontSize: responsiveFontSize(2),
    color: '#A4A4A4',    
    marginLeft:  Dimensions.get('window').width / 2,
    marginTop: 10,      
  },
  contentContainer: {    
  },
  imgCircle: {    
    width: 25,
    height: 25,        
    bottom: 0,
    left : 5, 
    flex: 2   
  },
   imgCircle1: {   
    width: 25,
    height: 25,              
    bottom: 0,
    left: 145, 
    flex: 2   
  },
  spacingCSS: {        
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row', 
    marginTop: 10,
    flex: 2   
  }, 
  spacingCSS1: {    
    marginLeft: 10,
    marginTop: 10,
    width: Dimensions.get('window').width / 2,
    flex: 2
  }, 
  button: {   
    flex: 2, 
    borderColor: '#FFA802',
    borderWidth: 2.5,
    borderRadius: 40,    
    height:45,
    backgroundColor: '#FFA802', 
    marginTop: 15, 
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

PrefencePage.defaultProps = {};

PrefencePage.propTypes = {};
