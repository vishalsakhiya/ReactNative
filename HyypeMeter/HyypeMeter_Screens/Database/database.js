import React, { Component } from 'react';
import * as firebase from "firebase";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,  
  Dimensions,
  TextInput,
  Alert,
  AsyncStorage,
  Button 
} from 'react-native';


export default class Database extends Component {

  static saveER(createdate,emaildata,passworddata,firstnamedata,lastnamedata,usernamedata,locationamedata,birthdaydata,musicPreferences,moodPreferences,crowdPreferences,uploadurl,callback) {

         let tblpath = "/tbl_users/";                
         var myRef = firebase.database().ref().push();  
         AsyncStorage.setItem('userId', myRef.key);
         AsyncStorage.setItem('usertype', 'ER'); 


         callback(true);    
             
         return firebase.database().ref(tblpath).child(myRef.key).set({
            user_Id: myRef.key,
            user_createdTimeStamp: createdate,
            user_updatedTimeStamp: createdate,
            user_email: emaildata,
            user_password: passworddata,
            user_firstName: firstnamedata,
            user_lastName: lastnamedata,            
            user_location: locationamedata,
            user_birthdate: birthdaydata,
            user_imageUrl: uploadurl,            
            user_clubs: '',
            user_deviceToken: '',
            user_notificationFrom: '',
            user_notifyTo: '',
            user_isNotify: '',
            user_platform: '',            
            user_payment: '',
            user_type: 'ER',
            user_checkedIn_events: '',
            user_friends: '',
            user_suggested_feeds: '',
            user_preferences: { music: musicPreferences,
               mood: moodPreferences,
               crowd: crowdPreferences
            },            
        })       
    } 

   static saveStarter(createdate,emaildata,passworddata,address,firstnamedata,lastnamedata,musicPreferences,moodPreferences,crowdPreferences,uploadurl,callback) {

         let tblpath = "/tbl_users/";        
         var myRef = firebase.database().ref().push();
         AsyncStorage.setItem('userId', myRef.key);
         AsyncStorage.setItem('usertype', 'STARTER');
        

         callback(true);  
         return firebase.database().ref(tblpath).child(myRef.key).set({
            user_Id: myRef.key,
            user_createdTimeStamp: createdate,
            user_updatedTimeStamp: createdate,
            user_email: emaildata,
            user_password: passworddata,
            user_firstName: firstnamedata,
            user_lastName: lastnamedata,
            user_location: '',
            user_imageUrl: uploadurl,
            user_clubs: '',
            user_deviceToken: '',
            user_notificationFrom: '',
            user_notifyTo: '',
            user_isNotify: '',
            user_platform: '',            
            user_payment: '',
            user_type: 'STARTER',
            user_checkedIn_events: '',
            user_friends: '',
            user_suggested_feeds: '',
            user_preferences: { music: musicPreferences,
               mood: moodPreferences,
               crowd: crowdPreferences
            },
        })        
    }
   
    static setBardata(createdTimeStamp,userId,barName,barAddress,openTime,closeTime,barCapacity,uploadurl,callback) 
    {
        let barPath = "/tbl_bars/";        
        var myRef = firebase.database().ref().push();    
        
        callback(true); 
        return firebase.database().ref(barPath).child(myRef.key).set({
            bar_createdTimeStamp: createdTimeStamp,
            bar_updatedTimeStamp: createdTimeStamp, 
            bar_Id: myRef.key,
            user_Id: userId,
            bar_name: barName,
            bar_address: barAddress,
            bar_openTime: openTime,
            bar_closeTime: closeTime,
            bar_imageUrl: uploadurl,                        
            bar_capacity: barCapacity,
            bar_ranking: '',
            bar_hyype: {},                     
            bar_checkedIn: '',
            bar_isLive: true     
        })        
    }  
    static updateBardata(barId,eventnamelen, eventdate, atmosphere, restrictions, tickettype,ticketprice, availableticket, isFreeEvent,iswithBcost,isHyypeFive,callback)
    {
        let bar_pat = "/tbl_bars/";
        var myRef = firebase.database().ref().push();         
        var adaNameRef = firebase.database().ref('/tbl_bars/' + barId  + '/bar_hyype/');
        adaNameRef.update({  [myRef.key]:{ event_Id: myRef.key,
                                             event_Name: eventnamelen,
                                             event_Date: eventdate,
                                             event_atmosphere: atmosphere,
                                             restriction: restrictions,
                                             tickets_type: tickettype,
                                             tickets_prices: ticketprice,                                             
                                             available_ticktes: availableticket,
                                             add_option: {
                                                isFreeEvent: isFreeEvent,
                                                iswithBcost: iswithBcost,
                                                isHyypeFive: isHyypeFive
                                             },
                                           }
                                       
                         });
        callback(true);
    }

    static getUserData(username,password,callback)
    {
        let tblpath = "/tbl_users/";
        var isInvalid = 0;
        firebase.database().ref(tblpath).on('value', (snapshot) => {
            if (snapshot.val())
            {                
                 var items = [];
                      snapshot.forEach((child) => {
                        items.push({
                          email: child.val().user_email,
                          pwd: child.val().user_password,
                          usertype: child.val().user_type,
                          userID: child.val().user_Id
                        });
                 });   
                 for(var i = 0; i < items.length; i++)
                 {
                    if ( username == items[i].email && password == items[i].pwd)
                    {  
                        AsyncStorage.setItem('username', items[i].email);                          
                        AsyncStorage.setItem('userId', items[i].userID);                         
                        AsyncStorage.setItem('pwd', items[i].pwd);  
                        AsyncStorage.setItem('usertype', items[i].usertype);                                                 
                        callback(true); 
                        isInvalid = 1;                                                 
                    }
                 }  

                 if (isInvalid != 1)
                 {
                    Alert.alert('Invalid Username or Password!');
                 }                  
            }
            else
            {
                Alert.alert('You first need to SignUp, in order to SignIn');
            }
        });
    }

     static getuserPreferences(userId,callback)
    {
        let tblpath = "/tbl_users/" + userId.toString();
        let ref = firebase.database().ref(tblpath);
        ref.once('value', (snapshot) => {
            if (snapshot.val())
            {
                callback(snapshot.val().user_preferences);
            }
        });
    }

    static getAllBars(callback)
    {
        let tblpath = "/tbl_bars/";
        firebase.database().ref(tblpath).on('value', (snapshot) => {
            if (snapshot.val())
            {                
                 var items = [];
                      snapshot.forEach((child) => {
                        items.push({
                          barId: child.val().bar_Id,
                          barName: child.val().bar_name,
                          userId: child.val().user_Id
                          });                    
                      });  
                 callback(items);
            }
            else
            {
                Alert.alert('You first need to SignUp, in order to SignIn');
            }
        });
    }

    static getbarDetails(barId,callback)
    {
        let tblpath = "/tbl_bars/" + barId + "/bar_hyype/";
        let ref = firebase.database().ref(tblpath);       
        var items = [];
        var barData = [];        

        firebase.database().ref(tblpath).on('value', (snapshot) => {
            if (snapshot.val())
            {   
                snapshot.forEach((child) => {                     
                       
                       items.push({                          
                          eventId: child.val().event_Id,
                          eventName: child.val().event_Name, 
                        });                        
                });             
                callback(items);  
            }
            else
            {
                // Alert.alert('You first need to SignUp, in order to SignIn');
            }
        });
    }
    
    static getBardata(barId,eventid,callback)
    {
        let tblpath = "/tbl_bars/" ;
        let ref = firebase.database().ref(tblpath);       
        var items = [];
        var barData = [];        

        firebase.database().ref(tblpath).on('value', (snapshot) => {
            if (snapshot.val())
            {   
                snapshot.forEach((child) => {                     
                     if (child.val().bar_Id == barId)
                     {   
                       items.push({                          
                          barId: child.val().bar_Id,
                          barName: child.val().bar_name, 
                          barAddress: child.val().bar_address,
                          useId: child.val().user_Id,
                        }); 
                     }
                }); 
                callback(items);  
            }
            else
            {
                // Alert.alert('You first need to SignUp, in order to SignIn');
            }
        });
    }

    static getCheckInData(userId,callback)
    {
        let tblpath = "/tbl_users/" + userId + "/user_preferences/";        
        var items = [];

        firebase.database().ref(tblpath).on('value', (snapshot) => {

          snapshot.forEach((child) => {           
            
                  items.push({
                      music: chlild.val().music,
                      crowd: child.val().crowd,
                      mood: child.val().mood
                  });                  
          });

        });
        callback(items);
    }

    static getBarOfUser(userId,callback)
    {
        let tblpath = "/tbl_bars/";
        var items = [];
        var barData = [];

        firebase.database().ref(tblpath).on('value', (snapshot) => {
            if (snapshot.val())
            {                
                snapshot.forEach((child) => {
                        items.push({
                          barId: child.val().bar_Id,
                          barName: child.val().bar_name,
                          userID: child.val().user_Id
                        });
                 }); 

                for(var i = 0; i < items.length;i++)
                 {
                    if ( userId == items[i].userID )
                    {  
                        barData.push({
                          barId: items[i].barId,
                          barName: items[i].barName,
                          userID: items[i].userID
                        });
                    }
                 }      
                  callback(barData);      

            }
            else
            {
                // Alert.alert('You first need to SignUp, in order to SignIn');
            }
        });
    }

    static getImageUrl(userId,callback)
    {
      let tblpath = "/tbl_users/";
      var items = [];
      var userdata = [];

      firebase.database().ref(tblpath).on('value', (snapshot) => {
          if (snapshot.val())
          {
              snapshot.forEach((child) => {   
                  items.push({                                            
                      img: child.val().user_imageUrl,
                      userID: child.val().user_Id,
                      fname: child.val().user_firstName,
                      lname: child.val().user_lastName,
                  });
                
                 for(var i = 0; i < items.length;i++)
                 {
                    if ( userId == items[i].userID )
                    {   
                       userdata.push({
                          userID: items[i].userID,
                          fname: items[i].fname,
                          lname: items[i].lname,
                          img: items[i].img
                        });
                        callback(userdata);               
                    }
                 }                                                          
                   
              }); 
          }
      });  
    }
    static getBarImageUrl(barId,callback)
    {
      let tblpath = "/tbl_bars/";
      var items = [];
      var userdata = [];

      firebase.database().ref(tblpath).on('value', (snapshot) => {
          if (snapshot.val())
          {
              snapshot.forEach((child) => {   
                  items.push({                                            
                      img: child.val().bar_imageUrl,
                      barId: child.val().bar_Id,
                  });
                
                 for(var i = 0; i < items.length;i++)
                 {
                    if ( barId == items[i].barId )
                    {   
                        callback(items[i].img);               
                    }
                 }                                                          
                   
              }); 
          }
      });  
    }
}

module.exports = Database;
