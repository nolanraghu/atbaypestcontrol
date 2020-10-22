import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';

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
            <BugPressable button={styles.preventionButton} source={require('../assets/images/icon.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/ant.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/beetle.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/blue_beetle.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/honey_bee.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/icon.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/icon.png')}/>
            <BugPressable button={styles.fullButton} source={require('../assets/images/icon.png')}/>
          </View>
        </ScrollView>
      </View>
  );
}



//Sorry Kobin, but you re-typing the specification of the BugButton was giving me
//anxiety so I did this.
function BugPressable(props: BugPressProps){
  const scheme = useColorScheme();
  return(
      <Pressable style={props.button}
                 onPress={()=>{}}
                 //This toggles based on the color theme now
                 android_ripple= {scheme === "dark"? {color: 'rgba(0,0,0,.15)'} : {color: 'rgba(255,255,255,.15)'}}>
        <Image source={props.source} style={styles.image}/>
      </Pressable>
  );
}
//This is where all the parameters for the BugPressable go
interface BugPressProps {
  button: object
  source: object
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
    alignContent: "center"
  },
  preventionButton: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
  },
  image: {
    width: '85%',
    height: '85%',
    alignSelf: "center"
  }
});
