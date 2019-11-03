import React , {Component} from 'react';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList
} from 'react-native';

import List from './List'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

const styles = StyleSheet.create({

	header: {
		color: '#ECECEC',
		fontSize: 70,
		textAlign: "center",
    marginTop: 35,
    fontFamily : 'Quicksand-Regular'
	},
	addList:{
		backgroundColor: '#90CCF4', 
		alignItems: 'center', 
        justifyContent: 'center', 
		width: 100, 
		height: 100, 
    borderRadius: 400
    
	},
	addListText: {
		color: 'white',
		fontSize: 80,
    fontWeight:'bold',
    fontFamily : 'Quicksand-Regular'
	},

	confirmButton: {
		backgroundColor: '#5DA2D5', 
		alignItems: 'center',
		justifyContent: 'center', 
		width: 120, 
		height: 40,
		borderRadius: 15,
	},
	cancelButton: {
		backgroundColor: '#F3D250', 
		alignItems: 'center',
		justifyContent: 'center', 
		width: 120, 
		height: 40,
		borderRadius:15
	}

});

export default class HomeScreen extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      view: false,
      opacity: 1.0,
      textTitle: "",
      textNotes: "",
      data : []
    }
  }

  componentDidMount() {
    //this.clear();
    this.getAllData();
    
  }

  async getAllData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);
      let data =[];
      console.log(items);
      for(let i = 0; i < items.length; i++)
      {
        let foo = JSON.parse(items[i][1]);
        //console.log(foo)
        data[i] = {title: items[i][0].replace(/[^\w+]/gm, ""), ...foo};
      }
      //console.log(data[0].data);
      this.setState({data});
    }
    catch(e)
    {
      console.log(e);
    }
  }

  handleOnTouch() {
    let newOpacity = this.state.view ? 1.0 : .5
    this.setState({
      view: !this.state.view,
      opacity: newOpacity,
    });
  }

  handleChangeText(type, text) {
    this.setState({["text" + type] : text});
  }

  handleSubmit()
  {
    let {textTitle, textNotes} = this.state;
    //console.log(textTitle + " ", textNotes);
    this.props.navigation.push('EditList', {textTitle, textNotes});
  }

  onLoad(payload)
  {
    console.log("entered scene");
    console.log(payload)
    this.getAllData();
  }

  onLeave(payload)
  {
    console.log("exited scene");
    this.setState({
      view: false,
      opacity: 1.0,
      textTitle: "",
      textNotes: "",
      data : []
    })
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
          <NavigationEvents
            onDidFocus={payload => this.onLoad(payload)}
            onWillBlur={payload => this.onLeave(payload)}
          />
          <View style={{flex: 1, backgroundColor: "#F78888", opacity: this.state.opacity}}>
            <View style={{flex: 2, justifyContent: "space-between"}}>
              <Text style={styles.header}>
                PackSnap
              </Text>
              <FlatList 
                style={{width: '70%', marginLeft: '15%'}}
                data={this.state.data}
                renderItem={({item, index}) => (
                  <List update={() => this.getAllData()} navigation={this.props.navigation} title={item.title} data={item} />
                )}
                keyExtractor ={(item, index) => index.toString()}
              />
            </View>
            <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
            <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                  <View style = {styles.addList}>
                      <Text style = {styles.addListText}>+</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          {this.state.view && 
            <View style={{position: "absolute", height: "33%", width: '100%', bottom: 0, backgroundColor: '#FFFFFF'}}>
                <TouchableOpacity style={{}}>
                  <View>
                      <TextInput placeholder="List Title" onChangeText={this.handleChangeText.bind(this, "Title")} value={this.state.text} />
                      <TextInput placeholder="Notes" onChangeText={this.handleChangeText.bind(this, "Notes")} value={this.state.text} />
                      <View style={{flexDirection: "row", justifyContent: 'space-between', width: '70%', marginLeft: '15%'}}>
                        <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={{}}>
                          <View style={styles.confirmButton}>
                            <Text style={{ color: '#ECECEC', fontFamily : 'Quicksand-Regular'}}>Confirm</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                          <View style={styles.cancelButton}
                          >
                            <Text style={{ color: '#424242', fontFamily : 'Quicksand-Regular' }}>Cancel</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                  </View>
              </TouchableOpacity>
            </View>
          }
        </SafeAreaView>
      </>
    );
  }
}
