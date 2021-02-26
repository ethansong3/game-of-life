import React, { useRef, Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";
import { useState } from 'react';

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

export default function createAccountScreen({navigation}){
  const [user_text, setUser_text] = useState('');
  const [pw_text, setPw_text] = useState('');
  const [user_name, setName_text] = useState('');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  return (
    <View style={styles.container}>
      <Text>Here's some information we need to know.</Text>
      <View style={styles.space}/>
      <AwesomeButtonCartman placeholder height={windowHeight/13} width={windowWidth/1.25}>
        <TextInput style={{ marginLeft: 50, height: windowHeight/20, width: windowWidth/1.25}}
          placeholder = "Name"
          onChangeText={user_name => setName_text(user_name)}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()}
          blurOnSubmit={false}
        />
      </AwesomeButtonCartman>
      <View style={styles.space}/>
      <AwesomeButtonCartman placeholder height={windowHeight/13} width={windowWidth/1.25}>
        <TextInput style={{ marginLeft: 50, height: windowHeight/20, width: windowWidth/1.25}}
          placeholder = "Email"
          onChangeText={user_text => setUser_text(user_text)}
          returnKeyType="next"
          onSubmitEditing={() => ref_input3.current.focus()}
          ref={ref_input2}
          blurOnSubmit={false}
        />
      </AwesomeButtonCartman>
      <View style={styles.space}/>
      <AwesomeButtonCartman placeholder height={windowHeight/13} width={windowWidth/1.25}>
        <TextInput style={{ marginLeft: 50, height: windowHeight/20, width: windowWidth/1.25}}
          placeholder = "Password"
          secureTextEntry={true}
          onChangeText={pw_text => setPw_text(pw_text)}
          ref={ref_input3}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </AwesomeButtonCartman>

      <View style={styles.space}/><View style={styles.space}/>
      
      <View style={styles.fixToText}>    
        <AwesomeButtonCartman width={150} type="secondary" onPress={() => signup({navigation}, user_text, pw_text, user_name)}>
            Create Account
        </AwesomeButtonCartman> 
      </View>
    </View>
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
