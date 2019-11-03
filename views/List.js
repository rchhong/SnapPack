import React , {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#F3D250', 
		alignItems: 'center',      
		justifyContent: 'center', 
		height: 100, 
		borderRadius: 15,
		marginBottom: 30,
        elevation: 30,
        fontFamily : 'Quicksand-Regular',
	},
	listText:{
		color: '#424242',
        fontSize: 25,
        fontFamily : 'Quicksand-Regular'
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

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view : false
        }
    } 
    
    handleView()
    {
        //console.log(this.props.data);
        this.setState({view: !this.state.view})

    }
    handleDelete()
    {
        this.deleteData();
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
    handleEdit()
    {
        let textTitle = this.props.data.title;
        let textNotes = this.props.data.note;
        //console.log(this.props.data);
        this.props.navigation.navigate('EditList', {textTitle, textNotes});
        this.handleView();
    }
    handleCamera()
    {
        let textTitle = this.props.data.title;
        let textNotes = this.props.data.note;
        this.props.navigation.navigate('Camera',  {textTitle, textNotes});
    }
    render()
    {
        return (
            <TouchableOpacity onPress={this.handleView.bind(this)}>
                <View style = {styles.listItem}>
                    {
                    this.state.view ? 
                    <View style={{flex: 1, flexDirection : 'row'}}>
                        <TouchableOpacity style={{width: '25%'}} onPress={this.handleView.bind(this)}>
                            <View style = {[styles.listOption,styles.leftMost]}
                            >
                                <Text style = {{color: 'white'}}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '25%'}} onPress={this.handleCamera.bind(this)}>
                            <View style = {styles.listOption}
                            >
                                <Image style = {{width:'28%', height: '23%'}}
							source = {require('../android/app/src/main/assets/imgs/camera.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '25%'}} onPress={this.handleEdit.bind(this)}>
                            <View style = {styles.listOption}
                            >
                                <Image style = {{width:'28%', height: '22%'}}
							source = {require('../android/app/src/main/assets/imgs/pencil.png')}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: '25%'}} onPress={this.handleDelete.bind(this)}>
                            <View style = {[styles.listOption,styles.rightMost]}
                            >
                                <Image style = {{width:'25%', height: '20%'}}
							source = {require('../android/app/src/main/assets/imgs/trash.png')}/>
                            
                            </View>
                        </TouchableOpacity>
                    </View>

                    : 
                    <Text style = {styles.listText}>{this.props.title}</Text>
                    }
                </View>
            </TouchableOpacity>
        );
    }

}
