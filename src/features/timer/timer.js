import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Vibration,Platform,Alert} from 'react-native';
import { CountDown } from '../../components/CountDown';
import { SubmitButton } from '../../components/SubmitButton';
import {ProgressBar}  from 'react-native-paper';
import {Timing} from './timing';
import {useKeepAwake} from 'expo-keep-awake';
 

export const Timer = ({ focusSubject, onTimerEnd,clearSubject}) => {

  useKeepAwake();
  const [minutes,setMinutes]=useState(0);
  const [isStarted, changeIsStarted] = useState(false);
  const [progress,setProgress]=useState(1);

  const onProgress=(progress)=>{
    setProgress(progress);
  }

  const changeMinutes=(mins)=>{
    setMinutes(mins);
    setProgress(1);
    changeIsStarted(false);
  }

  const vibrate =()=>{
    if(Platform.OS==='ios')
    {
      const interval=setInterval(()=>Vibration.vibrate(),10000);
      setTimeout(()=>clearInterval(interval,10000));
    }
    else
    {
      Vibration.vibrate(10000);
    }
  }
  const onEnd=()=>{
    vibrate();
    setMinutes(1);
    setProgress(1);
    changeIsStarted(false);
    onTimerEnd();
  }

   const cancelTask = () => {
    Alert.alert(
      "Cancel Task",
      "Are you sure about giving up ??",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => clearSubject() }
      ]
    );
   }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
        
        <View style={{padding:50}}>
         <Text style={styles.title}>You are focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        </View>
       </View>
        <View>
        <ProgressBar
        progress={progress}
        color='red'
        style={{height:10}}
        /> 
        </View>
        <View style={styles.buttonWrapepr}>
        <Timing changeMinutes={changeMinutes}/>
        </View>
      
        <View style={styles.buttonWrapepr}>
          {!isStarted ? (
            <SubmitButton
              title="Start"
              size={100}
              onPress={() => changeIsStarted(true)}
            />
          ) : (
            <SubmitButton
              title="Stop"
              size={100}
              onPress={() => changeIsStarted(false)}
            />
          )}
        </View>
        <View>
        <SubmitButton
              title="x"
              size={50}
              onPress={() =>cancelTask()}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize:25,
    textAlign: 'center',
  },
  task: {
    color: 'white',
    textAlign: 'center',
    fontSize:18,
    fontWeight:'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapepr: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    padding:15,
    
  },
});
