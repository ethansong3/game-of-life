import React, {Component} from 'react';
import { useWindowDimensions, StyleSheet, Image, Text, SafeAreaView, Button, TextInput } from 'react-native';
import * as firebase from 'firebase'

// https://www.npmjs.com/package/react-native-really-awesome-button
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from 'react-native-really-awesome-button/src/themes/rick';
import StopWatchContainer from '../stopwatch/stopwatch.container';

import { getRecommendation } from './recommendation.js'
import styles from './style';
import images from './images';

export default function PlayScreen({navigation}){
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  return (
      <SafeAreaView styles = {styles.background}>
        <Image source={images.backgroundLight} style = {[styles.backgroundImage, {backgroundColor: "#F4FFEA"}]}/>
          <SafeAreaView style = {styles.blank}></SafeAreaView>
          <AwesomeButtonRick style={styles.signOutButton} type="secondary" size="small" onPress={() => navigation.navigate('Home')} height={30} width={80}>
            Back
          </AwesomeButtonRick>
          <StopWatchContainer/>
      </SafeAreaView>
  )
}
