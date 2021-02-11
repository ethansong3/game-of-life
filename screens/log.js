import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function LogScreen(){
  return (
    <View style={styles.container}>
      <Text>this might be where we have the user log their hours</Text>
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
