import React, { Component } from 'react';
import {createStore} from 'redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  ScrollView,
  WebView,
  Easing,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';

var rightUnCheck = require('HyypeMeter/Resources/SignUp/GreenRightUnCheck.png');
var circle = require('HyypeMeter/Resources/Preferences/Uncheck.png');
var check = require('HyypeMeter/Resources/Preferences/check.png');
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
var live = require('HyypeMeter/Resources/Home/Live.png');
var home = require('HyypeMeter/Resources/Home/home.png');
var signout = require('HyypeMeter/Resources/Home/signout.png');


var arrControls = [];
var arrBottomControls = [];
var arrShowAll = [];
var arrSeperator = [];
var arrside = [];

import FirebaseClient from 'HyypeMeter/HyypeMeter_Screens/Firebase/firebase';
import Drawer from 'HyypeMeter/HyypeMeter_Screens/Drawer';
import * as firebase from "firebase";
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
import CheckBox from 'react-native-check-box';
import keys from 'HyypeMeter/keys.json';
import Toast from 'react-native-easy-toast';

let togglemenu = null;

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    const arrAllBars = [];
    const arruser = [];

    this.state = {
      visible: false,
      arrAllBars,
      drawer : '',
      arruser,
      animating: true,
      usertype: '',
      userId: '',
      img: 'https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png',

    };
   }

  closeActivityIndicator = () => setTimeout(() => this.setState({
    animating: false }), 3000)

    componentDidMount() {
         this.getUserdata();
         this.closeActivityIndicator();

         togglemenu = this.toggle;
         const { navigate } = this.props.navigation;
         this.state.arrAllBars.splice(0, this.state.arrAllBars.length);

         setTimeout(() => {
         this.state.arrAllBars.forEach((value,index,arr) =>
         {
          if (index < 5)
          {
            arrControls.push(
              <View key = { index }>
                <TouchableOpacity style={styles.Topbutton} onPress={() => navigate('BarEvents', { barId: value.barId }) }>
                      <Text style={styles.Topbuttontext}> { value.barName } </Text>
                </TouchableOpacity>
              </View>
            )
            this.forceUpdate()
          }
          else if (index >= 5 && index < 7 ) {
              arrBottomControls.push(
              <View key = { index }>
                <TouchableOpacity style={styles.Bottombutton} onPress={() => navigate('BarEvents', { userId: value.userId, barId: value.barId }) }>
                      <Text style={styles.Bottombuttontext}> { value.barName } </Text>
                </TouchableOpacity>
              </View>
            )
            this.forceUpdate()
          }
        })
       }, 3000)

      setTimeout(() => {

        arrSeperator.push(
        <View key = { 0 }>
            <View style={styles.line}></View>
       </View>
       )

       }, 3000)

       setTimeout(() => {
          arrShowAll.push(
            <View key = { 0 }>
                <TouchableOpacity onPress={() => navigate('ShowAllBar')}>
                    <Text style={styles.ShowAllbtn}> SHOW ALL </Text>
                </TouchableOpacity>
           </View>
           )
       }, 3000)
    }

    toggle() {
        this.drawer.openLeftDrawer();
    }

    static navigationOptions = ({ navigation, screenProps }) => ({
      title: "HYYPEMETER Says",
      headerStyle: { backgroundColor: '#0091ff' },
      headerTitleStyle: { color: '#FFFFFF', width : 180},
      headerLeft: (
        <View>
          <TouchableOpacity onPress={() => { togglemenu() } }>
            <Image source= {sidemenu} style={{marginLeft: 10,width: 25,height: 25 }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: (
         <TouchableOpacity>
           <Image source= {live} style={{marginRight: 5,width: 50,height: 30 }} />
         </TouchableOpacity>
      )
    });

   getUserdata()
   {
      AsyncStorage.getItem('userId', (err, result) =>
      {
        if (result != null) {
         this.setState( { userId : result.toString() } );         
         this.state.arruser.splice(0, this.state.arruser.length);
         Database.getImageUrl(result.toString(),(flag) => { this.setState({ arruser: flag }) });
        }
      });

      AsyncStorage.getItem('usertype', (err, result) =>
      {
          this.setState({
            usertype: result.toString()
          });
      });
   }

    render() {
         const animating = this.state.animating;        

         Database.getAllBars((flag) => { this.state.arrAllBars = flag } )

         var leftDrawerContent =
         (
          <View style={styles.drawerContent}>
           <View style={styles.leftTop}>
                    <View>
                    <Image source={{uri: this.state.arruser.length == 0 ? 'https://cdn.woorkup.com/wp-content/uploads/2016/04/gravatar.png' : this.state.arruser[0].img }} style={{width: 60 ,height: 60,marginLeft: 10, borderRadius: 30}}/>
                    </View>
                    <View style= {{position: 'absolute', marginLeft: 75 }}>
                        <Text> {this.state.arruser.length == 0 ? '' : this.state.arruser[0].fname + ' ' + this.state.arruser[0].lname} </Text>
                    </View>
           </View>
              <View style={styles.leftBottom}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeScreenPage') }>
                      <Text style={{padding: 5}}> Home </Text>
                </TouchableOpacity>
                { this.state.usertype == 'STARTER' ? <TouchableOpacity onPress={() => this.props.navigation.navigate('MyBars') }>
                      <Text style={{padding: 5}}> My Bars </Text>
                </TouchableOpacity> : null
                }                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('') }>
                      <Text style={{padding: 5}}> Profile </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('') }>
                      <Text style={{padding: 5}}> Settings </Text>
                </TouchableOpacity>

                 <TouchableOpacity onPress={() => this.props.navigation.navigate('HomePage') }>
                      <Text style={{padding: 5}}> SignOut </Text>
                </TouchableOpacity>
              </View>
            
           </View>
         );

        return (

            <Drawer
                ref={(comp) => {this.drawer = comp;}}
                style={styles.container}
                drawerWidth={200}
                leftDrawerContent={leftDrawerContent}
                type={Drawer.types.Overlay}
                drawerWidth={200}
                disabled={this.state.disabled}
                drawerPosition={Drawer.positions.Left}
                easingFunc={Easing.ease}
            >
            <View style={styles.container}>
                  <TextInput
                        style={styles.inputStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Search" placeholderTextColor= '#999999' />
                    <ScrollView>
                           <Text style={{ color: '#0091ff',fontSize: 15,fontWeight: 'bold',marginLeft: 13, marginBottom: 10 }}>HYYPE Five</Text>
                                { arrControls }
                                { arrSeperator }
                                { arrBottomControls }
                                { arrShowAll }
                                <ActivityIndicator
                                 animating = {animating}
                                 color = '#0091ff'
                                 size = "large"
                                 style = {styles.activityIndicator}/>
                    </ScrollView>
            </View>
            </Drawer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    item: {
        flexDirection: 'row',
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: '#ececec',
        marginTop: 12,
        width: Dimensions.get('window').width,
        marginBottom: 3
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80,
      marginBottom: 50
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
    marginTop:10,
    backgroundColor: '#fafafa'
   },
   Topbutton: {
    borderColor: '#FFA802',
    borderWidth: 2.5,
    borderRadius: 40,
    height: 37,
    backgroundColor: '#FFA802',
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    padding: 7,
  },
  Topbuttontext: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlignVertical: "center",
    textAlign: "left",
    fontWeight: '100'
  },
  Bottombutton: {
    borderColor: '#ececec',
    borderWidth: 1.0,
    borderRadius: 40,
    height: 37,
    backgroundColor: '#FFFFFF',
    marginTop: 7,
    marginLeft: 10,
    marginRight: 10,
    padding: 9,
  },
  Bottombuttontext: {
    fontSize: 14,
    color: '#000000',
    textAlignVertical: "center",
    textAlign: "left",
    fontWeight: '100'
  },
  ShowAllbtn: {
    color: '#ababab',
    fontSize: 12,
    textAlign: 'center',
    marginTop:15
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftTop: {
    flexDirection: 'row',
    width: 200,
    height: 100,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#8ad8dd'
  },
  leftBottom: {
    width: 200,
    height: 420,
    alignSelf: 'stretch',
    backgroundColor: '#f0f0f0'
  }
})
