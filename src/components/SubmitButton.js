import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';



export const SubmitButton= ({
  style={},
  textStyle={},
  size=125,
  onPress,
  ...props
})=> {
  return (
    <TouchableOpacity onPress={onPress} style= {[styles(size).radius,style]} >
      <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    
    </TouchableOpacity>
  );
}

const styles = (size)=>StyleSheet.create({
  radius:{
    borderRadius:size/2,
    width:size,
    height:size,
    alignItems:'center',
    justifyContent:'center',
    borderColor:"white",
    borderWidth:2,
    backgroundColor:"blue"

  },
  text:{
    fontSize:size/2.5,
    color:'white',
  }
 
 
});
