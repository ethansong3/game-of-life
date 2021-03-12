import { Alert, StyleSheet, Text, View, TouchableOpacity, BackHandler, FlatList, useWindowDimensions, Dimensions} from 'react-native';
import  React, { Component } from 'react';
import { Fontisto } from '@expo/vector-icons';
import GameSelectModal from './gameSelectModal.js';
import LogSessionModal from './logSessionModal.js';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import { Constants, Accelerometer, Pedometer } from 'expo-sensors';
//from https://codersera.com/blog/first-react-native-app-stopwatch/

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

export default class StopWatchContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            game: 'No game selected',
            hour: 0,
            min: 0,
            sec: 0,
            hasMovedEnough: false,
            firstStart: true,
            isPedometerAvailable: 'checking',
            pastStepCount: 0,
            currentStepCount: 0,
            starttext: 'start'
        } 
        this.id = 0;
        this.lapArr = [];
        this.interval = null;
        this._onPressGameAdd = this._onPressGameAdd.bind(this);
        this._onPressLogSession = this._onPressLogSession.bind(this);
        const gameData = require('../data/gameData.json');
        console.log(gameData.name);
        
    }  

    // Start of Motion Code
    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            this.state.currentStepCount = result.steps;
        });
    
        Pedometer.isAvailableAsync().then(
          result => {
            this.setState({
              isPedometerAvailable: String(result),
            });
          },
          error => {
            this.setState({
              isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
            });
          }
        );
      };
    
      _unsubscribe = () => {
        this.state.currentStepCount = 0;
        this._subscription && this._subscription.remove();
        this._subscription = null;
      };

    componentWillMount() {
        const { width, height } = Dimensions.get('window');
        this.screenWidth = width;
        this.screenHeight = height;
        this.boxWidth = this.screenWidth/10.0
    }

    createAlert(errorCode = '',errorMessage){
        return Alert.alert(
          errorCode,
          errorMessage
        );
      }

    // End of Motion Code

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){
        if (this.state.currentStepCount > 10 ){
            this.state.hasMovedEnough = true;
        }

        // CHANGE TO 30-45 MINUTES!
        if (this.state.sec % 5000 == 0){
            if (this.state.sec != 0  && !this.state.hasMovedEnough ){
                this.createAlert("Still alive?", "Rest breaks: Every 30 to 60 minutes, take a brief rest break. During this break, stand up, stretch, move around, and do something else. Drink some water. You'll feel better after a short break.")
            }
            this.state.currentStepCount = 0;
            this.state.hasMovedEnough = false;
        }
        

        // console.log("CURRENT POSITION: ", this.state.accelerometerData);
        // console.log("OLD POSITION: ", this.state.oldPosition);
        return (
            
            <View style={styles.container}> 
                <AwesomeButtonCartman style={{marginTop:50}}onPress = {()=>this.state.hour++}>add 1 hour</AwesomeButtonCartman>
                <GameSelectModal ref={'GameSelectModal'} ></GameSelectModal>
                <LogSessionModal ref={'LogSessionModal'} ></LogSessionModal>
                {/* <Text style={{marginLeft: 50, marginTop:100}}>x = {this.state.accelerometerData.x.toFixed(2)}{', '}
                y = {this.state.accelerometerData.y.toFixed(2)}{', '}
                z = {this.state.accelerometerData.z.toFixed(2)}</Text>  
                <Text>Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}</Text>
                <Text>Steps taken in the last 24 hours: {this.state.pastStepCount}</Text> */}
                <Text style={{marginTop:100}}>Walk! And watch this go up: {this.state.currentStepCount}</Text>
                <Text>Current game: {this.state.game}</Text>
                <View style={styles.parent}>
                    <Text style={styles.child}>{padToTwo(this.state.hour) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.min) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.sec)}</Text>
                </View>
                <View style={styles.buttonParent}>
                    <TouchableOpacity style={styles.button} onPress = {this.handleToggle}><Text style={styles.buttonText}>{this.state.starttext}</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress = {this.handleReset}><Text style={styles.buttonText}>stop & log</Text></TouchableOpacity>
                </View>
                <View style={styles.buttonParent}>
                    <Fontisto.Button name ="mad" backgroundColor="white" color = "red" onPress={() => this.handleLap(this.id, this.state.hour, this.state.min, this.state.sec, "angry")}>angry</Fontisto.Button>
                    <Fontisto.Button name ="neutral" backgroundColor="white" color = "black" onPress={() => this.handleLap(this.id, this.state.hour, this.state.min, this.state.sec, "ok")}>ok</Fontisto.Button>
                    <Fontisto.Button name ="smiley" backgroundColor="white" color = "lime" onPress={() => this.handleLap(this.id, this.state.hour, this.state.min, this.state.sec, "happy")}>happy</Fontisto.Button>
                </View>
                <FlatList data={this.lapArr} renderItem={({item}) => (<Item id = {item.id} hour={item.hour} min={item.min} sec={item.sec} mood={item.mood} />)} />
                
            </View>
        )
    }
    handleToggle = () => {
        if(this.state.firstStart){
            this._onPressGameAdd()
        }
        this.setState(
        {
            firstStart: false,
            start: !this.state.start
        },
        () => this.handleStart()
        );
    };
    handleStart = () => {
        if(this.state.start) {
            // turn on Pedometer
            this._subscribe();
            this.setState(
                {
                    starttext: 'pause'
                }
            );
            this.interval = setInterval(() => {
                if(this.state.game === 'No game selected'){
                    this._getGame();
                }
                if(this.state.sec !== 59){
                    this.setState({
                        sec: this.state.sec + 1
                    });
                }else if(this.state.min !== 59){
                    this.setState({
                        sec: 0,
                        min: ++this.state.min 
                    });
                }else{
                    this.setState({
                        sec: 0,
                        min: 0,
                        hour: ++this.state.hour
                    });
                }
            }, 1000);
        }else{
            // turn off Pedometer
            this._unsubscribe();
            this.setState(
                {
                    starttext: 'start'
                }
            );
            clearInterval(this.interval);
        }
    };
    handleLap = (id, hour, min, sec, mood) => {
        if(this.state.start){
            id = id.toString();
            this.id++
            this.lapArr = [
                ...this.lapArr,
                {id, hour,min,sec,mood}
            ]
            console.log(this.lapArr);
        }
    };
    handleReset = () => {
        // turn off Pedometer
        if(!this.state.firstStart){
            this._unsubscribe();
            this._onPressLogSession();
            this.setState({
                game:'No game selected',
                sec: 0,
                min: 0,
                hour: 0,
                starttext: 'start',
                start: false,
                firstStart: true
            });
            clearInterval(this.interval);
            this.lapArr = [];
            this.id = 0;
            this.refs.GameSelectModal.clearGame();
        }
    }
    _onPressGameAdd(){
        // alert("You add Item.");
        this.refs.GameSelectModal.showModal();
    }
    _onPressLogSession(){
        this.refs.LogSessionModal.setTime(this.state.hour);
        this.refs.LogSessionModal.setGame(this.state.game);
        this.refs.LogSessionModal.showModal();
    }
    _getGame(){
        this.setState({game: this.refs.GameSelectModal.getGame(),});
    }
}
function Item({id, hour, min, sec, mood }){

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
  
    return(
      <TouchableOpacity style={styles.listItem}>
        <AwesomeButtonCartman height={windowHeight/10} width={windowWidth/1.1}>
            <Text style={styles.listDetails}>{id}</Text>
            <Text style={styles.listDate}>{hour}</Text>
            <Text style={styles.listDate}>{min}</Text>
            <Text style={styles.listDate}>{sec}</Text>
            <Text style={styles.listDetails}>{mood}</Text>
        </AwesomeButtonCartman>
      </TouchableOpacity>
    )
  }
  


const styles = StyleSheet.create({
    parent: {
        display: "flex",
        flexDirection: "row",
        borderWidth:1,
        borderRadius: 50,
        borderColor: "white",
        backgroundColor: 'white',
        paddingLeft: "8%",
        paddingRight: "8%",
        paddingTop: ".5%",
        paddingBottom: ".5%",
    },

    child: {
      fontSize: 40,
      color: "#C89933",
    },

    buttonParent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: "2%",
    },

    button: {
        backgroundColor: "white",
        paddingTop: "5%",
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        display: "flex",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "white",
        height: 60,
    },

    buttonText: {
        color: "black",
        fontSize: 20,
        alignSelf: "center"
    },
    nonBlurredContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem:{
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        marginVertical: 2,
        padding: 8,
        justifyContent: 'center',
    },
    listDate: {
        flex: 0.5,
        alignItems: "flex-start",
        left: 10
    },
    listDetails: {
        flex: 0.3,
        alignItems: "flex-end"
    }
});