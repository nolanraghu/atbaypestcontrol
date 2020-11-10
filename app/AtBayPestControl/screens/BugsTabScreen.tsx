import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme, Text, View} from 'react-native';
// @ts-ignore
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";
import {getStyle, buttonColor, getBackgroundColor} from '../assets/Stylesheets/Styles'
import {getBugInfo} from "../controller/BugPulling";

const bugsData = [
        {bId: "b1", state: 'on', isPreventionButton: true},
    {bId: "b2", state: 'on', isPreventionButton: false},
    {bId: "b3", state: 'off', isPreventionButton: false},
    {bId: "b4", state: 'pending', isPreventionButton: false},
    {bId: "b5", state: 'pending', isPreventionButton: false},
    {bId: "b6", state: 'off', isPreventionButton: false},
    {bId: "b7", state: 'off', isPreventionButton: false},
    {bId: "b8", state: 'off', isPreventionButton: false},
]

// @ts-ignore
export default function BugsTabScreen({route, navigation}) {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  let bugPressArray = bugsData.map(function({bId, state, isPreventionButton}, index){
    return <BugPressable bId={bId}  state={state} isPreventionButton={isPreventionButton} key={index}/>
  })

  return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>
            New Price: $10.99
          </Text>
          <Button title="Update Plan"
                  color= {buttonColor}
                  //TODO: add parameters to screens, interactivity
                  onPress={()=> navigation.navigate('PlanUpdatePopupScreen')}/>
        </View>
        <ScrollView>
          <View style={styles.container}>
            {bugPressArray}
          </View>
        </ScrollView>
      </View>
  );
}



function BugPressable({bId, state = 'off', isPreventionButton = false}: BugPressProps){
    const thisBugData = getBugInfo(bId);
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

        <Image source={thisBugData.image} style={styles.buttonImage}/>
        <Text style={isPreventionButton? styles.preventionText : styles.fullText}>{thisBugData.name}</Text>

      </Pressable>
  );
}

//This is where all the parameters for the BugPressable go
interface BugPressProps {
  bId: string,
  state?: string,
  isPreventionButton?: boolean
}
