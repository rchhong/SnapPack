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
    
    handleClick()
    {
        console.log(this.props.data);
        let textTitle = this.props.data.title;
        let textNotes = this.props.data.note;
        this.props.navigation.navigate('EditList', {textTitle, textNotes});
    }
    render()
    {
        return (
            <TouchableOpacity onPress={this.handleClick.bind(this)}>
                <View style = {styles.listItem}>
                    <Text style = {styles.listText}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}
