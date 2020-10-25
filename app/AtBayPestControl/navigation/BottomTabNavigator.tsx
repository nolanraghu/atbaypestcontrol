import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';


//All our stuff
import useColorScheme from '../hooks/useColorScheme';
import BugsTabScreen from '../screens/BugsTabScreen';
import PlanTabScreen from '../screens/PlanTabScreen';
import { BottomTabParamList, BugsTabParamList, PlanTabParamList, ProfileTabParamList} from '../types';
import ProfileTabScreen from "../screens/ProfileTabScreen";
import BugInfoPopup from "../screens/BugInfoPopup";
import PlanUpdatePopup from "../screens/PlanUpdatePopup";
import BugsTabNavigator from "../navigation/BugsTabNavigator"
import PlanTabNavigator from "./PlanTabNavigator";
import ProfileTabNavigator from "./ProfileTabNavigator";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="BugsTab"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="BugsTab"
        component={BugsTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-bug" color={color} />,
            tabBarLabel: "Infestation Packages"
        }}
      />
      <BottomTab.Screen
        name="PlanTab"
        component={PlanTabNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-paper" color={color} />,
            tabBarLabel: "Your Plan"
        }}
      />
      <BottomTab.Screen
          name="ProfileTab"
          component={ProfileTabNavigator}
          options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="ios-person" color={color} />,
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



