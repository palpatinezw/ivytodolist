import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {StatusBar} from 'expo-status-bar';
import Task from './components/Task';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './Screens/HomeScreen'
import Settings from './Screens/Settings'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') { 
            iconName = 'home';
          } else if (route.name === 'Settings') {
            iconName = 'gears';
          }

          let colour;
          
        return  <FontAwesome name={iconName} size={size} color={colour} />;
      },
      })}
         tabBarOptions={{
            activeTintColor: 'purple',
            inactiveTintColor: 'gray',
          }}
      >
         <Tab.Screen name="Home" component={HomeScreen} />
         <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer> 
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
