import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles'
import BugPressable from "../components/BugPressable";
import {getBugsList} from "../assets/Data/Data";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";
import Infestation from "../Assets/Classes/Infestation";
import User from "../Assets/Classes/User";
import Plan from "../Assets/Classes/Plan";

export default function BugsTabScreen() {
    const navigation = useNavigation();
  const scheme = useColorScheme();
  let styles = getStyle(scheme);

  let bugPressArray = getBugsList().map(function(bug, index){
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
