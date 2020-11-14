import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles'
import BugPressable from "../components/BugPressable";
import {getBugsList, getUser} from "../assets/Data/Data";

export default function BugsTabScreen() {
    const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);
  const user = getUser()
    // This might be a terrible way to do it, but this gets the bugs in order, from prevention plan,
    // to added infestations, to other infestations
    let bugs = [getBugsList()[0]].concat(
        user.getPlan().getInfestations().concat(
            user.getPlan().getOtherInfestations()))

  let bugPressArray = bugs.map(function(bug, index){
    return <BugPressable bug={bug} key={index}/>
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
