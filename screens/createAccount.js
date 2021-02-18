import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";
import { useState } from 'react';

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
  return (
    <View style={styles.container}>
      <Text>Game of Life</Text>
      <TextInput style={{ height: windowHeight/20, width: windowWidth/1.25, borderColor: 'black', borderWidth: 1.5}}
      placeholder = "Name"
      onChangeText={user_name => setName_text(user_name)}
      />
      <Text/>
      <TextInput style={{ height: windowHeight/20, width: windowWidth/1.25, borderColor: 'black', borderWidth: 1.5}}
      placeholder = "Email"
      onChangeText={user_text => setUser_text(user_text)}
      />
      <Text/>
      <TextInput style={{ height: windowHeight/20, width: windowWidth/1.25, borderColor: 'black', borderWidth: 1.5}}
      placeholder = "Password"
      secureTextEntry={true}
      onChangeText={pw_text => setPw_text(pw_text)}
      />
      
      <View style={styles.fixToText}>      
        <Button title="Create Account"
        onPress={() => signup({navigation}, user_text, pw_text, user_name)} />
      </View>
    </View>
  )
}

function signup({navigation}, user,pw,name){
  firebase.auth().createUserWithEmailAndPassword(user, pw)
  .then((userCredential) => {
    // Signed in 
    USER_INFO = userCredential.user;
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
