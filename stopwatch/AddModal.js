import React, { useState, Component} from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput, DatePickerAndroid
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import logData from '../data/logData.js';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Fontisto } from '@expo/vector-icons';

var screen = Dimensions.get('window');



export default class AddModal extends Component {

    constructor(props) {
        super(props);
        // const [date, setDate] = new Date();
        this.state = {
            newGame: '',
            newDate: new Date(),
            newLength: 0,
            newFeeling: 'ok',
            mode: 'date',
            show: false,
        }
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.newDate;
        this.state.show = Platform.OS === 'ios';
        this.state.newDate = currentDate;
    };
    
    showMode = (currentMode) => {
        this.state.show = true;
        this.state.mode = currentMode;
    };
    
    showDatepicker = () => {
        this.showMode('date');
    };
    
    showTimepicker = () => {
        this.showMode('time');
    };
    
    showAddModal = () => {
        this.refs.myModal.open();
    }

    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ newLength: newText });
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
                    height: 400
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
                    marginTop: 0,
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
                        marginTop: 10,
                        marginBottom:10,
                        borderBottomWidth: 1
                    }}
                    keyboardType="number-pad"
                    onChangeText={(text) => this.onChanged(text)}
                    placeholder="How many hours did you play for?"
                    value={this.state.newLength}
                    maxLength={2}
                />

                <View style={{
                        height: 40,
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom:10,
                    }}>
                    <View>
                        <Button onPress={this.showDatepicker()} title="Show date picker!" />
                    </View>
                    {/* <View>
                        <Button onPress={this.showTimepicker()} title="Show time picker!" />
                    </View> */}
                    {this.state.show && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={this.state.newDate}
                        mode={this.state.mode}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                        />
                    )}
                </View>

                <View style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                    <Fontisto.Button name ="mad" backgroundColor="white" color = "red" onPress={() => this.state.newFeeling='upset'}>upset</Fontisto.Button>
                    <Fontisto.Button name ="neutral" backgroundColor="white" color = "black" onPress={() => this.state.newFeeling='ok'}>ok</Fontisto.Button>
                    <Fontisto.Button name ="smiley" backgroundColor="white" color = "lime" onPress={() => this.state.newFeeling='happy'}>happy</Fontisto.Button>
                </View>

                <Button
                    style={{ fontSize: 18, color: 'white' }}
                    containerStyle={{
                        padding: 8,
                        marginLeft: 70,
                        marginRight: 70,
                        marginTop: 20,
                        height: 40,
                        borderRadius: 6,
                        backgroundColor: '#00B7C6'
                    }}  
                    onPress={() => {
                        if (this.state.newLength.length == 0 || this.state.newGame.length == 0) {
                            alert("You're missing some information");
                            return;
                        }
                        const newKey = this.generateKey(24);
                        const newEntry = {
                            "id": newKey,
                            "game": this.state.newGame,
                            "date": (this.state.newDate).toDateString(),
                            "length": this.state.newLength,
                            "feeling": this.state.newFeeling,
                        };
                        logData.push(newEntry);
                        this.props.parentFlatList.refreshFlatList(newKey);
                        console.log(logData);
                        this.state.newGame = "";
                        this.state.newLength = 0;
                        this.state.newDate = new Date();
                        this.state.newFeeling = 'ok';
                        this.refs.myModal.close();
                    }}
                >
                    Save
                </Button>

            </Modal>
        )
    }
}