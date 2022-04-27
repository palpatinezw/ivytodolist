import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';

const Subject = (props) => {
  
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  item:{
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10, 
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  itemLeft:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'

  },
  square:{
    width: 24,
    height: 24,
    backgroundColor: '#87E3D4',
    opacity: 0.4,
    borderRadius:5,
    marginRight: 15,
  },
  
  itemText:{
    maxWidth: '80%',
  },
  circular:{
    width:12,
    height: 12,
    borderColor: '#87E3D4',
    borderWidth: 2,
    borderRadius: 5,

  },
});

export default Subject;
