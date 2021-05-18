import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/timer';
import { FocusHistory } from './src/features/focus/focusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };
  const onTimerEnd = () => {
    //1 means that task is completed
    addFocusHistoryWithStatus(focusSubject, 1);
    setFocusSubject(null);
  };

  const clearSubject = () => {
    //0 means the task was cancelled.
    addFocusHistoryWithStatus(focusSubject, 0);
    setFocusSubject(null);
  };

  const onClear = () => {
    setFocusHistory([]);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./src/utill/appwall2.png')}
        style={styles.image}>
        {focusSubject ? (
          <Timer
            focusSubject={focusSubject}
            onTimerEnd={onTimerEnd}
            clearSubject={clearSubject}
          />
        ) : (
          <View style={{flex:1}}>
            <Focus addSubject={setFocusSubject} />
            <FocusHistory focusHistory={focusHistory} onClear={onClear} />
          </View>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
