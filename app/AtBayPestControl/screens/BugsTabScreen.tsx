import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";

const bugsData = [
    ["Prevention Plan", require('../assets/images/honey_bee.png'), 'on', true],
  ["Ants", require('../assets/images/ant.png'), 'on', false],
  ["Beetles", require('../assets/images/ant.png'), 'off', false],
  ["Ants", require('../assets/images/blue_beetle.png'), 'pending', false],
  ["Ants", require('../assets/images/beetle.png'), 'pending', false],
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
          <Button title="Add to Plan"
                  color='rgb(72,190,87)'
                  onPress={()=> navigation.navigate('PlanUpdatePopupScreen')}/>
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

  return(
      <Pressable style={getStyle(state, isPreventionButton)}
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

//TODO: get these outa here, ideally in a format so you don't have to have the WHOLE THING copied twice
const stylesDark = StyleSheet.create({
  container: {
    padding: '2.5%',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgb(27,27,27)'
  },
  header: {
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgb(50,50,50)',
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgb(229,229,229)'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  fullButtonOn: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(105,105,105)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  fullButtonOff: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
  },
  fullButtonPending: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    borderWidth: 2.5,
    borderColor: 'lightgreen',
    opacity: .8
  },
  preventionButtonOff: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
  },
  preventionButtonOn: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(105,105,105)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  preventionButtonPending: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(60,60,60)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    borderWidth: 2.5,
    borderColor: 'lightgreen',
    opacity: .8
  },
  image: {
    flex: 1,
    height: '70%',
    width: '70%',
    alignSelf: "center",
    resizeMode: 'contain',
  },
  preventionText: {
    color: 'rgb(229,229,229)',
    alignSelf: 'center',
    flex: 2,
    textAlign: "center",
    fontSize: 24
  },
  fullText: {
    color: 'rgb(229,229,229)',
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
    backgroundColor: 'rgb(236,236,236)'
  },
  header: {
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'rgb(245,245,245)',
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'rgb(50,50,50)'
  },
  fullButtonOff: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(231,231,231)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
  },
  fullButtonOn: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  fullButtonPending: {
    width: '39%',
    margin: '5.5%',
    aspectRatio: 1,
    backgroundColor: 'rgb(231,231,231)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "column",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
    borderWidth: 2.5,
    borderColor: 'rgb(72,190,87)',
  },
  preventionButtonOff: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(231,231,231)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
  },
  preventionButtonOn: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
  },
  preventionButtonPending: {
    width: '89%',
    margin: '5.5%',
    marginBottom: '9%',
    aspectRatio: 3,
    backgroundColor: 'rgb(231,231,231)',
    borderRadius: 20,
    justifyContent: "center",
    flexDirection: "row-reverse",
    shadowColor: 'rgb(0,0,0)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 4,
    opacity: .8,
    borderWidth: 2.5,
    borderColor: 'lightgreen',
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