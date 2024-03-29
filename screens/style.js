import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create
(
  {
    blank:
    {
      height: '10%'
    },
    background:
    {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    backgroundImage:
    {
      position: 'absolute',
      top: -10,
      width: '110%',
      height: '120%'
    },
    header:
    {
      width: '100%',
      height: '30%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    headerText:
    {
      paddingTop: 5,
      color: 'white',
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold'
    },
    headerSubText:
    {
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 5,
      paddingTop: 5,
      color: '#AAD3EA',
      textAlign: 'center',
      lineHeight: 20,
      fontSize: 17
    },
    recommendationBox: // Design for recommendation box
    {
      height: '20%',
      width: '93%',
      backgroundColor: '#FAFAFA',
      borderColor: "#C7E8AE",
      borderWidth: 2,
      borderRadius: 50,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    recommendationText:
    {
        color: "#19a629",
        fontSize: 16,
        paddingLeft: 6,
        paddingRight: 6,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 24
    },
    dropDownBox:
    {
      alignSelf: 'center',
      height: 40,
      width: 260
    },
    dropDownBoxContents:
    {
      backgroundColor: '#FAFAFA'
    },
    timer:
    {
      height: '10%',
      width: '93%',
      backgroundColor: '#FAFAFA',
      borderColor: "#6FDCCE",
      borderWidth: 2,
      borderRadius: 50,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    timerText:
    {
      fontSize: 36,
      color: "#1EAE6A"
    },
    signOutButton:
    {
      position: 'absolute',
      right: screenWidth / 1.4,
      top: screenHeight / 15
    },
    primaryButtonText: // Text design for primary buttons
    {
      color: '#0075b3',
      fontSize: 18,
      fontWeight: 'bold'
    },
    anchorButtonText: // Text design for anchor buttons
    {
      color: '#00800e',
      fontSize: 18,
      fontWeight: 'bold'
    }
  }
);
