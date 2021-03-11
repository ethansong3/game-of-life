import React, { useRef, Component} from 'react';
import { KeyboardAvoidingView, ScrollView, useWindowDimensions, StyleSheet, Text, SafeAreaView, View, Button, TextInput, Alert, Image } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import { useState } from 'react';
import styles from './style';
import images from './images';
import DropDownPicker from 'react-native-dropdown-picker';

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
  const [averageWeeklyHours, setAverageWeeklyHours] = useState(0);
  const [goalHours, setGoalHours] = useState(-1);
  const [averageSessionLength, setAverageSessionLength] = useState(0);
  const [soloOrMultiplayer, setSoloOrMultiplayer] = useState('');
  const [devices, setDevices] = useState([]);
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  

  return (
    <SafeAreaView style={[styles.background]}>
    <Image source={images.backgroundGreen} style={[styles.backgroundImage, {backgroundColor: "#C7FEFF"}]}/>
    <SafeAreaView style = {styles.blank}></SafeAreaView>
      <ScrollView contentContainerStyle={{paddingVertical: 20}}>
        {/* <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                              height={windowHeight/18} width={windowWidth/4}>
          Sign Out
        </AwesomeButtonRick> */}
        <Text style={[styles.headerText, {color: "#2e84b1"}]}>Things we want to know...</Text>
        <Text style={{height:30}}/>
        <SafeAreaView>
          <Text style = {[styles.headerSubText, {color: "#23a190"}]}>On average, how many hours do you play each week?</Text>
          <AwesomeButtonRick style={{alignSelf: 'center'}} placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
            <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
              placeholder = "(e.g. 15)"
              onChangeText={(text)=> {
                setAverageWeeklyHours(
                    text.replace(/[^0-9]/g, ''),
              )}}
              autoFocus={false}
              keyboardType="number-pad"
              maxLength={2}
              returnKeyType="done"
              onSubmitEditing={() => ref_input2.current.focus()}
              blurOnSubmit={false}
            />
          </AwesomeButtonRick>
        </SafeAreaView>
        <SafeAreaView style={{flex:1}}>
          <Text style = {[styles.headerSubText, {color: "#23a190"}]}>How much time would you *like* to spend playing games?</Text>
          <AwesomeButtonRick style={{alignSelf: 'center'}} placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
            <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
              placeholder = "(e.g. 10)"
              onChangeText={(text)=> {
                setGoalHours(
                    text.replace(/[^0-9]/g, ''),
              )}}
              autoFocus={false}
              keyboardType="number-pad"
              maxLength={2}
              returnKeyType="done"
              ref={ref_input2}
              onSubmitEditing={() => ref_input3.current.focus()}
              blurOnSubmit={false}
            />
          </AwesomeButtonRick>
        </SafeAreaView>
        
          <Text style = {[styles.headerSubText, {color: "#23a190"}]}>How long does a typical gaming session last?</Text>
          <AwesomeButtonRick style={{alignSelf: 'center'}} placeholder size="large" backgroundColor="white" borderColor="#7cd98d" borderWidth={2} backgroundDarker="transparent" backgroundShadow="transparent" backgroundPlaceholder="transparent">
            <TextInput style={{ marginLeft: windowWidth/1.7, height: windowHeight/20, width: windowWidth/1.25, color: "#349890"}}
              placeholder = "(e.g. 5)"
              onChangeText={(text)=> {
                setAverageSessionLength(
                    text.replace(/[^0-9]/g, ''),
              )}}
              keyboardType="number-pad"
              maxLength={2}
              ref={ref_input3}
              returnKeyType="done"
              blurOnSubmit={true}
            />
          </AwesomeButtonRick>
        <Text style = {[styles.headerSubText, {color: "#23a190"}]}>Do you prefer playing games with friends or by yourself?</Text>

        <DropDownPicker
          zIndex={5000}
          items={[
              {label: 'Solo', value: 'solo'},
              {label: 'Multiplayer', value: 'multiplayer'},
              {label: 'Both', value: 'both'},
          ]}
          defaultValue={null}
          placeholder="Select an option"
          containerStyle={{alignSelf: 'center', height: 40, width:300}}
          style={{ backgroundColor: '#fafafa'}}
          itemStyle={{
              justifyContent: 'flex-start'
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => setSoloOrMultiplayer(
              item.value
          )}
      />
        <Text style = {[styles.headerSubText, {color: "#23a190"}]}>What devices do you own?</Text>
        <DropDownPicker
            zIndex={4000}
            items={[
              {label: 'PC', value: 'pc'},
              {label: 'iPhone', value: 'iphone'},
              {label: 'Android', value: 'android'},
              {label: 'Nintendo Switch', value: 'nswitch'},
              {label: 'Xbox One', value: 'xbox1'},
              {label: 'Playstation 5', value: 'ps5'}
            ]}
            defaultValue={[]}
            placeholder="Select devices"
            multiple={true}
            multipleText="%d items have been selected."
            min={0}
            max={6}
            containerStyle={{alignSelf: 'center', height: 40, width:300}}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            onChangeItem={item => setDevices(
              item // array of selected items
          )}
        />

        <Text style={{height:30}}/>
        
        <AwesomeButtonRick style={{alignSelf: 'center'}} type = "anchor" size = "large" disabled = {!canSubmit({navigation}, averageWeeklyHours, goalHours, averageSessionLength, soloOrMultiplayer, devices)} onPress = {() => submit({navigation}, averageWeeklyHours, goalHours, averageSessionLength, soloOrMultiplayer, devices)}>
          <Text style = {styles.anchorButtonText}>Next</Text>
        </AwesomeButtonRick>         
      </ScrollView>
    </SafeAreaView>
  )
}

function canSubmit({navigation}, q1, q2, q3, q4, q5){
  if (q1 == 0 || q2 == -1 || q3 == 0|| q4 == "" || q5 == []) return false;
  return true;
}

function submit({navigation}, q1, q2, q3, q4, q5){
  // firebase.auth().createUserWithEmailAndPassword(user, pw)
  // .then((userCredential) => {
  //   // Signed in
  navigation.navigate("Home");


  var user = firebase.auth().currentUser;
  firebase.firestore().collection('Users').doc(user.uid).update({
    averageWeeklyHours: q1,
    goalHours: q2,
    averageSessionLength: q3,
    soloOrMultiplayer: q4,
    devices: q5
  });
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
