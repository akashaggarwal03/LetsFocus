import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { SubmitButton } from '../../components/SubmitButton';

export const FocusHistory = ({ focusHistory, onClear }) => {
  const HistoryItem = ({ item, index }) => {
    return <Text style={styles.historyItem(item.status)}>{item.subject}</Text>;
  };
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <View style={{ flex: 0.5, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focussed on:</Text>

            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}/>
            <View style={styles.clearContainer}>
              <SubmitButton size={75} title="Clear" onPress={() => onClear()} />
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status < 1 ? 'red' : 'lightgreen',
    fontSize: 30,
  }),
  title: {
    color: 'white',
    fontSize: 30,
  },
  clearContainer: {
    alignItems: 'center',
    padding: 15,
  },
});
