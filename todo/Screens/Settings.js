import React, {useState, useEffect} from 'react';
import { Modal, Text, View, StyleSheet, TextInput, Button, ScrollView, FlatList, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import Subject from '../components/Subject';
import { apiGetCourses, apiGetTasks, submitToken } from '../API/apicalls';



export default function HomeScreen() {
    // let [token, setToken] = useState('');
	// let [tempToken, setTempToken] = useState('')

    let [courses, setCourses] = useState([])
    let [isLoading, setLoading] = useState(false)
    let [showModal, setModal] = useState(false)
    let [showEdit, setEdit] = useState(false)

    let [selectedId, setSelectedId] = useState(null); 

    useEffect(() => {
        refresh();
    }, [])


    async function refresh() {
        setModal(true)
        apiGetCourses().then((res)=>{
          // console.log(res)
            setCourses(res)
            setModal(false)
        })

      //for testing purposes ONLY
        apiGetTasks(2919, [true, false, false]).then((res) => {
            console.log(res);
        })
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

	async function subToken(token) {
		setEdit(false)
		setModal(true)
		submitToken(token).then(
			refresh()
		).catch((error) => console.log(error))
	}

    function UpdateTokenComponent() {
		let [tempToken,  setTempToken] = useState('')
        return (
            <View style={styles.tokenWrapper}>
                <Text style={styles.tokenSectionTitle}>Update Ivy token</Text>
                <TextInput style={styles.tokenInput} value={tempToken} onChangeText={setTempToken} />
                <Button title="submit" onPress={() => subToken(tempToken)} />
				<Button title="close" onPress={() => setEdit(false)}/>
            </View>
        )
      
    }

  	return (
    	<KeyboardAvoidingView style={styles.container}>
			<Modal
				visible={showModal}
			>
				<View style={styles.modal}>
					<Text>Loading... Please Wait</Text>
				</View>

			</Modal>
			<Modal
				visible={showEdit}
			>
				<UpdateTokenComponent/>
			</Modal>

      
			<View style={styles.tasksWrapper}>
			

				<View style={styles.items}>
					<FlatList
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						data={courses}
						ListFooterComponent={
							<View style={styles.tokenWrapper}>
								<Button title="refresh" onPress={refresh} />
								<Button title="Edit Ivy Token" onPress={() => {setEdit(true)}} />
							</View>
						}
						ListHeaderComponent={<Text style={styles.sectionTitle}>Select subjects to display</Text>}
						ListEmptyComponent={<Text>No subjects to display, check if your Ivy token is keyed in correctly</Text>}
					/>
				</View>

			</View>
    	</KeyboardAvoidingView>
      
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper:{
    flex: 1,
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
