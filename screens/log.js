import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Text, View, Button, TextInput } from 'react-native';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

export default function LogScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <View style={styles.container}>
      <AwesomeButtonCartman style={{position:'absolute', left:windowWidth/1.55,top:windowHeight/50}} onPress={() => navigation.navigate('New Entry')}
                            height={windowHeight/14} width={windowWidth/3.2}>
        Create New Entry
      </AwesomeButtonCartman>
  
      <Text>My Entries</Text>
      
    </View>
  )
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
  }
});
