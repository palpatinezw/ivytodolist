import React, {useState, useEffect} from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Subject from '../components/Subject';
import Spinner from 'react-native-loading-spinner-overlay';

import * as SecureStore from 'expo-secure-store';

const URL = "https://ivy.ri.edu.sg/api/v1/"

var debugcounter = 0;

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
  let [isLoading, setLoading] = useState(false)
  let [showModal, setModal] = useState(false)

  useEffect(() => {
    if (isLoading) setModal(true)
    else setModal(false)
  }, [isLoading])

  function refresh() {
    setLoading(true)
    console.log(isLoading)
    var tempCourses = []
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
              
              // console.log("End of courses")
              return;
            }
            
            // console.log(responseData)
            
            for (var j = 0; j < responseData.length; j++) {
              // console.log(`ResponseData ${j}:: ${responseData[j].course_code}`)
              
              tempCourses.push(responseData[j])
              
            }
            //logCourses()
          }).catch(function(error) {
            console.log(error);
          })
        )
      }

    })
    Promise.all(fetches).then(()=>{
      // setLoading(false)
      setCourses(tempCourses)
      logCourses()
      
    })
    // logCourses()x
  }

  function logCourses() {
    // console.log(courses);
    console.log(debugcounter)
    debugcounter+=1
    for (var i = 0; i < courses.length; i++) {
      console.log(courses[i].course_code)
    }
    setLoading(false)
  }

  async function submitToken() {
    await save('token', token);
    setToken('')
    console.log("Token updated")
    refresh()
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
      >
        <View style={styles.modal}>
          <Text>Temp</Text>
        </View>

      </Modal>

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
          {(isLoading?
            <Text style={styles.sectionTitle}>Yes</Text>
            :<Text style={styles.sectionTitle}>No</Text>
          )}
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
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  items: {}, 
  
});
