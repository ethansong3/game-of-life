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

export default function SurveyScreen({navigation}){
  const [averageWeeklyHours, setAverageWeeklyHours] = useState('');
  const [goalHours, setGoalHours] = useState('');
  const [averageSessionLength, setAverageSessionLength] = useState('');
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const ref_input2 = useRef();
  const ref_input3 = useRef();

  return (
    <SafeAreaView style={styles.background}>
    <Image source={images.backgroundGreen} style={[styles.backgroundImage, {backgroundColor: "#C7FEFF"}]}/>
    <SafeAreaView style = {styles.blank}></SafeAreaView>
      {/* <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                            height={windowHeight/18} width={windowWidth/4}>
        Sign Out
      </AwesomeButtonRick> */}
      <Text style={[styles.headerText, {color: "#2e84b1"}]}>Things we want to know...</Text>
      <Text style = {[styles.headerSubText, {color: "#23a190"}]}>On average, how many hours do you play each week?</Text>
      <AwesomeButtonRick placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "(e.g. 15)"
          onChangeText={averageWeeklyHours => setAverageWeeklyHours(averageWeeklyHours)}
          autoFocus={false}
          returnKeyType="next"
          onSubmitEditing={() => ref_input2.current.focus()}
          blurOnSubmit={false}
        />
      </AwesomeButtonRick>
      <Text style = {[styles.headerSubText, {color: "#23a190"}]}>How much time would you *like* to spend playing games?</Text>
      <AwesomeButtonRick placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "(e.g. 10)"
          onChangeText={goalHours => setGoalHours(goalHours)}
          autoFocus={false}
          returnKeyType="next"
          ref={ref_input2}
          onSubmitEditing={() => ref_input3.current.focus()}
          blurOnSubmit={false}
        />
      </AwesomeButtonRick>
      <Text style = {[styles.headerSubText, {color: "#23a190"}]}>How long does a typical gaming session last?</Text>
      <AwesomeButtonRick placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
        <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
          placeholder = "(e.g. 5)"
          onChangeText={averageSessionLength => setAverageSessionLength(averageSessionLength)}
          ref={ref_input3}
          returnKeyType="done"
          blurOnSubmit={true}
        />
      </AwesomeButtonRick>
      <AwesomeButtonRick type = "anchor" size = "large" disabled = {!canSubmit({navigation}, averageWeeklyHours, goalHours, averageSessionLength)} onPress = {() => submit({navigation}, averageWeeklyHours, goalHours, averageSessionLength)}>
        <Text style = {styles.anchorButtonText}>Next</Text>
      </AwesomeButtonRick>
      <SafeAreaView style = {{height: '20%'}}></SafeAreaView>
    </SafeAreaView>
  )
}

function canSubmit({navigation}, q1, q2, q3){
  if (q1 == "" || q2 == "" || q3 == "") return false;
  return true;
}

function submit({navigation}, q1, q2, q3){
  // firebase.auth().createUserWithEmailAndPassword(user, pw)
  // .then((userCredential) => {
  //   // Signed in
  //   var USER_INFO = userCredential.user;
  navigation.navigate("Home");

  //   // add to Firestore
  //   return firebase.firestore().collection('Users').doc(USER_INFO.uid)
  //   .set({
  //     name: name,
  //     email: user
  //   })
  // })
  // .catch((error) => {
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   createAlert(errorCode, errorMessage);
  // });
}

function createAlert(errorCode = '',errorMessage){
  return Alert.alert(
    errorCode,
    errorMessage
  );
}
