import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import ListItem from './ListItem';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
	header: {
		color: '#ECECEC',
		fontSize: 50, 
		textAlign: "center",
		marginTop: 25,
	},
});

export default class EditListScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('textTitle', ""),
    };
  };

    constructor(props)
    {
        super(props);
        this.state = {
          textTitle: "",
          textNotes: "",
          view: false,
          opacity: 1.0,
          valueItem: "",
          valueQuantity: "",
          data: [],
        };
    }
    
    handleChangeText(type, text) {
      this.setState({["value" + type] : text});
    }

    handleSubmit()
    {
      this.setState({
        data : [...this.state.data, {item: this.state.valueItem, quantity: Number(this.state.valueQuantity)}]
      });
      this.setState({
        valueItem: "",
        valueQuantity: "",
      });
      this.handleOnTouch();
      // let {textTitle, textNotes} = this.state;
      // console.log(textTitle + " ", textNotes);
      // this.props.navigation.navigate('EditList', {textTitle, textNotes});
    }

    componentDidMount() {
      let textTitle = JSON.stringify(this.props.navigation.getParam('textTitle', ""));
      let textNotes = JSON.stringify(this.props.navigation.getParam('textNotes', ""));
      //console.log(textTitle + " " + textNotes);
      this.setState({textTitle, textNotes}, () => {this.getData(textTitle)});
      //console.log(data);
    }

    handleOnTouch()
    {
      let newOpacity = this.state.view ? 1.0 : .5
      this.setState({
        view: !this.state.view,
        opacity: newOpacity,
      });
    }

    handleFinishList()
    {
      this.storeData();
    }

    async getData(key) {
      try {
        let retrivedData = await AsyncStorage.getItem("@"+key);
        let processed = await JSON.parse(retrivedData);
        console.log(processed);
        this.setState({data: processed.data})
      }
      catch(e) {
        console.log(e)
      }
    }

    async storeData() {
      //console.log(this.state);
      let fullItem = {note: this.state.textNotes, data : this.state.data};
      // console.log(fullItem);
      // let parsed = JSON.stringify(fullItem);
      // console.log(parsed);
      // console.log(JSON.parse(parsed));
      try {
        await AsyncStorage.setItem("@" + this.state.textTitle, JSON.stringify(fullItem));
      }
      catch(e) {
        console.log(e);
      }
    }
    render() {
      //console.log(this.state);
      return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
            <View style={{flex: 1, backgroundColor: "#FFFF00", alignItems: 'center', opacity: this.state.opacity}}>
              <FlatList 
                style={{width: '80%'}}
                data={this.state.data}
                renderItem={({item, index}) => (
                  <ListItem key={index} item={item.item} quantity={item.quantity} />
                )}
              />
              <TouchableOpacity onPress={this.handleOnTouch.bind(this)}>
                <View style = {{backgroundColor: 'red', alignItems: 'center', 
                                justifyContent: 'center', width: 50, height: 50, borderRadius: 200, marginBottom: 15}}
                    >
                    <Text style = {{color: 'white'}}>Add</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleFinishList.bind(this)}>
                <View style = {{backgroundColor: 'red', alignItems: 'center', 
                                justifyContent: 'center', width: 50, height: 50, borderRadius: 200, marginBottom: 15}}
                    >
                    <Text style = {{color: 'white'}}>Add</Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.state.view && 
                <View style={{position: "absolute", height: "33%", width: '100%', bottom: 0, backgroundColor: '#FFFFFF'}}>
                    <TouchableOpacity style={{}}>
                      <View>
                          <TextInput placeholder="Item" onChangeText={this.handleChangeText.bind(this, "Item")} value={this.state.text} />
                          <TextInput placeholder="Quantity" keyboardType="numeric" onChangeText={this.handleChangeText.bind(this, "Quantity")} value={this.state.text} />
                          <View style={{flexDirection: "row", justifyContent: 'space-between', width: '60%', marginLeft: '20%'}}>
                            <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={{}}>
                              <View style={{
                                backgroundColor: 'red', alignItems: 'center',
                                justifyContent: 'center', width: 100, height: 50
                              }}
                              >
                                <Text style={{ color: 'white' }}>Submit</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                              <View style={{
                                backgroundColor: 'red', alignItems: 'center',
                                justifyContent: 'center', width: 100, height: 50
                              }}
                              >
                                <Text style={{ color: 'white' }}>Cancel</Text>
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