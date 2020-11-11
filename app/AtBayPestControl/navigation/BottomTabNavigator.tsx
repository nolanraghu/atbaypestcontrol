import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

//All our stuff
import BugsTabNavigator from "../navigation/BugsTabNavigator"
import PlanTabNavigator from "./PlanTabNavigator";
import ProfileTabNavigator from "./ProfileTabNavigator";
import {tintColor} from "../assets/Stylesheets/Styles";

const BottomTab = createMaterialTopTabNavigator();

export default function BottomTabNavigator() {
    const renderIcon = (name:string) => {
        return (color:any) => {
            return (
                <TabBarIcon name={name} color={color.color} />
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
            tabBarLabel: "Packages"
        }}
      />
      <BottomTab.Screen
        name="PlanTab"
        component={PlanTabNavigator}
        options={{
            tabBarIcon: renderIcon('ios-paper'),
            tabBarLabel: "Your Plan"
        }}
      />
      <BottomTab.Screen
          name="ProfileTab"
          component={ProfileTabNavigator}
          options={{
              tabBarIcon: renderIcon('ios-person'),
              tabBarLabel: "Profile"
          }}
              />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}



