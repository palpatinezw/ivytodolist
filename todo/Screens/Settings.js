import React, {useState, useEffect} from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Button, ScrollView, FlatList } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Subject from '../components/Subject';
import Spinner from 'react-native-loading-spinner-overlay';
import { apiGetCourses } from '../API/apicalls';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

export default function HomeScreen() {
  let [token, setToken] = useState('');

  let [courses, setCourses] = useState([])
  let [isLoading, setLoading] = useState(false)
  let [showModal, setModal] = useState(false)

  let [selectedId, setSelectedId] = useState(null);


  async function refresh() {
    setModal(true)
    apiGetCourses().then((res)=>{
      // console.log(res)
      setCourses(res)
      setModal(false)
    })
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
