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
		fontSize: 50,
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
          ready: false,
          results: [],
          data: [],
        };
    }


    componentDidMount() {
      let textTitle = this.props.navigation.getParam('textTitle', '');
      let textNotes = this.props.navigation.getParam('textNotes', '');
      let results = this.props.navigation.getParam('results');
      this.setState({results, textTitle})
      //console.log(textTitle + " " + textNotes);
      this.getData(textTitle);

      //console.log(textTitle);
      //console.log(this.props.navigation.getParam('results'));
    }

    async getData(key) {
      try {
        let retrivedData = await AsyncStorage.getItem("@"+key);
        let processed = await JSON.parse(retrivedData);
        //console.log(processed);
        this.setState({data: processed.data}, ()=>{this.processData()});
      }
      catch(e) {
        console.log(e)
      }
    }

    processData()
    {
        let data = this.state.data
        let results = this.state.results
        //console.log(data)
        //console.log(results)
        for(let i = 0; i < data.length; i++)
        {
            data[i].seen = false;
        }

        for(let i = 0; i < data.length; i++)
        {
            for(let j = 0; j < results.length; j++)
            {
                if(results[j] === data[i].item) 
                 {
                    data[i].seen = true;
                 }
            }
        }
        this.setState({data, results}, () => {this.setState({ready: true})})
    }



    render() {
      //console.log(this.state);
      return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex : 1, backgroundColor : "#000000"}}>
            <View style={{flex: 1, backgroundColor: "#F78888", alignItems: 'center'}}>
                {
                    this.state.ready ? <FlatList 
                    style={{width: '80%'}}
                    data={this.state.data}
                    renderItem={({item, index}) => (
                      <ListItem key={index} item={item.item} seen={item.seen}/>
                    )}
                    keyExtractor ={(item, index) => index.toString()}
                  /> : null
                }

            </View>
          </SafeAreaView>
        </>
      );

    }
}