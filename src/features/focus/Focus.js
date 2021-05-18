import React,{useState} from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SubmitButton } from '../../components/SubmitButton';

export const Focus = ({addSubject}) => {

  const [tmpItem,setTmpItem]= useState(null)


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on ? </Text>
        <View style={styles.input}>
          <TextInput style={{ flex: 1, marginRight: 10 }}
          onChangeText={text => setTmpItem(text)}
           />
         
          <SubmitButton size={50} title="+"
           onPress={()=>addSubject(tmpItem)}
            />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  titleContainer: {
    flex: 0.5,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
