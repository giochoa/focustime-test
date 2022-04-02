import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/focus.js';
import { FocusHistory } from './src/features/focus/focushistory';
import { Colors } from './src/utils/colors';
import { Timer } from './src/features/timer/timer';
import { spacing } from './src/utils/sizes';
const Statuses = {
  Complete: 1,
  Cancelled: 2,
};

export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusHistory, setfocusHistory] = useState([]);

  const addFocusHistorySubjectStatus = (subject, status) => {
    setfocusHistory([...focusHistory, { key: String(focusHistory.length +1), subject, status }]);
  };
  const onClear = () => {
    setfocusHistory([]);
  };
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
        setfocusHistory(JSON.parse(history));
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
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectStatus(focusSubject, Statuses.Complete);
            setfocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectStatus(focusSubject, Statuses.Cancelled);
            setfocusSubject(null);
          }}
        />
      ) : (
        <View style = {{flex:1}}>
          <Focus addSubject={setfocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkblue,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
  },
});
