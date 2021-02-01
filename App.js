import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

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

function HomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Game of Life</Text>
      <Text>(this is the home screen)</Text>
      <Button title="go to log"
      onPress={() => navigation.navigate('Log')} />
    </View>
  )
}

function LogScreen(){
  return (
    <View style={styles.container}>
      <Text>this might be where we have the user log their hours</Text>
    </View>
  )
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Log' component={LogScreen}/>
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
