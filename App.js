import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useWindowDimensions , StyleSheet, Text, View, Button, TextInput } from 'react-native';
import AuthScreen from "./screens/auth.js";
import HomeScreen from "./screens/home.js";
import LogScreen from "./screens/log.js";
import WelcomeScreen from "./screens/welcome.js";
import createAccountScreen from "./screens/createAccount.js";
import newEntryScreen from "./screens/newEntry.js";

// need these for page-to-page navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// @refresh reset
import * as firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCs-wd6aoy3D8_qwxmKsQ01rrbzym0NNdM",
  authDomain: "game-of-life-278b0.firebaseapp.com",
  projectId: "game-of-life-278b0",
  storageBucket: "game-of-life-278b0.appspot.com",
  messagingSenderId: "348963765560",
  appId: "1:348963765560:web:574af962b80ce3063415cd",
  measurementId: "G-4L1EWPSGLR"
};

//  Initialize Firebase...  
//  The conditional makes sure that it only creates the firebase project the first time
if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  return(
    <NavigationContainer style = {styles.container}>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen  name='Welcome' component={WelcomeScreen}/>
        <Stack.Screen  name='Sign In' component={AuthScreen}/>
        <Stack.Screen  name='Create Account' component={createAccountScreen}/>
        <Stack.Screen options={{headerLeft: null, gestureEnabled: false}} name='Home' component={HomeScreen}/>
        <Stack.Screen  name='Log' component={LogScreen}/>
        <Stack.Screen  name='New Entry' component={newEntryScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCD0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
