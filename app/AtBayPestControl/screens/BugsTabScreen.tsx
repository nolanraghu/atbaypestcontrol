import * as React from 'react';
import {Button, Image, Pressable, ScrollView, StyleSheet, useColorScheme} from 'react-native';

import { Text, View } from '../components/Themed';
import { useNavigation } from '@react-navigation/native';
import {useState} from "react";
import {getStyle, buttonColor, getBackgroundColor} from '../assets/Stylesheets/Styles'
import {getBugInfo} from "../controller/BugPulling";
import getCurrentPlan from "../profile/CurrentPlan";

const bugsData = [
        {bId: "b1", isPreventionButton: true},
    {bId: "b2", isPreventionButton: false},
    {bId: "b3",  isPreventionButton: false},
    {bId: "b4",  isPreventionButton: false},
    {bId: "b5", isPreventionButton: false},
    {bId: "b6",  isPreventionButton: false},
    {bId: "b7", isPreventionButton: false},
    {bId: "b8",  isPreventionButton: false},
]

// @ts-ignore
export default function BugsTabScreen({route, navigation}) {
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  let bugPressArray = bugsData.map(function({bId, isPreventionButton}, index){
    return <BugPressable bId={bId}   isPreventionButton={isPreventionButton} key={index}/>
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




function BugPressable({bId, isPreventionButton = false}: BugPressProps){
    const plan = getCurrentPlan();
    const thisBugData = getBugInfo(bId);
  const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);
  // @ts-ignore
    const bugIsIn = plan["bugs"].includes(bId)? "on":"off";

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
      <Pressable style={getPressStyle(bugIsIn, isPreventionButton)}
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
  isPreventionButton?: boolean
}
