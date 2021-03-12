import React, { useState, Component} from 'react';
import {
    AppRegistry, FlatList, StyleSheet, Text, View, Image, Alert, Platform, TouchableHighlight, Dimensions, TextInput, DatePickerAndroid
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import gameList from '../data/gameList.js';

var screen = Dimensions.get('window');
export default class GameSelectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: '',
            show: false,
        }
        this.selectedGame = 'No game selected';
    }

    getGame = () => {return this.selectedGame;};

    clearGame = () => {this.selectedGame = 'No game selected';};
    
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
                }}>What game are you playing?</Text>
                <DropDownPicker
                    zIndex={5000}
                    items={gameList}
                    defaultValue={null}
                    placeholder="Select a game"
                    containerStyle={{alignSelf: 'center', height: 40, width:300}}
                    style={{ backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({
                        game: item.value
                    })
                    }
                />
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
                        if (this.state.game == '') {
                            alert("Please select a game.");
                            return;
                        }
                        this.selectedGame = this.state.game;
                        console.log(this.selectedGame);
                        this.state.game = '';
                        this.refs.myModal.close();
                    }}
                >
                    Save
                </Button>
            </Modal>
        )
    }
}