import React , {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './views/HomeScreen'
import EditListScreen from './views/EditListScreen';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions : {
      header: null
    }
  },
  EditList: {
    title: "Edit List",
    screen: EditListScreen,
  }
});

export default createAppContainer(AppNavigator)
