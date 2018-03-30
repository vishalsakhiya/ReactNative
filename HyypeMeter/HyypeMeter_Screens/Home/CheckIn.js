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
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
var back_button = require('HyypeMeter/Resources/SignUp/back_button.png');
import { NavigationActions } from 'react-navigation';
var defaultimg = require('HyypeMeter/Resources/Home/bar.jpg');
import Database from "HyypeMeter/HyypeMeter_Screens/Database/database";
var arrControls = [];
export default class CheckIn extends Component {
 
 constructor(props) {
    super(props);
    const arrBarData = [];   
    
    this.state = {
     arrBarData,     
   };

  }

 static navigationOptions = ({ navigation, screenProps }) => ({
  
      title:'Check In', 
      headerStyle: { backgroundColor: '#0091ff' },      
      headerTitleStyle: { color: '#FFFFFF', width : 180},
      headerLeft: (             
         <TouchableOpacity onPress={() => navigation.dispatch(NavigationActions.back({
                key: null
            }) ) } >
            <Image source= {back_button} style={{marginLeft: 10,width: 20,height: 20 }} />
          </TouchableOpacity>
      ),
  });

   componentDidMount() 
   {
        
   }

  render() {
    const { navigate } = this.props.navigation;
    var barid = this.props.navigation.state.params.barId;
    var eventid = this.props.navigation.state.params.eventId;

    Database.getBardata(barid,eventid,(flag)=> { this.state.arrBarData = flag });
        
        this.state.arrBarData.forEach((value,index,arr) =>
        {
           arrControls.push(
            <View key = {index}>
             <View style={styles.topView}>
              <Text style={styles.barName}>
                { value.barName }
              </Text>
              <Text style={styles.barAddress}>
                 { value.barAddress }
              </Text>
            </View>

            <ScrollView style={styles.scrollView}>
              <View style={styles.coverChargeView}>
                <Text style={styles.Title}>
                  COVER CHARGE
                </Text>
                <Text style={styles.Value}>
                    $20 - $30
                </Text>
              </View>

              <View style={styles.NextView}>
                <Text style={styles.Title}>
                  MUSIC
                </Text>
                <Text style={styles.Value}>
                    Afrobeat - Top 40
                </Text>
              </View>

              <View style={styles.NextView}>
                <Text style={styles.Title}>
                  MOOD
                </Text>
                <Text style={styles.Value}>
                  Upscale
                </Text>
              </View>

              <View style={styles.NextView}>
                <Text style={styles.Title}>
                  CROWD
                </Text>
                <Text style={styles.Value}>
                    VIP - International
                </Text>
              </View>

              <View style={styles.imgView}>
                <Image source= {defaultimg} style={styles.imgBar} />
              </View>

              <View style={styles.NextView}>
                <Text style={styles.Title}>
                  TICKET TYPE
                </Text>
                <Text style={styles.Value}>
                  Free - Gen
                </Text>
              </View>

              <View style={styles.NextView}>
                <Text style={styles.Title}>
                  NUMBER
                </Text>
                <Text style={styles.Value}>
                    1
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                  <View style={{flex:1, height: 30,marginTop: 5}}>
                        <Text style={{color: '#b4b4b4',fontSize: responsiveFontSize(2.8), fontWeight: '600', marginLeft: 14}}>TOTAL</Text>
                  </View>
                  <View style={{position:'absolute', right: 18,marginTop: 5}}>
                        <Text style={{color: '#FFA802',fontSize: responsiveFontSize(3.0), fontWeight: '400', marginLeft: 14}}>$20.0 + FEE</Text>
                  </View>
              </View>

              <TouchableOpacity style={styles.Checkoutbutton} onPress={() => navigate('Payment') } >
                <Text style={styles.Checkouttext}> Checkout </Text> 
              </TouchableOpacity> 

            </ScrollView>
            </View> 
           )

        });
  


    return (
      <View style={styles.container}>
        { arrControls }           
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  topView: {
    height: 100,
    width: Dimensions.get('window').width,
    backgroundColor: '#fafafa',  
    flexDirection: 'column'  
  },
  scrollView: {
     backgroundColor: 'white',
     marginBottom: 180
  },
  barName: {
    width: Dimensions.get('window').width,
    height: 38,
    color: 'black',
    fontSize: 33,
    marginLeft: 14,
    marginTop: 10,
    fontWeight: '200',
    fontFamily: 'Gill Sans'
  },
  barAddress: {
    width: Dimensions.get('window').width,
    height: 35,
    color: 'black',
    fontSize: 22,
    marginLeft: 14,
    marginTop: 12,
    fontWeight: '100',
    fontFamily: 'Gill Sans'
  },
  coverChargeView: {
    width: Dimensions.get('window').width,
    height: 50,
    marginLeft: 7,
    marginTop: 8,
    flexDirection: 'column' 
  },
  NextView: {
    width: Dimensions.get('window').width,
    height: 50,
    marginLeft: 7,
    flexDirection: 'column',
  },
  Title: {
    width: Dimensions.get('window').width,
    height: 20,
    color: '#b4b4b4',
    fontSize: responsiveFontSize(1.8),
    marginLeft: 7,
    marginTop: 5,
    fontWeight: 'normal',
  },
  Value: {
    width: Dimensions.get('window').width,
    height: 20,
    color: 'black',
    fontSize: responsiveFontSize(2.3),
    marginLeft: 7,
    marginTop: 2,
    fontWeight: '100',
    fontFamily: 'Gill Sans'
  },
   imgView: {
    width: Dimensions.get('window').width,
    height: 88,
    marginLeft: 7,
    flexDirection: 'column',
  },
  imgView: {
    width: Dimensions.get('window').width,
    height: 88,
    marginLeft: 7,
    flexDirection: 'column',
    marginBottom: 14
  },
  imgBar: {
    width: Dimensions.get('window').width - 28,
    height: 88,
    marginLeft: 7,
    marginTop: 5,
    borderRadius: 8,
    marginBottom: 14
  },
  Checkoutbutton: {   
    flex: 2, 
    borderColor: '#0091FF',
    borderWidth: 2.5,
    borderRadius: 40,    
    height:Platform.OS == 'ios' ? 40 : 55,
    backgroundColor: '#0091FF', 
    marginTop: 15, 
    marginLeft: 10,
    marginRight: 10,    
    padding: 10,
  }, 
  Checkouttext: {
    fontSize: 14.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlignVertical: "center",    
    paddingTop : Platform.OS == 'ios' ? 0 : 4,
    textAlign: "center" ,
    marginBottom: 2  
  },
});
