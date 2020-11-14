import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles'
import BugPressable from "../components/BugPressable";
import {getBugByID, getUser} from "../assets/Data/Data";
import {newPriceText, updatePlan} from "../assets/text/text";

export default function BugsTabScreen() {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const user = getUser()
    // This might be a terrible way to do it, but this gets the bugs in order, from prevention plan,
    // to added infestations, to other infestations
    let bugs = [getBugByID(0)].concat(
        user.getPlan().getInfestations().concat(
            user.getPlan().getOtherInfestations()))

    let hasPendingBugs:boolean = false;

  let bugPressArray = bugs.map(function(bug, index){
      if(user.getPlan().isPendingInfestation(bug)){
          hasPendingBugs = true;
      }
      return <BugPressable bug={bug} key={index}/>
  })

    let getHeader = () => {
      if(hasPendingBugs){
          return (
              <View style={styles.header}>
                  <Text style={styles.title}>
                      {newPriceText(user.getPlan().getNewPrice())}
                  </Text>
                  <Button title= {updatePlan()}
                          color= {buttonColor}
                          onPress={()=> navigation.navigate('PlanUpdatePopupScreen')}/>
              </View>
          )
      } else {
          return ;
      }
    }

  return (
      <View style={styles.screen}>
          {getHeader()}
          <ScrollView>
              <View style={styles.container}>
                  {bugPressArray}
              </View>
          </ScrollView>
      </View>
  );
}
