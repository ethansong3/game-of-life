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
    <Image source={images.backgroundLight} style={styles.backgroundImage}/>
    <SafeAreaView style = {styles.blank}></SafeAreaView>
      <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                            height={windowHeight/18} width={windowWidth/4}>
        Sign Out
      </AwesomeButtonRick>
      <Text style={[styles.headerText, {color: "#19a629"}]}>Let's make an account!</Text>
      <AwesomeButtonRick placeholder size="large" backgroundColor="white" borderColor="#95d44a" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
      </AwesomeButtonRick>
      <AwesomeButtonRick placeholder size="large" backgroundColor="white" borderColor="#95d44a" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
      </AwesomeButtonRick>
      <AwesomeButtonRick type = "anchor" size = "large">
      </AwesomeButtonRick>
      <SafeAreaView style = {{height: '30%'}}></SafeAreaView>
    </SafeAreaView>
  )
}

function signup({navigation}, user,pw,name){
  firebase.auth().createUserWithEmailAndPassword(user, pw)
  .then((userCredential) => {
    // Signed in
    var USER_INFO = userCredential.user;
    navigation.navigate("Home");

    // add to Firestore
    return firebase.firestore().collection('Users').doc(USER_INFO.uid)
    .set({
      name: name,
      email: user
    })
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
