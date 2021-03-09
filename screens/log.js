import React, {Component} from 'react';
import { TouchableOpacity, SafeAreaView, useWindowDimensions, StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import FlatListItem from '../stopwatch/entrylist.js';

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
      <AwesomeButtonCartman  onPress={() => handlePress(id)} placeholder type="secondary" height={windowHeight/10} width={windowWidth/1.1}>
        <Text style={styles.listDate}>{game}</Text>
        <Text style={styles.listDate}>{date}</Text>
        <Text style={styles.listDetails}>{length}</Text>
        <Text style={styles.listDetails}>{feeling}</Text>
      </AwesomeButtonCartman>
    </TouchableOpacity>
  )
}

export default function LogScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={styles.container}>
      {/* <AwesomeButtonCartman style={{position:'absolute', left:windowWidth/1.4,top:windowHeight/80}} onPress={() => navigation.navigate('New Entry')}
                            height={windowHeight/15} width={windowWidth/3.8}>
        New Session
      </AwesomeButtonCartman> */}
      {/* <View style={styles.space}/>
      <FlatList
        keyExtractor={(item) => item.id}
        data={logData}
        renderItem={({item}) => (
          <Item id={item.id} game={item.game} date={item.date} length={item.length} feeling={item.feeling} />
        )} /> */}
        {/* <View style={styles.space}/> */}
        <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Home')}
                              height={windowHeight/18} width={windowWidth/4}>
          Back
        </AwesomeButtonRick>
        <FlatListItem></FlatListItem>
    </View>

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
