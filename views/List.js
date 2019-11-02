import React , {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export default class List extends Component {

    constructor(props) {
        super(props);
    } 

    render()
    {
        return (
            <TouchableOpacity style={{width: '80%', marginLeft: '10%'}}>
                <View style = {{backgroundColor: 'red', alignItems: 'center', 
                                justifyContent: 'center', height: 100, borderRadius: 15}}
                    >
                    <Text style = {{color: 'white'}}>Button</Text>
                </View>
            </TouchableOpacity>
        );
    }

}
