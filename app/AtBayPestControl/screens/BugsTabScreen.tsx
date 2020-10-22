import * as React from 'react';
import {Button, Pressable, ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

interface BugPressProps {
  button: object
  //We'll eventually need to put the other parameter here that tell the button which bug it is
}

export default function BugsTabScreen() {


  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Add to Plan" onPress={()=>{}}/>
        </View>
        <ScrollView style={{marginBottom: '18%'}}>
          <View style={styles.container}>
            <BugPressable button={styles.preventionButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
            <BugPressable button={styles.fullButton}/>
          </View>
        </ScrollView>
      </View>
  );
}


//Sorry Kobin, but you re-typing the specification of the BugButton was giving me
//anxiety so I did this.
function BugPressable(props: BugPressProps){
  return(
      <Pressable style={props.button}
                 onPress={()=>{}}
                 android_ripple={{color: 'rgba(0,0,0,.15)'}
                 }/>
  );
}
//This is where all the parameters for the BugPressable go
interface BugPressProps {
  button: object
  //We'll eventually need to put the other parameter here that tell the button which bug it is
}

const styles = StyleSheet.create({
  container: {
    padding: '2.5%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  header: {
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgb(41,41,41)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fullButton: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    padding: 10,
  },
  preventionButton: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    padding: 10,
  },
});
