import {createStackNavigator} from "@react-navigation/stack";
import {ProfileTabParamList} from "../types";
import ProfileTabScreen from "../screens/ProfileTabScreen";
import * as React from "react";
import {appName} from "../assets/text/text";

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

export default function ProfileTabNavigator() {
    return (
        <ProfileTabStack.Navigator>
            <ProfileTabStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{headerTitle: appName()}}
            />
        </ProfileTabStack.Navigator>
    );
}
