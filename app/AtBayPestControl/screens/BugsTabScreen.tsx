import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

const bugsData = [
    ["Prevention Plan", require('../assets/images/honey_bee.png'), 'off', true],
  ["Ants", require('../assets/images/ant.png'), 'on', false],
  ["Beetles", require('../assets/images/ant.png'), 'off', false],
  ["Ants", require('../assets/images/blue_beetle.png'), 'pending', false],
  ["Ants", require('../assets/images/beetle.png'), 'off', false],
  ["Ants", require('../assets/images/honey_bee.png'), 'off', false],
  ["Ants", require('../assets/images/honey_bee.png'), 'off', false],
  ["Ants", require('../assets/images/ant.png'), 'off', false]
]

export default function BugsTabScreen() {
  const scheme = useColorScheme();
  const navigation = useNavigation();
  let styles = stylesLight;
  if(scheme === "dark"){
    styles = stylesDark;
  }

  let bugPressArray = bugsData.map(function([text, source, state, preventionButton], index){
    return <BugPressable text={text} source={source} state={state} isPreventionButton={preventionButton} key={index}/>
  })

  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Add to Plan" onPress={()=> navigation.navigate('PlanUpdatePopupScreen')}/>
        </View>
        <ScrollView style={{marginBottom: '18%'}}>
          <View style={styles.container}>
            {bugPressArray}
          </View>
        </ScrollView>
      </View>
  );
}



function BugPressable({text, source = require('../assets/images/honey_bee.png'),
                        state = 'off',
                        isPreventionButton = false}: BugPressProps){
  //TODO make states, based on whether or not the bug is covered
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = stylesLight;
  if(scheme === "dark"){
    styles = stylesDark;
  }

  const getStyle = (stateString: string, preventionButton: boolean = false) => {
    switch (stateString){
      case 'off':
        return (preventionButton? styles.preventionButtonOff: styles.fullButtonOff);
      case 'on':
        return (preventionButton? styles.preventionButtonOn: styles.fullButtonOn);
      case 'pending':
        return (preventionButton? styles.preventionButtonPending: styles.fullButtonPending);
    }
  }

  const [getState, setState] = useState(getStyle(state, isPreventionButton));

  return(
      <Pressable style={getState}
                 onPress={()=> navigation.navigate('BugInfoPopupScreen')}
                 //This toggles based on the color theme now
                 android_ripple= {scheme === "dark"? {color: 'rgba(0,0,0,.15)'} : {color: 'rgba(255,255,255,0.3)'}}>

        <Image source={source} style={styles.image}/>
        <Text style={isPreventionButton? styles.preventionText : styles.fullText}>{text}</Text>

      </Pressable>
  );
}
//This is where all the parameters for the BugPressable go
interface BugPressProps {
  text: string
  source?: object
  state?: 'off'|'on'|'pending'
  isPreventionButton?: boolean
}

const stylesDark = StyleSheet.create({
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
  fullButtonOff: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  fullButtonOn: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  fullButtonPending: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  preventionButtonOff: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  preventionButtonOn: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  preventionButtonPending: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  image: {
    flex: 1,
    height: '70%',
    width: '70%',
    alignSelf: "center",
    resizeMode: 'contain',
  },
  preventionText: {
    color: 'black',
    alignSelf: 'center',
    flex: 2,
    textAlign: "center"
  },
  fullText: {
    color: 'black',
    alignSelf: 'center',
    textAlign: "center"
  }
});
const stylesLight = StyleSheet.create({
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
    backgroundColor: 'rgb(226,226,226)'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgb(0,0,0)'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fullButtonOff: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  fullButtonOn: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  fullButtonPending: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'pink',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column"
  },
  preventionButtonOff: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  preventionButtonOn: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  preventionButtonPending: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(131,195,140)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse"
  },
  image: {
    flex: 1,
    height: '70%',
    width: '70%',
    alignSelf: "center",
    resizeMode: 'contain',
  },
  preventionText: {
    color: 'black',
    alignSelf: 'center',
    flex: 2,
    textAlign: "center"
  },
  fullText: {
    color: 'black',
    alignSelf: 'center',
    textAlign: "center"
  }
});