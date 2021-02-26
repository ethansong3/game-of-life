import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

export default function HomeScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    
    <View style={styles.container}>
      

      <AwesomeButtonCartman style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/50}} onPress={() => navigation.navigate('Welcome')}
                            height={windowHeight/18} width={windowWidth/4}>
        Sign Out
      </AwesomeButtonCartman>
      <Text>Game of Life</Text>
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
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });
  