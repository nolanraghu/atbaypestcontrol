import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import BugsTabScreen from '../screens/BugsTabScreen';
import PlanTabScreen from '../screens/PlanTabScreen';
import { BottomTabParamList, BugsTabParamList, PlanTabParamList, ProfileTabParamList} from '../types';
import ProfileTabScreen from "../screens/ProfileTabScreen";
import BugInfoPopup from "../screens/BugInfoPopup";
import PlanUpdatePopup from "../screens/PlanUpdatePopup";

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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const BugsTabStack = createStackNavigator<BugsTabParamList>();

function BugsTabNavigator() {
  return (
    <BugsTabStack.Navigator>
      <BugsTabStack.Screen
        name="BugsTabScreen"
        component={BugsTabScreen}
        options={{ headerTitle: 'AtBay Pest Control' }}
      />
      <BugsTabStack.Screen
          name="BugInfoPopupScreen"
          component={BugInfoPopup}
          options={{cardStyle: {backgroundColor: 'transparent'}, headerShown: false}}
      />
      <BugsTabStack.Screen
          name="PlanUpdatePopupScreen"
          component={PlanUpdatePopup}
          options={{cardStyle: {backgroundColor: 'transparent'}, headerShown: false}}
      />
    </BugsTabStack.Navigator>
  );
}

const PlanTabStack = createStackNavigator<PlanTabParamList>();

function PlanTabNavigator() {
    return (
        <PlanTabStack.Navigator>
            <PlanTabStack.Screen
                name="PlanTabScreen"
                component={PlanTabScreen}
                options={{headerTitle: 'AtBay Pest Control'}}
            />
        </PlanTabStack.Navigator>
    );
}

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

function ProfileTabNavigator() {
    return (
        <ProfileTabStack.Navigator>
            <ProfileTabStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{headerTitle: 'AtBay Pest Control'}}
                />
        </ProfileTabStack.Navigator>
    );
}