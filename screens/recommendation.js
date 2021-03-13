import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth";
import { useState } from 'react';
import tags from '../data/tags.json';


const firebaseConfig = {
  apiKey: "AIzaSyCs-wd6aoy3D8_qwxmKsQ01rrbzym0NNdM",
  authDomain: "game-of-life-278b0.firebaseapp.com",
  projectId: "game-of-life-278b0",
  storageBucket: "game-of-life-278b0.appspot.com",
  messagingSenderId: "348963765560",
  appId: "1:348963765560:web:574af962b80ce3063415cd",
  measurementId: "G-4L1EWPSGLR"
};

let status = "You've played many games recently.\nWhy not take a break?";

// Updates the recommendation
export function updateRecommendation(new_status)
{
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
        // console.log("Most recent session:", doc.data().logData[doc.data().logData.length - 1]);
        var recentDuration = doc.data().logData[doc.data().logData.length - 1].duration;
        var averageDuration = doc.data().averageSessionLength;
        if (recentDuration < averageDuration){
          status = "Your most recent session was shorter than usual! Great work! (●'◡'●)";
        } else if (recentDuration > averageDuration) {
          status = "Your most recent session was longer than usual! Try your best to limit yourself next time. (┬┬﹏┬┬)";
        }
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
  var UserDocRef = firebase.firestore().collection('Users').doc((firebase.auth().currentUser).uid);
  UserDocRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Most recent session:", doc.data().logData[doc.data().logData.length - 1]);
        var recentSession = doc.data().logData[doc.data().logData.length - 1];
        var possibilities = [];
        // gets all games that matches user's personal devices.
        for(var i = 0; i < doc.data().devices.length; ++i){
          for(var z = 0; z < tags[doc.data().devices[i]].length; ++z){
            if(!possibilities.includes(tags[doc.data().devices[i]][z]) && tags[doc.data().devices[i]][z] != recentSession.game){
              possibilities.push(tags[doc.data().devices[i]][z]);
            }
          }
        }
        console.log(possibilities);
        if (recentSession.emotion == 'happy'){
          var rec = "It seems like "+recentSession.game+" isn't working out for you :(, try "+possibilities[Math.floor(Math.random() * possibilities.length)]+".";
          status = rec;
          console.log(rec);
        }
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}


// Returns the current recommendation
export function getRecommendation()
{
  return status;
}