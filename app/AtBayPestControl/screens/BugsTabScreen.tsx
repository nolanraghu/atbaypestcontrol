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

    // //For rerendering the screen
    // const [i, update] = useState(0);

    const plan = getUser().getPlan();
    // This might be a terrible way to do it, but this gets the bugs in order, from prevention plan,
    // to added infestations, to other infestations
    let bugs = [getBugByID(0)].concat(
        plan.getInfestations().concat(
            plan.getOtherInfestations()))

    let bugPressArray = bugs.map(function(bug, index){
        // If this isn't refreshing when new infestations are added, it needs to be fixed in pressButton()
        // in BugInfoPopup.tsx
        return <BugPressable bug={bug} key={index}/>
    })

    let changing:boolean =
        plan.hasPendingChanges() ||
        plan.getNewPrice().upFront != 0

    let getHeader = () => {
      if(changing){
          return (
              <View style={styles.header}>
                  <Text style={styles.title}>
                      {newPriceText(plan)}
                  </Text>
                  <Button title= {updatePlan(plan.hasPendingChanges())}
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
