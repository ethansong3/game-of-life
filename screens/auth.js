import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";
import { useState } from 'react';
import { Assets } from '@react-navigation/stack';

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

export default function AuthScreen({navigation}){
  const [user_text, setUser_text] = useState('');
  const [pw_text, setPw_text] = useState('');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={styles.container}>
      <Image 
      style={{width:250, height:100}}
      source={require('../assets/tempIcon.png')}
      />
      <View style={styles.space}/>
      <AwesomeButtonCartman placeholder height={windowHeight/13} width={windowWidth/1.25}>
        <TextInput style={{ marginLeft: 50, height: windowHeight/20, width: windowWidth/1.25}}
          placeholder = "Email"
          onChangeText={user_text => setUser_text(user_text)}
        />
      </AwesomeButtonCartman>
      <View style={styles.space}/>
      <AwesomeButtonCartman placeholder height={windowHeight/13} width={windowWidth/1.25}>
        <TextInput style={{ marginLeft: 50, height: windowHeight/20, width: windowWidth/1.25}}
          placeholder = "Password"
          onChangeText={user_text => setUser_text(user_text)}
          secureTextEntry={true}
          onChangeText={pw_text => setPw_text(pw_text)}
        />
      </AwesomeButtonCartman>
      <View style={styles.space}/><View style={styles.space}/>
      <View style={styles.fixToText}>
        <AwesomeButtonCartman width={150} type="secondary" onPress={() => login({navigation}, user_text, pw_text)}>
            Log In
        </AwesomeButtonCartman>
        <View style={styles.space}/>
        <AwesomeButtonCartman width={150} type="secondary" onPress={() => createAlert("Need Help?", "Well you don't get any.")}>
            Need Help?
        </AwesomeButtonCartman>      
      </View>
    </View>
  );
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
    var errorCode = error.code;
    var errorMessage = error.message;
    createAlert(errorCode, errorMessage);
  });
}

function createAlert(errorCode = '',errorMessage){
  return Alert.alert(
    errorCode,
    errorMessage
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fixToText: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    space: {
      height:10,
    },

  });