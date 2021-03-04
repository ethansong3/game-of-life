import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase'

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

const firebaseConfig = {
  apiKey: "AIzaSyCs-wd6aoy3D8_qwxmKsQ01rrbzym0NNdM",
  authDomain: "game-of-life-278b0.firebaseapp.com",
  projectId: "game-of-life-278b0",
  storageBucket: "game-of-life-278b0.appspot.com",
  messagingSenderId: "348963765560",
  appId: "1:348963765560:web:574af962b80ce3063415cd",
  measurementId: "G-4L1EWPSGLR"
};

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
      <View style={styles.space}/>
      <AwesomeButtonCartman width={150} type="secondary" onPress={() => login({navigation}, 'davidlieu1@gmail.com', '111111')}>
          dev
      </AwesomeButtonCartman>
    </View>
  )
}

function login({navigation},user,pw){
  firebase.auth().signInWithEmailAndPassword(user, pw)
  .then((userCredential) => { 
    // Signed in
    USER_INFO = userCredential.user;
    console.log("logged in");
    navigation.navigate("Home");
    console.log(USER_INFO);
    // ...
  })
  .catch((error) => {
    Alert.alert(
      error.code, 
      error.message,
    );
  });
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
  