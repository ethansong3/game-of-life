import React, { useRef, Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, SafeAreaView, Button, TextInput, Alert, Image } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";
import { useState } from 'react';
import { Assets } from '@react-navigation/stack';
import styles from './style';
import images from './images';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
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

  const ref_input2 = useRef();

  return (
    <SafeAreaView style = {styles.background}>
      <Image source={images.backgroundGreen} style={[styles.backgroundImage, {backgroundColor: "#C7FEFF"}]}/>
      <SafeAreaView style = {styles.blank}></SafeAreaView>
      <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                            height={windowHeight/18} width={windowWidth/4}>
        Back
      </AwesomeButtonRick>
      <Text style={[styles.headerText, {color: "#2e84b1"}]}>Nice to see you again!</Text>
      <Text style = {[styles.headerSubText, {color: "#23a190"}]}>Sign in to continue.</Text>
      <AwesomeButtonRick placeholder size="large" disabled = {true} backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "Email"
          onChangeText={user_name => setUser_text(user_name)}
          autoFocus={false}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()}
          blurOnSubmit={false}
        />
        </AwesomeButtonRick>
        <AwesomeButtonRick placeholder size="large" disabled = {true} backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
          <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
            placeholder = "Password"
            onChangeText={user_text => setUser_text(user_text)}
            secureTextEntry={true}
            onChangeText={pw_text => setPw_text(pw_text)}
            returnKeyType="done"
            blurOnSubmit={true}
            ref={ref_input2}
          />
        </AwesomeButtonRick>
        <AwesomeButtonRick type = "anchor" size = "large" disabled = {!canSignUp({navigation}, user_text, pw_text)} onPress={() => login({navigation}, user_text, pw_text)}>
          <Text style = {styles.anchorButtonText}>Log In</Text>
        </AwesomeButtonRick>
        <SafeAreaView style = {{height: '30%'}}></SafeAreaView>
    </SafeAreaView>
  );
}

function canSignUp({navigation}, user, pw){
  if (user == "" || pw == "") return false;
  return true;
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
    // Check error messages and give something more human-friendly
    if (errorCode == "auth/invalid-email" || errorCode == "auth/user-not-found" || errorCode == "auth/invalid-password") createAlert("Invalid Info", "You have entered an invalid email or password.");
    else createAlert(errorCode, errorMessage);
  });
}

function createAlert(errorCode = '',errorMessage){
  return Alert.alert(
    errorCode,
    errorMessage
  );
}
