import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Subject from '../components/Subject';

import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function HomeScreen() {
  let [token, setToken] = useState('');

  function submitToken() {
    save('token', token);
    setToken('')
    console.log("Token updated")
  }

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <TextInput style={styles.tokenInput} value={token} onChangeText={(newToken) => setToken(newToken)}/>
        <Button title="submit" onPress={submitToken} />
      </View>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Select subjects to display</Text>

        <View style={styles.items}>
        {/*where all tasks go*/}
         <Subject text={'Subject 1'} />
         <Subject text={'Subject 2'} />
         <Subject text={'Subject 3'} />
         <Subject text={'Subject 4'} />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fonstSize: 24,
    fontWeight: 'bold',
  },
  items: {}, 
  
});
