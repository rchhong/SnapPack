import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

import ListItem from './ListItem';
import AsyncStorage from '@react-native-community/async-storage';


const styles = StyleSheet.create({
	yellow: {
		backgroundColor: '#F3D250', 
	},
	lightBlue: {
		backgroundColor: '#90CCF4', 
	},
	darkBlue: {
		backgroundColor: '#5DA2D5',
	},
	offWhite:{
		color: '#ECECEC',
	},
	gray: {
		color: '#424242',
	},

	header: {
		color: '#ECECEC',
		fontSize: 70,
		textAlign: "center",
		marginTop: 35,
		fontFamily : 'Quicksand-Regular'
	},

	options:{
		alignItems: 'center', 
        justifyContent: 'center', 
		width: 80, 
		height: 80, 
		borderRadius: 320,
		marginBottom:20,
	},
	optionsText: {
		fontSize: 18,
		fontWeight:'bold',
		fontFamily : 'Quicksand-Regular'
	},

	addElemOptions: {
		alignItems: 'center',
		justifyContent: 'center', 
		width: 120, 
		height: 40,
		borderRadius: 15,
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
      if(this.state.data.length === 0)
      {
        this.setState({
          data : [{item: this.state.valueItem, quantity: Number(this.state.valueQuantity)}]
        });
      }
      else
      {
        this.setState({
          data : [...this.state.data, {item: this.state.valueItem, quantity: Number(this.state.valueQuantity)}]
        });
      }

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

        //console.log('werewqrewqrewqrewqerwqrewqrewqrewqr', processed);
        if(processed !== null) this.setState({data: processed.data})
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

    removeIndex(item)
    {
      let {data} = this.state;
      let index = 0;
      for(let i = 0; i < data.length; i++)
      {
        if(item === data[i].item)
        {
          index = i;
          break;
        }
      }
      data.splice(index, 1);
      this.setState({data});
    }

    render() {
      //console.log(this.state);
      return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
            <View style={{flex: 1, backgroundColor: "#F78888", alignItems: 'center', opacity: this.state.opacity}}>
              <FlatList 
                style={{width: '80%'}}
                data={this.state.data}
                renderItem={({item, index}) => (
                  <ListItem update={(item) => {this.removeIndex(item)}} key={index} item={item.item} seen={true}/>
                )}
                keyExtractor ={(item, index) => index.toString()}
              />
              <TouchableOpacity onPress={this.handleOnTouch.bind(this)}>
                <View style = {[styles.options,styles.lightBlue]}
                    >
                    <Image style = {{width:styles.options.width-30,height:styles.options.height-30}}
							source = {require('../android/app/src/main/assets/imgs/plus.png')}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.handleFinishList.bind(this)}>
              <View style = {[styles.options,styles.darkBlue]}>
                    <Text style = {[styles.optionsText,styles.offWhite]}>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.state.view && 
                <View style={{position: "absolute", height: "33%", width: '100%', bottom: 0, backgroundColor: '#FFFFFF'}}>
                    <TouchableOpacity style={{}}>
                      <View>
                          <TextInput placeholder="Item" onChangeText={this.handleChangeText.bind(this, "Item")} value={this.state.text} />
                          <View style={{flexDirection: "row", justifyContent: 'space-between', width: '60%', marginLeft: '20%'}}>
                            <TouchableOpacity onPress={this.handleSubmit.bind(this)} style={{}}>
                            <View style={[styles.addElemOptions,styles.darkBlue]}
                              >
                                <Text style={{color:'white',}}>Submit</Text>
                              </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.handleOnTouch.bind(this)} style={{}}>
                            <View style={[styles.addElemOptions,styles.yellow]}
                              >
                                <Text style={styles.gray}>Cancel</Text>
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