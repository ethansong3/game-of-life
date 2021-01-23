import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


/*
  The following two import statements are required for navigation between screens.
  I watched this youtube video to implement navigation: https://youtu.be/9K7JCQbOHVA
  In order for these import statements to work (and for the app to run without error), you have to
  install the libraries and dependencies required for stack navigation @ https://reactnavigation.org/docs/getting-started
  using $npm install.
*/
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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
