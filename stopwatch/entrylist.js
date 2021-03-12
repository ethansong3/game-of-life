import React, { Component } from 'react';
import { AppRegistry, useWindowDimensions, FlatList, StyleSheet, Text, View, Image, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import AddModal from './AddModal';
// import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import logData from "../data/logData.js"
import styles from '../screens/style';
import images from '../screens/images';
import { Fontisto } from '@expo/vector-icons';

var dict = {
  "happy": "smiley",
  "ok": "neutral",
  "angry": "mad"
}

class FlatListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeRowKey: null
        };

    }

    render() {

        const swipeSettings = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if(this.state.activeRowKey != null) {
                    this.setState({ activeRowKey: null });
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({ activeRowKey: this.props.item.key });
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowKey;
                        Alert.alert(
                            'Alert',
                            'Are you sure you want to delete ?',
                            [
                              {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                              {text: 'Yes', onPress: () => {
                                logData.splice(this.props.index, 1);
                                //Refresh FlatList !
                                this.props.parentFlatList.refreshFlatList(deletingRow);
                              }},
                            ],
                            { cancelable: true }
                          );
                    },
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
            backgroundColor: 'transparent'
        };

        return (
            <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',
                alignItems: 'center',
                backgroundColor: 'transparent',
                marginVertical: 5
                }}>
                    <AwesomeButtonRick placeholder disabled = {true} height={100} width={350} flex={1} flexDirection={'column'} alignItems={'stretch'} backgroundColor="#FAFAFA" borderColor="#a3e3c4" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
                        <Fontisto.Button name = {dict[this.props.item.feeling]} paddingLeft = {0} size = {40} height = {60} width = {80} disabled = {true} backgroundColor="transparent"color = "#53b56b"></Fontisto.Button>
                        <View>
                        <Text style={[styles.primaryButtonText, {color: "#53b56b"}]}>{this.props.item.date} </Text>
                        <Text style={[styles.primaryButtonText, {color: "#53b56b"}]}>{this.props.item.game} </Text>
                        <Text style={[styles.primaryButtonText, {color: "#53b56b"}]}>{this.props.item.length} </Text>
                        </View>
                    </AwesomeButtonRick>
                </View>
            </Swipeout>
        );
    }
}

function getEmotion(feeling)
{
  console.log(feeling);
  return dict[feeling];
}

export default class BasicFlatList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            deletedRowKey: null,
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    refreshFlatList = (activeKey) => {
        this.setState((prevState) => {
            return {
                deletedRowKey: activeKey
            };
        });

    }

    _onPressAdd(){
        // alert("You add Item.");
        this.refs.addModal.showAddModal();
    }

    render() {
      return (
        <View style={{flex: 1, marginTop: 10}}>
            <AwesomeButtonRick marginTop={10} type = "anchor" style={[styles.signOutButton, {position:'absolute'}, {top: 5}, {right: 10}]} onPress={() => this._onPressAdd()}
                height={30} width={110}>
                New Session
            </AwesomeButtonRick>
            <View style={{height: 85}}/>
            <FlatList
                data={logData}
                renderItem={({item, index})=>{
                    //console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
                    return (
                    <FlatListItem item={item} index={index} parentFlatList={this}>

                    </FlatListItem>);
                }}
                >
            </FlatList>
            <AddModal ref={'addModal'} parentFlatList={this} >

            </AddModal>
        </View>
      );
    }
}
