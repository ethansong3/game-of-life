import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

export default function HomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Game of Life</Text>
      <Text>(this is the home screen)</Text>
      <Button title="go to log"
      onPress={() => navigation.navigate('Log')} />
      <Button title="print user info to console"
      onPress={() => test()} />
    </View>
  )
}

function test(){
  console.log("test pressed.");
  var user = firebase.auth().currentUser;
  console.log(user);
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DCD0FF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });
  