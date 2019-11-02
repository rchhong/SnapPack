import React, {Component} from 'react';
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

export default class EditListScreen extends Component {
    constructor(props)
    {
        super(props);
    }

    render() {
      return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
            <View style={{flex: 1, backgroundColor: "#FFFF00"}}>
              <Text style={{fontSize: 50, textAlign: "center"}}>
                      PackSnap
                  </Text>
            </View>
          </SafeAreaView>
        </>
      );

    }
}