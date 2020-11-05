import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";
import {getStyle, buttonColor, getBackgroundColor} from '../assets/Stylesheets/Styles'

const bugsData = [
    ["b1", "Prevention Plan", require('../assets/images/honey_bee.png'), 'on', true],
  ["b2", "Ants", require('../assets/images/ant.png'), 'on', false],
  ["b3", "Another Ant", require('../assets/images/ant.png'), 'off', false],
  ["b4", "Ants", require('../assets/images/blue_beetle.png'), 'pending', false],
  ["b5","Ants", require('../assets/images/beetle.png'), 'pending', false],
  ["b6","Ants", require('../assets/images/honey_bee.png'), 'off', false],
  ["b7","Ants", require('../assets/images/honey_bee.png'), 'off', false],
  ["b8", "Ants", require('../assets/images/ant.png'), 'off', false]
]

export default function BugsTabScreen() {
  const scheme = useColorScheme();
  const navigation = useNavigation();
  let styles = getStyle(scheme);

  let bugPressArray = bugsData.map(function([bId, text, source, state, preventionButton], index){
    return <BugPressable bId={bId} text={text} source={source} state={state} isPreventionButton={preventionButton} key={index}/>
  })

  return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Update Plan"
                  color= {buttonColor}
                  //TODO: add parameters to screens, interactivity
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



function BugPressable({bId, text, source = require('../assets/images/error.jpg'),
                        state = 'off',
                        isPreventionButton = false}: BugPressProps){

  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  const getPressStyle = (stateString: string, preventionButton: boolean = false) => {
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
      <Pressable style={getPressStyle(state, isPreventionButton)}
                 onPress={()=> navigation.navigate('BugInfoPopupScreen', {
                     bugId: bId,
                 })}
                 android_ripple= {{color: getBackgroundColor(scheme)}}>

        <Image source={source} style={styles.buttonImage}/>
        <Text style={isPreventionButton? styles.preventionText : styles.fullText}>{text}</Text>

      </Pressable>
  );
}

//This is where all the parameters for the BugPressable go
interface BugPressProps {
    bId: string,
  text: string
  source?: object
  state?: 'off'|'on'|'pending'
  isPreventionButton?: boolean
}
