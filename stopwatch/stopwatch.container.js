import { StyleSheet, Text, View, TouchableOpacity, BackHandler, FlatList, useWindowDimensions} from 'react-native';
import  React, { Component } from 'react';
import { Fontisto } from '@expo/vector-icons';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

//from https://codersera.com/blog/first-react-native-app-stopwatch/

let padToTwo = (number) => (number <= 9 ? `0${number}`: number);

export default class StopWatchContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            hour: 0,
            min: 0,
            sec: 0,
        } 
        this.id = 0;
        this.lapArr = [];
        this.interval = null;
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){
        return (
            <View style={styles.container}> 
                <View style={styles.parent}>
                    <Text style={styles.child}>{padToTwo(this.state.hour) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.min) + ' : '}</Text>
                    <Text style={styles.child}>{padToTwo(this.state.sec)}</Text>
                </View>
                <View style={styles.buttonParent}>
                    <TouchableOpacity style={styles.button} onPress = {this.handleToggle}><Text style={styles.buttonText}>Start/Pause</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress = {this.handleReset}><Text style={styles.buttonText}>Stop</Text></TouchableOpacity>
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
        this.setState(
        {
            start: !this.state.start
        },
        () => this.handleStart()
        );
    };
    handleStart = () => {
        if(this.state.start) {
            this.interval = setInterval(() => {
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
            clearInterval(this.interval);
        }
    };
    handleLap = (id, hour, min, sec, mood) => {
        if(this.state.start){
            this.id++
            this.lapArr = [
                ...this.lapArr,
                {id, hour,min,sec,mood}
            ]
            console.log(this.lapArr);
        }
    };
    handleReset = () => {
        this.setState({
            sec: 0,
            min: 0,
            hour: 0,

            start: false
        });
        clearInterval(this.interval);
        this.lapArr = [];
        this.id = 0;
    }
}
function Item({id, hour, min, sec, mood }){

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
  
    return(
      <TouchableOpacity style={styles.listItem}>
        <AwesomeButtonCartman height={windowHeight/10} width={windowWidth/1.1}>
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