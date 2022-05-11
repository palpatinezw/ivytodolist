import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Expansion from '../components/Expansion';



const Task = (props) => {
  const [timesPressed, setTimesPressed] = useState(0);
  
  
  let imageLog = '';
  if (timesPressed > 1) {
    imageLog = '' ;
  } else if (timesPressed > 0) {
    imageLog = 'f';

  }

const deadline = () => alert('deadline')

return (
  <View style={styles.wholeTask}>
    
    <View style={styles.pressButton}>
          {/* {({ pressed }) => (
            <Text style={styles.itemText}>
              {pressed ? (props.text) : (props.text)}
            </Text>
          )} */}
       
          {/*<View style={styles.item}>     */}

            <View style={styles.square}/>

            <View style={styles.expansionClick}>
              <Expansion text={(props.text)} />  
            </View>  
             
            

          {/*</View> */}
    </View>
   
    <TouchableOpacity
        onPress={() => {setTimesPressed((current) => (current + 1)%2);}}
        style={({ pressed }) => [{
            backgroundColor: pressed
              ? 'white'
             // 'rgb(245, 254, 255)'
              : 'white',
            borderRadius: 6,
             },
          styles.wrapperCustom
        ]}>
       
        

          

          <View style={styles.logBoxCircular}>
            <Text style={styles.textLog}
            testID="pressable_press_console">{imageLog}
            </Text>
          </View>
         
          
        
    </TouchableOpacity>
    
    {/* <View style={{ backgroundColor: '#55BCF6', height: 0.4, opacity: 0.8}} />

    <TouchableOpacity style={styles.viewDetails}
      onPress={deadline}>
      <Text style={styles.viewDetailsText}> more details</Text>
    </TouchableOpacity> */}
    
  </View>
  );
};

const styles = StyleSheet.create({
  wholeTask:{
    //backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 6,
    flexDirection:'row',
    justifyContent: 'space-between',
  },

  wrapperCustom: {
    //marginBottom: 5,
    //paddingRight: 10,
    //paddingVertical: 10,
    height: 'fit',
    //marginLeft: 140,
    //paddingLeft: 100,
    //justifyContent: 'flex-end'
    //alignSelf: 'right'
    
  },
  
  pressButton:{
    flexDirection:'row',
    paddingHorizontal: 20,
    //borderWidth: 1,
  },

  expansionClick:{
    //marginRight: 30,
  },  

  logBoxCircular: {
    //flex:1,
    borderWidth: 2,
    paddingHorizontal: 8,
    paddingTop: 2,
    //paddingVertical: 8,
    marginVertical: 10,
    //marginTop: 10,
    //marginBottom: 10,
   
    //width: 35,
    //height: 30,
    borderColor: '#55BCF6',          
    borderRadius: 30,
    opacity: 0.8,
    //height: 'fit',
    //flexDirection: 'row',
    //justifyContent: 'right',
    alignSelf: 'right',
    marginLeft: 150,
  },

  textLog:{
    //textAlign: 'left',
    //flex: 1,
    // fontFamily: 'tahoma',
    //fontWeight: 20,
  },
  item:{
    //backgroundColor: '',
    paddingHorizontal: 15,
    paddingTop: 10,
    borderRadius: 10, 
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 20,
  },


  /*{itemLeft:{
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'

  },} */
  square:{
    width: 6,
    height: 6,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius:5,
    marginRight: 8,
    alignItems: 'centre',
    marginTop: 15,
    //marginRight: 20,
    //flexDirection: 'row',
  },
  
});

export default Task;