import React, {useState, useEffect} from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Button, ScrollView, FlatList } from 'react-native';
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

  let [selectedId, setSelectedId] = useState(null);


  function refresh() {
    setModal(true)
    
    const N = 4;
    var fetches = []
    SecureStore.getItemAsync('token').then((tkn) => {
      return tkn;
    }).then(async(tkn) => {
      
      for (var i = 1; i <= N; i++) {
        // console.log(URL+`courses?page=${i}&enrollment_state=active`)
        
        fetches.push(
          fetch(URL+`courses?page=${i}&enrollment_state=active`, {
            headers: {
              'Authorization' : `Bearer ${tkn}`
            }
          }).then((response) => {
            if (response == null) return []
            return response.json()
          }).then((responseData) => {
            // console.log(i);
            return responseData;
            //logCourses()
          }).catch(function(error) {
            console.log(error);
          })
        )
      }

    }).then(() => {
      Promise.all(fetches).then((values) =>{
      // setLoading(false)
        var temp = []
        
        // console.log("VALUES")
        // console.log(values)
        setCourses([])
        for (var i = 1; i <= N; i++) {
          if (values[i] == null) continue;
          for (var j = 0; j < values[i].length; j++) {
            temp.push(values[i][j]);
          }
        }
        
        setCourses(temp)

        // console.log(debugcounter)
        // debugcounter+=1
        // for (var i = 0; i < courses.length; i++) {
        //   console.log(courses[i].course_code)
        // }
        setModal(false)
        
    })}).catch(function(error) {
      console.log(error);
    })
    // logCourses()x
  }


  async function submitToken() {
    await save('token', token);
    setToken('')
    // console.log("Token updated")
    refresh()
  }

  // const Item = ({ item, onPress, backgroundColor, textColor }) => (
  //   <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
  //     <Text style={[styles.title, textColor]}>{item.title}</Text>
  //   </TouchableOpacity>
  // );
  
  let renderItem = ({ item }) => {
    // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    // const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Subject text={item.course_code} />
    );
  };

  function updateTokenComponent() {
    return (
      <View style={styles.tokenWrapper}>
        <Text style={styles.tokenSectionTitle}>Update Ivy token</Text>
        <TextInput style={styles.tokenInput} value={token} onChangeText={(newToken) => setToken(newToken)}/>
        <Button title="submit" onPress={submitToken} />
        <Button title="refresh" onPress={refresh} />
      </View>
    )
    
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={showModal}
      >
        <View style={styles.modal}>
          <Text>Loading... Please Wait</Text>
        </View>

      </Modal>

      
        <View style={styles.tasksWrapper}>
          

          <View style={styles.items}>
          {/*where all tasks go*/}
            <FlatList nestedScrollEnabled
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              data={courses}
              ListFooterComponent={updateTokenComponent}
              ListHeaderComponent={<Text style={styles.sectionTitle}>Select subjects to display</Text>}
            />
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
    flex:1,
  },
  tokenWrapper:{
    paddingVertical: 20,
    borderBottomWidth: 0,
    borderTopWidth: 2,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  tokenInput: {
    fontSize: 12,
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  tokenSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(161, 237, 226, 0.1)',
    padding: 100,
  },
  items: {
  }, 
  
});
