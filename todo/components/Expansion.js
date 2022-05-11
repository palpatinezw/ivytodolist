import React, {useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Props
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';


const Expansion = (props) => {
  
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);

  const toggleExpanded = () => {
    // Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    // Setting up a active section state
    setActiveSections(
      sections.includes(undefined) ? [] : sections
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View>

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity onPress={toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {(props.text)}
              </Text>
              {/*Heading of Single Collapsible*/}
            </View>
          </TouchableOpacity>

          {/*Content of Single Collapsible*/}
          <Collapsible
            collapsed={collapsed}
            style={{textAlign: 'left', 
            //marginBottom: 10,
            //duration: 100,
            }}
          >
            <View style={styles.content}>
              <Text style={styles.contentText}>
                due date: ddmm
              </Text>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#F5FCFF',
    //paddingTop: 3,
  },
  header: {
    //backgroundColor: '#F5FCFF',
    paddingTop: 9,
    paddingLeft: 9,
    paddingBottom: 5,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    //marginLeft: 40,
    //backgroundColor: '#fff',
    //height: 20,
    //paddingBottom: 10,
    //paddingBottom: 50,
  },
  collapsible:{
    height: 30,
    //fontSize: 4,
    
  },
  contentText: {
    //height: 30,
    fontSize: 11,
    marginLeft: 10,
  },
});

export default Expansion;