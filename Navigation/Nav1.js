import { createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Welcome from '../Components/Welcome';
import Home from '../Components/Home';
import Bluetooth from '../Components/Bluetooth'

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
      headerShown : false
    }
  },
  Bluetooth : {
    screen : Bluetooth,
    navigationOptions : {
      headerShown : false
    }
  }
})

const NavigatorLogIn = createAppContainer(Nav1)

export default NavigatorLogIn;
