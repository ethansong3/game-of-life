import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import { useState } from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyCs-wd6aoy3D8_qwxmKsQ01rrbzym0NNdM",
  authDomain: "game-of-life-278b0.firebaseapp.com",
  projectId: "game-of-life-278b0",
  storageBucket: "game-of-life-278b0.appspot.com",
  messagingSenderId: "348963765560",
  appId: "1:348963765560:web:574af962b80ce3063415cd",
  measurementId: "G-4L1EWPSGLR"
};

let status = "You've played many games recently.\nWhy not take a break?"; // Default message

// Updates the recommendation
export function updateRecommendation(new_status)
{
  recentSessionReccomendation();
  status = new_status;
}

export function getMostRecentSession(){
  
}

// Update recommendation based on the most recent session length and average sesion length
// The shorter, the better.
export function recentSessionReccomendation()
{
  var UserDocRef = firebase.firestore().collection('Users').doc((firebase.auth().currentUser).uid);
  UserDocRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Most recent session:", doc.data().logData[doc.data().logData.length - 1]);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Update recommendation based on weekly hours. Perhaps update every Sunday?
// Based on goal hours and most recent week's hours.
export function weeklyHoursReccomendation()
{
  
}

// Update recommendation based on the most recent session's emotions.
// If emotions are bad, we suggest a different game. Else, do not offer suggestion.
export function differentGameReccomendation()
{
  
}


// Returns the current recommendation
export function getRecommendation()
{
  return status;
}