import React, { Component } from 'react';
import { Button ,Alert} from 'react-native';

export default class Child extends Component {

    calc(){
       this.props.navigation.state.params.callback();     
  	}

    render(){
        return (<Button onPress={() => this.calc()} title="Calc" />)
    }
}