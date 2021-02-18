import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

export default function WelcomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View style={styles.space}/>
      <View style={styles.space}/>
      <AwesomeButtonCartman width={150} type="secondary" onPress={() => navigation.navigate('Sign In')}>
          Sign In
      </AwesomeButtonCartman>
      <View style={styles.space}/>
      <AwesomeButtonCartman width={150} type="secondary" onPress={() => navigation.navigate('Create Account')}>
          Register
      </AwesomeButtonCartman>
    </View>
  )
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
    },
    space: {
        height:10,
    },
  });
  