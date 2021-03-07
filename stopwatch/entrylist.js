import React, { Component } from 'react';
import { AppRegistry, useWindowDimensions, FlatList, StyleSheet, Text, View, Image, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import AddModal from './AddModal';
// import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import logData from "../data/logData.js"
  
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
            backgroundColor: 'white' 
        };      

        return (  
            <Swipeout {...swipeSettings}>
                <View style={{
                flex: 1,
                flexDirection:'column',   
                alignItems: 'center',
                backgroundColor: 'white',
                marginVertical: 5                            
                }}>
                                 
                    <AwesomeButtonCartman placeholder type="secondary" height={100} width={350} flex={1} flexDirection={'column'} alignItems={'stretch'}>       
                        <Text style={styles.flatListItem}>{this.props.item.game}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.date}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.length}</Text>
                        <Text style={styles.flatListItem}>{this.props.item.feeling}</Text>
                    </AwesomeButtonCartman>             
                </View>   
            </Swipeout>            
        );
    }
}
const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 14,  
        alignItems: "flex-start",
    },
    listDate: {
      flex: 0.5,
      alignItems: "flex-start",
      left: 10
    },
    listDetails: {
      flex: 0.3,
      alignItems: "flex-end",
    }
});

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
            <AwesomeButtonCartman marginTop={10} style={{position:'absolute', top: 10, right: 10}} onPress={() => this._onPressAdd()}
                height={60} width={100}>
                New Session
            </AwesomeButtonCartman>
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