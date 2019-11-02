import React , {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';

import List from './views/List'
// const AppNavigator = createStackNavigator({

// });

// export default createAppContainer(AppNavigator)

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex : 1, backgroundColor : "#FF9999"}}>
          <View style={{flex: 2, justifyContent: "space-between"}}>
            <Text style={{fontSize: 50, textAlign: "center"}}>
              PackSnap
            </Text>
            <List />
            <List />
          </View>
          <View style={{flex: 1}}>

          </View>
        </SafeAreaView>
      </>
    );
  }
}
