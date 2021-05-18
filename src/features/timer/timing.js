import React from 'react';
import {Text,View,StyleSheet} from 'react-native';

import {SubmitButton} from '../../components/SubmitButton';


export const Timing=({changeMinutes})=>{
  return (
    <>
    <View style={styles.timinigButton}>
    <SubmitButton size={75} title="0.1"
    onPress={()=>changeMinutes(0.1)}>
    </SubmitButton>
     </View>
    <View style={styles.timinigButton}>
    <SubmitButton size={75} title="0.2"
     onPress={()=>changeMinutes(0.2)}>
    </SubmitButton>
    </View>
     <View style={styles.timinigButton}>
    <SubmitButton size={75} title="0.3"
     onPress={()=>changeMinutes(0.3)}>
    </SubmitButton>
    </View>
    </>
  );
}

const styles=StyleSheet.create({
  timinigButton:{
    flex:1,
    justifyContent:'center',
  }
})