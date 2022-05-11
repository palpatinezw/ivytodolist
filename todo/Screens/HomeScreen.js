import React, { useState } from 'react';
import {
  SafeAreaView,
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Task from '../components/Task';

// Example of Collapsible/Accordion/Expandable List View in React Native
// https://aboutreact.com/collapsible-accordion-expandable-view/

// import all the components we are going to use

//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';

//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';

//Dummy content to show
//You can also use dynamic data by calling web service


const CONTENT = [
  
  {
    
    title: 'Module 1',
    content:
      <View>
      <Task text={'Task 1'} />
      <Task text={'Task 2'} />
      <Task text={'Task 3'} /> 
      </View>
  },
  {
    title: 'Module 2',
    content:
      <View>
      <Task text={'Task 4'} />
      <Task text={'Task 5'} />
      <Task text={'Task 6'} />
      </View>
  },
  {
    title: 'Module 3',
    content:
      <View>
      <Task text={'Task 7'} />
      <Task text={'Task 8'} />
      <Task text={'Task 9'} />
      </View>
  },
 

];

//To make the selector (Something like tabs)
{/*const SELECTORS = [
  { title: 'module1', value: 0 },
  { title: 'module2', value: 1 },
  { title: 'module3', value: 2 },
  { title: 'Clear' },
];
*/}
const SELECTORS = [
  // { title: 'module1', value: 0 },
  // { title: 'module2', value: 1 },
  //{ title: 'module3', value: 2 },
   { title: 'collapse all' },
  ];


const HomeScreen = () => {
  // Ddefault active selector
  const [activeSections, setActiveSections] = useState([]);
  // Collapsed condition for the single collapsible
  const [collapsed, setCollapsed] = useState(true);
  // MultipleSelect is for the Multiple Expand allowed
  // True: Expand multiple at a time
  // False: One can be expand at a time
  const [multipleSelect, setMultipleSelect] = useState(true);

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center' }}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>

      
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
          {/* <Text style={styles.title}>
            Contents
          </Text> */}
        <ScrollView style={styles.viewModuleBox}>

          {/*Code for Accordion/Expandable List starts here*/}
          <Accordion
            style={styles.indiAccordion}

            activeSections={activeSections}
            //for any default active section
            sections={CONTENT}
            //title and content of accordion
            touchableComponent={TouchableOpacity}
            //which type of touchable component you want
            //It can be the following Touchables
            //TouchableHighlight, TouchableNativeFeedback
            //TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
            //Do you want to expand mutiple at a time or single at a time
            renderHeader={renderHeader}
            //Header Component(View) to render
            renderContent={renderContent}
            //Content Component(View) to render
            duration={300}
            //Duration for Collapse and expand
            onChange={setSections}>
            //setting the state of active sections
          </Accordion>
          {/*Code for Accordion/Expandable List ends here*/}
        </ScrollView>
        
        <View style={styles.selectors}>
            {SELECTORS.map((selector) => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => setSections([selector.value])}
                //on Press of any selector sending the selector value to
                // setSections function which will expand the Accordion accordingly
              >
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 10,

  },

  /*title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  }, */

  header: {
    backgroundColor: '#55BCF6',
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  indiAccordion:{
    paddingBottom: 10,
    paddingTop: 3,
    //alignItems: 'centre',
    //flex: 2000,
    //alignSelf: 'centre',
    //alignContent: 'right',
    //backgroundColor: 'white',
    //width: 10000,
  },

  headerText: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    //backgroundColor: '#1A5187',
    borderRadius: 6,
    //alignContent: 'right',
    //flex: 1,
  //  alignItems: 'right',
   // flexDirection: 'row',
   // alignItems: 'center',
   // flexWrap: 'wrap'
  },
  active: {
    backgroundColor: '#FFF',
  },
  inactive: {
    backgroundColor: '#FFF',
    marginBottom: 10,
  },

  viewModuleBox:{
    //padding: 10,
    //marginBottom: 10,
    paddingHorizontal: 10,
    flex:1,
    //borderRadius: 60,
    //backgroundColor: 'white'
  },
  
  selectors:{
    //marginBottom: 400,
    fontSize: 100,
    //flexDirection:'centre',
    flex: 1,
    //justifyContent: 'centre'
    paddingLeft: 0.5
  },

  selector:{
    textAlign: 'center',
    backgroundColor: 'white',
    fontSize: 100,
    padding: 8,
  },

  activeSelector:{
    fontWeight: '500',    
  },
});

export default HomeScreen;