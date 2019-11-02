import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class ListItem extends Component {
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <View style={{flex : 1}}>
                <TouchableOpacity style={{marginTop: 10}}>
                  <View style = {{backgroundColor: 'red'}}
                      >
                          <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginLeft: '5%'}}>
                                <Text style = {{color: 'white'}}>{this.props.item}</Text>
                                <Text style = {{color: 'white'}}>{this.props.quantity}</Text>
                          </View>

                  </View>
              </TouchableOpacity>
            </View>
        );
    }
}
