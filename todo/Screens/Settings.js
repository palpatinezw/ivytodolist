import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
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
      <ScrollView style={styles.scrollView}>
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


        <View style={styles.tokenWrapper}>
          <Text style={styles.sectionTitle}>Update Ivy token</Text>
          <TextInput style={styles.tokenInput} value={token} onChangeText={(newToken) => setToken(newToken)}/>
          <Button title="submit" onPress={submitToken} />
        </View>
      

      </ScrollView>
      
    </View>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  tokenWrapper:{
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tokenInput: {
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  items: {}, 
  
});
