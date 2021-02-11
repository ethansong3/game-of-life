import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';
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

export default function AuthScreen({navigation}){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    return (
      <View style={styles.container}>
        <Text>Game of Life</Text>
        <TextInput style={{ height: windowHeight/20, width: windowWidth/1.25, borderColor: 'black', borderWidth: 1 }}
        placeholder = "Email"/>
        <Text/>
        <TextInput style={{ height: windowHeight/20, width: windowWidth/1.25, borderColor: 'black', borderWidth: 1}}
        placeholder = "Password"/>
        
        <View style={styles.fixToText}>      
        <Button title="Sign Up"
  
        onPress={() => navigation.navigate('Home')} />
        <Button title="Log In"
        onPress={() => navigation.navigate('Home')} /></View>
      </View>
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