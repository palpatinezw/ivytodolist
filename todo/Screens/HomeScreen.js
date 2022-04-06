import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Task from '../components/Task';

import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  let [accessToken, setToken] = useState('')

  function refreshToken() {
    SecureStore.getItemAsync('token').then((tkn) => {
      if (tkn==null) {
        console.log("No token");
      } else {
        accessToken = tkn;
        console.log(tkn);
      }
      
      setToken(tkn);
      return;
    })
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Button title='refresh' onPress={() => refreshToken()}/>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
        {/*where all tasks go*/}
         <Task text={'Task 1'} />
         <Task text={'Task 2'} />
          <Task text={'Task 2'} />
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {}, 
  
});
