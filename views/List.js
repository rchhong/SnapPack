import React , {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#F3D250', 
		alignItems: 'center',      
		justifyContent: 'center', 
		height: 100, 
		borderRadius: 15,
		marginBottom: 30,
        elevation: 30,
        fontFamily : 'Quicksand-Regular'
	},
	listText:{
		color: '#424242',
        fontSize: 25,
        fontFamily : 'Quicksand-Regular'
	}

});

export default class List extends Component {

    constructor(props) {
        super(props);
    } 

    render()
    {
        return (
            <TouchableOpacity style={{width: '70%', marginLeft: '15%'}}>
                <View style = {styles.listItem}>
                    <Text style = {styles.listText}>Button</Text>
                </View>
            </TouchableOpacity>
        );
    }

}
