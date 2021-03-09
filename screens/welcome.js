import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Image, Text, SafeAreaView, Button, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';
import styles from './style';
import images from './images';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

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
    <SafeAreaView style={styles.background}>
      <Image source={images.background} style = {[styles.backgroundImage, {backgroundColor: '#0A5BA1'}]}/>
      <SafeAreaView style = {styles.blank}></SafeAreaView>
      <SafeAreaView style = {styles.header}>
        <Image style = {{width: 80, height: 80}} source={images.logo}/>
        <Text style = {styles.headerText}>Welcome!</Text>
        <Text style = {styles.headerSubText}> To see your log, sign in or create an account. </Text>
      </SafeAreaView>
      <AwesomeButtonRick type="anchor" size="large" onPress={() => navigation.navigate('Sign In')}>
        <Text style = {styles.anchorButtonText}>Sign In</Text>
      </AwesomeButtonRick>
      <AwesomeButtonRick type="primary" size="large" borderColor= '#76BDE3' borderWidth={2} onPress={() => navigation.navigate('Create Account')}>
        <Text style = {styles.primaryButtonText}>Create Account</Text>
      </AwesomeButtonRick>
      <AwesomeButtonRick type="primary" size="large" borderColor= '#76BDE3' borderWidth={2} onPress={() => login({navigation}, 'davidlieu1@gmail.com', '111111')}>
        <Text style = {styles.primaryButtonText}>Dev</Text>
      </AwesomeButtonRick>
      <SafeAreaView style = {{height: '20%'}}></SafeAreaView>
    </SafeAreaView>
  )
}

function login({navigation},user,pw){
  firebase.auth().signInWithEmailAndPassword(user, pw)
  .then((userCredential) => {
    // Signed in
    USER_INFO = userCredential.user;
    console.log("logged in");
    navigation.navigate("Home");
    // console.log(USER_INFO);
    // ...
  })
  .catch((error) => {
    Alert.alert(
      error.code,
      error.message,
    );
  });
}
