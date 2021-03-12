import React, { Component} from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput, DatePickerAndroid
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import logData from '../data/logData.js';
import { Fontisto } from '@expo/vector-icons';
import { recentSessionReccomendation } from '../screens/recommendation';
import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import { useState } from 'react';

var screen = Dimensions.get('window');

export default class LogSessionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            newGame: '',
            newDate: new Date(),
            newLength: 0,
            newFeeling: 'ok',
            mode: 'date',
            show: false,
        }
    }
    setGame = (game) => {
        this.state.newGame = game;
    }
    setTime = (time) =>{
        this.state.newLength = time;
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
    
    showModal = () => {
        this.refs.myModal.open();
    }

    generateKey = (numberofCharacters) => {
        return require('random-string')({length: numberofCharacters});
    }

    closeModal = () => {
        this.refs.myModal.close();
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
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight:'bold',
                    textAlign: 'center',
                    marginTop: 0,
                }}>How do you feel?</Text>
                <View style={{
                        height: 40,
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 10,
                        marginBottom:10,
                    }}>
                </View>
                <View style={{display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "2%"}}>
                    <Fontisto.Button name ="mad" backgroundColor="white" color = "red" onPress={() => this.handlePress('upset')}>upset</Fontisto.Button>
                    <Fontisto.Button name ="neutral" backgroundColor="white" color = "black" onPress={() => this.handlePress('ok')}>ok</Fontisto.Button>
                    <Fontisto.Button name ="smiley" backgroundColor="white" color = "lime" onPress={() => this.handlePress('happy')}>happy</Fontisto.Button>
                </View>
            </Modal>
        )
    }

    handlePress = (emotion) => {
        this.state.newFeeling= emotion;
        const newKey = this.generateKey(24);
        const newEntry = {
            "id": newKey,
            "game": this.state.newGame,
            "date": (this.state.newDate).toDateString(),
            "duration": this.state.newLength,
            "emotion": this.state.newFeeling,
        };
        logData.push(newEntry);

        // add to Firebase Firestore and update recommendation
        var user = firebase.auth().currentUser;
        firebase.firestore().collection('Users').doc(user.uid).update({
            logData : firebase.firestore.FieldValue.arrayUnion( newEntry )
          });

        recentSessionReccomendation();

        console.log(logData);
        this.state.newGame = "";
        this.state.newLength = 0;
        this.state.newDate = new Date();
        this.state.newFeeling = 'ok';
        Alert.alert('Session saved!');
        this.refs.myModal.close();
    }
}