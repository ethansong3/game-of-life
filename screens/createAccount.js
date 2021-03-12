import React, { useRef, Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, SafeAreaView, View, Button, TextInput, Alert, Image } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";
import { useState } from 'react';
import styles from './style';
import images from './images';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
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

export default function createAccountScreen({navigation}){
  const [user_text, setUser_text] = useState('');
  const [pw_text, setPw_text] = useState('');
  const [user_name, setName_text] = useState('');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  return (
    <SafeAreaView style={styles.background}>
    <Image source={images.backgroundGreen} style={[styles.backgroundImage, {backgroundColor: "#C7FEFF"}]}/>
    <SafeAreaView style = {styles.blank}></SafeAreaView>
      <AwesomeButtonRick style={{position:'absolute', left:windowWidth/2,bottom:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Survey')}
                            height={windowHeight/18} width={windowWidth/3}>
        skip to survey screen
      </AwesomeButtonRick>
      <AwesomeButtonRick style={styles.signOutButton} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                            height={30} width={80}>
        Back
      </AwesomeButtonRick>
      <Text style={[styles.headerText, {color: "#2e84b1"}]}>Let's make an account!</Text>
      <Text style = {[styles.headerSubText, {color: "#23a190"}]}>We'll start with some basic requests.</Text>
      <AwesomeButtonRick placeholder size="large" disabled = {true} backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "Name"
          onChangeText={user_name => setName_text(user_name)}
          autoFocus={false}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()}
          blurOnSubmit={false}
        />
      </AwesomeButtonRick>
      <AwesomeButtonRick placeholder size="large" disabled = {true} backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "Email"
          onChangeText={user_text => setUser_text(user_text)}
          autoFocus={false}
          returnKeyType="next"
          ref={ref_input2}
          onSubmitEditing={() => ref_input3.current.focus()}
          blurOnSubmit={false}
        />
      </AwesomeButtonRick>
      <AwesomeButtonRick placeholder size="large" disabled = {true} backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "Password"
          secureTextEntry={true}
          onChangeText={pw_text => setPw_text(pw_text)}
          ref={ref_input3}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </AwesomeButtonRick>
      <AwesomeButtonRick type = "anchor" size = "large" disabled = {!canSignUp({navigation}, user_text, pw_text, user_name)} onPress = {() => signup({navigation}, user_text, pw_text, user_name)}>
        <Text style = {styles.anchorButtonText}>Next</Text>
      </AwesomeButtonRick>
      <SafeAreaView style = {{height: '20%'}}></SafeAreaView>
    </SafeAreaView>
  )
}

function canSignUp({navigation}, user, pw, name){
  if (user == "" || pw == "" || name == "") return false;
  return true;
}

function signup({navigation}, user,pw,name){
  firebase.auth().createUserWithEmailAndPassword(user, pw)
  .then((userCredential) => {
    // Signed in
    var USER_INFO = userCredential.user;
    navigation.navigate("Survey");

    // add to Firestore
    return firebase.firestore().collection('Users').doc(USER_INFO.uid)
    .set({
      name: name,
      email: user,
    })
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // Check error messages and give something more human-friendly
    if (errorCode == "auth/invalid-email") createAlert("Invalid Info", "That email doesn't appear to be correctly formatted.");
    else if (errorCode == "auth/invalid-password") createAlert("Invalid Info", "Your password must be at least 6 characters.");
    else if (errorCode == "auth/email-already-exists") createAlert("Invalid Info", "Something went wrong. Try again!");
    createAlert(errorCode, errorMessage);
  });
}

function createAlert(errorCode = '',errorMessage){
  return Alert.alert(
    errorCode,
    errorMessage
  );
}
