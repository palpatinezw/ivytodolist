import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Subject from '../components/Subject';

import * as SecureStore from 'expo-secure-store';

const URL = "https://ivy.ri.edu.sg/api/v1/"

async function* asyncGenerator() {
  let i = 0;
  yield i++;
}

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function HomeScreen() {
  let [token, setToken] = useState('');

  let [courses, setCourses] = useState([])

  function refresh() {
    setCourses([]);
    var fetches = []
    SecureStore.getItemAsync('token').then((tkn) => {
      if (tkn==null) {
        console.log("No token");
      } else {
        console.log(tkn);
      }
      return tkn;
    }).then(async(tkn) => {
      
      for (var i = 1; i < 5; i++) {
        console.log(URL+`courses?page=${i}&enrollment_state=active`)
        fetches.push(
          fetch(URL+`courses?page=${i}&enrollment_state=active`, {
            headers: {
              'Authorization' : `Bearer ${tkn}`
            }
          }).then((response) => {
            return response.json()
          }).then((responseData) => {
            if (responseData == null) {
              
              console.log("End of courses")
              return;
            }
            
            // console.log(responseData)
            var tempCourses = []
            for (var j = 0; j < responseData.length; j++) {
              // console.log(`ResponseData ${j}:: ${responseData[j].course_code}`)
              
              tempCourses.push(responseData[j])
              
            }
            setCourses([...courses, ...tempCourses])
            // logCourses()
          }).catch(function(error) {
            console.log(error);
          })
        )
      }

    })

    Promise.all(fetches)
    // logCourses()
  }

  function logCourses() {
    // console.log(courses);
    for (var i = 0; i < courses.length; i++) {
      console.log(courses[i].course_code)
    }
  }

  async function submitToken() {
    await save('token', token);
    setToken('')
    console.log("Token updated")
    refresh()
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
          <Button title="refresh" onPress={refresh} />
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
