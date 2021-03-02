import React, {Component} from 'react';
import { TouchableOpacity, SafeAreaView, useWindowDimensions, StyleSheet, Text, View, Button, TextInput, FlatList, Alert } from 'react-native';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

/*

  TODO: implement deletion and addition of entries

*/

let Entries = [
  {
    id: 1,
    game: "League of Legends",
    date: "3/1/2021",
    length: 1,
    feeling: "angry"
  },
  {
    id: 2,
    game: "osu!",
    date: "2/23/2021",
    length: 1,
    feeling: "okay"
  },
  {
    id: 3,
    game: "Minecraft",
    date: "2/5/2021",
    length: 2,
    feeling: "happy"
  },
];

function Item({ id, game, date, length, feeling }){

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const handlePress = (id) => {
    const entry = Entries.find((entr) => {
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
      <AwesomeButtonCartman style={{position:'absolute', left:windowWidth/1.4,top:windowHeight/80}} onPress={() => navigation.navigate('New Entry')}
                            height={windowHeight/17} width={windowWidth/3.8}>
        New Session
      </AwesomeButtonCartman>
      <View style={styles.space}/>
      <FlatList 
        data={Entries} 
        renderItem={({item}) => (
          <Item id={item.id} game={item.game} date={item.date} length={item.length} feeling={item.feeling} />
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  space: {
    height:75,
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
    flex: 0.5,
    alignItems: "flex-end",
  }
});
