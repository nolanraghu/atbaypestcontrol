import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from 'react-native';
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles'
import BugPressable from "../components/BugPressable";
import {getPreventionPlan, getUser} from "../assets/Data/Data";
import {
    currentPriceText,
    deleteChanges,
    newPriceText,
    productPageDescription,
    updatePlan
} from "../assets/text/text";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useNavigation} from "@react-navigation/native";
import {logIn} from "../redux/action";

export default function BugsTabScreen() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const navigation = useNavigation();

    // Redux hook to make screen render when state pending changes
    useSelector((state:RootState) => state.planPendingVersion)

    //This is arbitrarily here because idk where else it should be
    let dispatch = useDispatch();
    if(getUser().isLoggedIn()){
        dispatch(logIn());
    }

    const plan = getUser().getPlan();
    // This might be a terrible way to do it, but this gets the bugs in order, from prevention plan,
    // to added infestations, to other infestations
    let bugs = [getPreventionPlan()].concat(
        plan.getInfestations().concat(
            plan.getOtherInfestations()))

    let bugPressArray = bugs.map(function(bug, index){
        // If this isn't refreshing when new infestations are added, it needs to be fixed in pressButton()
        // in BugInfoPopup.tsx
        return <BugPressable bug={bug} key={index}/>
    })

    let changing:boolean =
        plan.hasPendingChanges() ||
        plan.getNewPrice().upfront != 0

    let pushButton = () => {
        if(getUser().isLoggedIn()){
            navigation.navigate('PlanUpdatePopupScreen');
        } else {
            navigation.navigate('LoginScreen', {goingBack: true});
        }
    }

    let getHeader = () => {
      if(changing){
          return (
              <View style={styles.header}>
                  <Text style={styles.title}>
                      {newPriceText(plan)}
                  </Text>
                  <Button title= {updatePlan(plan.hasPendingChanges())}
                          color= {buttonColor}
                          onPress={pushButton}/>
              </View>
          )
      } else {
          return (
              <View style={[styles.header, {flexWrap: 'wrap'}]}>
                  <Text style={[styles.title, {marginBottom: 2}]}>
                      {currentPriceText(plan)}
                  </Text>
                  <Text style={[styles.caption, {marginBottom: 0}]}>
                      {productPageDescription()}
                  </Text>
              </View>
          )
      }
    }

    let deleteLink = () => {
        if(changing){
            return (
                <Text style={[styles.fullText, {marginTop: 10, marginBottom: 30}, styles.link]}
                      onPress={()=>{navigation.navigate('PlanUpdatePopupScreen', {deleting:true})}}>
                    {deleteChanges()}
                </Text>
            )
        } else {
            return;
        }
    }

  return (
      <View style={styles.screen}>
          {getHeader()}
          <ScrollView>
              <View style={styles.container}>
                  {bugPressArray}
              </View>
              {deleteLink()}
          </ScrollView>
      </View>
  );
}
