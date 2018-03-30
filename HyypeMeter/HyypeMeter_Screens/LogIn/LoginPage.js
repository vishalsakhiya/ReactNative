import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import SideMenuPage from 'HyypeMeter/HyypeMeter_Screens/LogIn/Menu.js';
const background = require('HyypeMeter/Resources/SignUp/SignUpBG.png');
import NavigationBar from 'react-native-navbar';
var sidemenu = require('HyypeMeter/Resources/SignUp/sidemenu.png');
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
  TouchableOpacity
} from 'react-native';
var open = false ;

let togglemenu = null;

export default class LoginPage extends Component {
 constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',    
    };
  }
  
  componentDidMount() {
    togglemenu = this.toggle;    
  }

  toggle() {
     this.setState({
      isOpen: !this.state.isOpen,      
    });   


  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
      bgcolor1: '#0091ff'
    });

static navigationOptions =
    { 
      title:'Hyype File', 
      headerStyle: { backgroundColor: '#0091ff' },      
      headerTitleStyle: { color: '#FFFFFF', width : 180},
       headerLeft: (
              <TouchableOpacity onPress={() => togglemenu()}>
                <Image source= {sidemenu} style={{marginLeft: 10,width: 25,height: 25 }} />
              </TouchableOpacity>
            )
    };


  render() {
    const { navigate } = this.props.navigation;
    const menu = <SideMenuPage onItemSelected={this.onMenuItemSelected} />;
   
    return (
      <SideMenu 
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>          
        </View>
      </SideMenu>
    );
  }
}

const titleConfig = {
  title: 'How Do You Hyype',
  tintColor: '#FFFFFF'
};

const rightButtonConfig = {
  title: 'Next',
  tintColor: '#FFFFFF'
};

const styles = StyleSheet.create({
  navBar:{
    flexDirection: 'row',
  },
  container: {    
    flex: 1,                                                              
    backgroundColor: 'white',   
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width, 
  },
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
