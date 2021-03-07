import React, {Component} from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import logData from '../data/logData.js';


var screen = Dimensions.get('window');

export default class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newGame: '',
            newDate: '',
        }
    }
    
    showAddModal = () => {
        this.refs.myModal.open();
    }

    generateKey = (numberofCharacters) => {
        return require('random-string')({length: numberofCharacters});
    }

    render() {
        return(
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280
                }}
                position='center'
                backdrop={true}
                // onClosed={() => {
                //     alert("Entry Added");
                // }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight:'bold',
                    textAlign: 'center',
                    marginTop: 40,
                }}>New Entry</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom:10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({newGame: text})}
                    placeholder="What game did you play?"
                    value={this.state.newGame}
                />
                <TextInput
                    style={{
                        height: 40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom:10,
                        borderBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({newDate: text})}
                    placeholder="When did you play?"
                    value={this.state.newDate}
                />
                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: '#00B7C6'
                    }}  
                    onPress={() => {
                        if (this.state.newDate.length == 0 || this.state.newGame.length == 0) {
                            alert("You're missing some information");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newEntry = {
                            "id": newKey,
                            "game": this.state.newGame,
                            "date": this.state.newDate,
                            "length": 0,
                            "feeling": "happy",
                        };
                        logData.push(newEntry);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        // console.log(logData);
                        this.refs.myModal.close();
                    }}
                >
                    Save
                </Button>

            </Modal>
        )
    }
}