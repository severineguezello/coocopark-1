import React from 'react';
import {Image,StyleSheet,View} from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Welcome from '../Components/Welcome';
import Home from '../Components/Home';

const Nav1 = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerShown : false
    }
  },
  Home : {
    screen : Home,
    navigationOptions : {
      headerShown : true,
      headerBackground: (
        <View style={{alignItems:"center", justifyContent:'center'}}>
        <Image
          style={{marginTop:10}}
          source={require('../media/logo.png')}
        />
        </View>
      ),
    }
  }
})

const NavigatorLogIn = createAppContainer(Nav1)

export default NavigatorLogIn;
