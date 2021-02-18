import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

export default function WelcomeScreen({navigation}){
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <Text>Before you can start taking control of your life, you need to login or make an account.</Text>
      <Button title="Sign In"
      onPress={() => navigation.navigate('Sign In')} />
      <Button title="Register"
      onPress={() => navigation.navigate('Create Account')} />
    </View>
  )
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
  