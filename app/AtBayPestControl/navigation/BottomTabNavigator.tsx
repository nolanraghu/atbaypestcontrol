import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

//All our stuff
import BugsTabNavigator from "../navigation/BugsTabNavigator"
import PlanTabNavigator from "./PlanTabNavigator";
import ProfileTabNavigator from "./ProfileTabNavigator";
import {tintColor} from "../assets/Stylesheets/Styles";
import {tab1label, tab2label, tab3label} from "../assets/text/text";

const BottomTab = createMaterialTopTabNavigator();

export default function BottomTabNavigator() {
    const renderIcon = (name:string) => {
        return (props:any) => {
            return (
                <TabBarIcon name={name} color={props.color} />
            );
        }
    }
  return (
    <BottomTab.Navigator
      initialRouteName="BugsTab"
      tabBarPosition={"bottom"}
      tabBarOptions={{
          activeTintColor: tintColor,
          showIcon: true,
          labelStyle: {fontSize: 10},
          indicatorStyle: {height: 0},
      }}>
      <BottomTab.Screen
        name="BugsTab"
        component={BugsTabNavigator}
        options={{
            tabBarIcon: renderIcon("ios-bug"),
            tabBarLabel: tab1label()
        }}
      />
      <BottomTab.Screen
        name="PlanTab"
        component={PlanTabNavigator}
        options={{
            tabBarIcon: renderIcon('spray-can'),
            tabBarLabel: tab2label()
        }}
      />
      <BottomTab.Screen
          name="ProfileTab"
          component={ProfileTabNavigator}
          options={{
              tabBarIcon: renderIcon('ios-person'),
              tabBarLabel: tab3label()
          }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
    if (props.name === 'spray-can'){
        return <FontAwesome5 size={24} style={{ marginBottom: -3, marginTop:2 }} {...props} />
    } else {
        return <Ionicons size={30} style={{ marginBottom: -3, marginRight:-3 }} {...props} />;
    }
}



