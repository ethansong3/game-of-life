import React, {Component} from 'react';
import { useWindowDimensions, Image, StyleSheet, Text, View, SafeAreaView, Button, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import {getRecommendation} from './recommendation';
import styles from './style';
import images from './images';

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";

export default function HomeScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
    <SafeAreaView style={styles.background}>
    <Image source={images.backgroundLight} style = {styles.backgroundImage}/>
      <SafeAreaView style = {styles.blank}></SafeAreaView>
      <AwesomeButtonRick style={{position:'absolute', right:windowWidth/1.4,top:windowHeight/15}} type="secondary" size="small" onPress={() => navigation.navigate('Welcome')}
                            height={windowHeight/18} width={windowWidth/4}>
        Sign Out
      </AwesomeButtonRick>

      <SafeAreaView style = {styles.recommendationBox}>
        <Text style = {styles.recommendationText}>{getRecommendation()}</Text>
      </SafeAreaView>

        <AwesomeButtonRick style={{position: 'absolute', top:230}} type="anchor" size="large" onPress={() => navigation.navigate('Log')}>
              <Text style = {styles.anchorButtonText}>Log New Session</Text>
        </AwesomeButtonRick>
        <AwesomeButtonRick style={{position: 'absolute', top:310}} borderColor= '#76BDE3' borderWidth={2} type="primary" size = "large" onPress={() => test()}>
            <Text style = {styles.primaryButtonText}>Profile DEBUG</Text>
        </AwesomeButtonRick>

    </SafeAreaView>
  );
}

function test(){
  console.log("test pressed.");
  var user = firebase.auth().currentUser;
  console.log(user);
}
