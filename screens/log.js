import React, {Component} from 'react';
import { ImageBackground, TouchableOpacity, SafeAreaView, useWindowDimensions, StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import FlatListItem from '../stopwatch/entrylist.js';
import style from './style';
import images from './images';
import logData from '../data/logData.js';

function Item({ id, game, date, length, feeling }){

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const handlePress = (id) => {
    const entry = logData.find((entr) => {
      return entr.id === id;
    });

    Alert.alert(
      "Entry Details",
      `Game : ${entry.game} \n Date: ${entry.date} \n Length: ${entry.length} \n Feeling: ${entry.feeling}`,
    );

  };

  return(
    <TouchableOpacity style={styles.listItem}>
      <AwesomeButtonRick  onPress={() => handlePress(id)} placeholder type="secondary" height={windowHeight/10} width={windowWidth/1.1}>
        <Text style={styles.listDate}>{game}</Text>
        <Text style={styles.listDate}>{date}</Text>
        <Text style={styles.listDetails}>{length}</Text>
        <Text style={styles.listDetails}>{feeling}</Text>
      </AwesomeButtonRick>
    </TouchableOpacity>
  )
}

export default function LogScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <SafeAreaView style={[style.background, {backgroundColor: "#e4f2ee"}]}>
        <AwesomeButtonRick style={style.signOutButton} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')} height={30} width={80}>
          Back
        </AwesomeButtonRick>
        <FlatListItem></FlatListItem>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  space: {
    height:50,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem:{
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginVertical: 2,
    padding: 8,
    justifyContent: 'center',
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
