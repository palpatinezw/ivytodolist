import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Task from '../components/Task';

import * as SecureStore from 'expo-secure-store';

const URL = "https://ivy.ri.edu.sg/api/v1/"

export default function HomeScreen() {
  let [courses, setCourses] = useState()

  function refresh() {
    SecureStore.getItemAsync('token').then((tkn) => {
      if (tkn==null) {
        console.log("No token");
      } else {
        console.log(tkn);
      }
      return tkn;
    }).then((tkn) => {
      fetch(URL+"courses", {
        headers: {
          'Authorization' : `Bearer ${tkn}`
        }
      }).then((response) => {
        return response.json()
      }).then((responseData) => {
        setCourses(responseData)
        getCourses()
      }).catch(function(error) {
        console.log(error);
      });
    })
  }

  function getCourses() {

    console.log(courses);
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Button title='refresh' onPress={() => refresh()}/>
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
