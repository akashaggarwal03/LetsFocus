import React,{useState,useEffect} from  'react';
import { View, Text, StyleSheet } from 'react-native';

const minutestoMillis=(min)=>min*1000*60;
const formatTime=(time)=>time<10 ? `0${time}`:time;

export const CountDown =({
  minutes,
  isPaused,
  onProgress,
  onEnd,
})=>{

  const interval=React.useRef(null);
  const CountDown=()=>{
    setMillis((time)=>{
      if(time===0)
      {
        onEnd();
        clearInterval(interval.current)
        return time;
      }
      const timeLeft=time-1000;
      onProgress(timeLeft/minutestoMillis(minutes));
      return timeLeft;
    })
  }

  useEffect(()=>{

    if(isPaused)
    {
      if(interval.current)  clearInterval(interval.current)
      return;
    }
     

    interval.current=setInterval(CountDown,1000);

    return ()=> clearInterval(interval.current)

  },[isPaused])

  


  const [millis,setMillis]=useState(minutestoMillis(minutes));
  const minute=Math.floor(millis/60/1000)%60;
  const second=Math.floor(millis/1000)%60;

    useEffect(()=>{
    setMillis(minutestoMillis(minutes));
  },[minutes])

  
  return (
    <Text style={styles.text}>{formatTime(minute)}: {formatTime(second)}</Text>
  );
}

const styles= StyleSheet.create({

  text:{
    fontSize:88,
    fontWeight:'bold',
    color:'white',
    paddingtop:50,
    backgroundColor:'rgba(94,132,226,0.3)',
    margin:20,
  }
})