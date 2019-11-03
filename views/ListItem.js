import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';


const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#F3D250', 
		alignItems: 'center',      
		justifyContent: 'center', 
		height: 50, 
		borderRadius: 15,
		marginBottom: 30,
        elevation: 10,
        fontFamily : 'Quicksand-Regular'
	},
	listText:{
		color: '#424242',
        fontSize: 18,
        fontFamily : 'Quicksand-Regular',

    },
    listOption: {
        backgroundColor: '#5DA2D5',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%'
    },
    leftMost:{
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15
    },
    rightMost:{
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15
    }
	
});

export default class ListItem extends Component {
    constructor(props)
    {
        super(props);
        console.log(this.props)
        let color = this.props.seen ? '#424242' : '#FF0000'
        this.state = {
            color,
            view: false
        }
    }

    handleView()
    {
        //console.log(this.props.data);
        this.setState({view: !this.state.view})

    }

    handleDelete()
    {
        this.props.update(this.props.item);
    }

    async deleteData()
    {
        try {
            const asdf = await AsyncStorage.getAllKeys();
            //console.log(asdf);
            let qwer = "@" + this.props.data.title;
            //console.log(asdf[0] === qwer)
            await AsyncStorage.removeItem("@\"" + this.props.data.title + "\"");
            this.props.update();
        }
        catch(e) {
            console.log(e);
        }
    }
    render()
    {
        return (
            <View style={{flex : 1}}>
                <TouchableOpacity style={{marginTop: 10}} onPress={this.handleView.bind(this)}>
                <View style = {styles.listItem} >
                        {
                        !this.state.view ?
                        <Text style = {styles.listText, {color : this.state.color}}>{this.props.item}</Text> :
                        <View style={{flex: 1, flexDirection : 'row'}}>
                            <TouchableOpacity style={{width: '50%'}} onPress={this.handleView.bind(this)}>
                                <View style = {[styles.listOption,styles.leftMost]}
                                >
                                    <Text style = {{color: '#424242'}}>Cancel</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width: '50%'}} onPress={this.handleDelete.bind(this)}>
                                <View style = {[styles.listOption,styles.rightMost]}
                                >
                                    <Image style = {{width:'12%', height: '35%'}}
                                source = {require('../android/app/src/main/assets/imgs/trash.png')}/>
                                
                                </View>
                            </TouchableOpacity>
                        </View>
                        
                    }
                  </View>
              </TouchableOpacity>
            </View>
        );
    }
}
