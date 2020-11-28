import {createStackNavigator} from "@react-navigation/stack";
import {ProfileTabParamList} from "../types";
import ProfileTabScreen from "../screens/ProfileTabScreen";
import * as React from "react";
import {appName} from "../assets/text/text";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {getUser} from "../assets/Data/Data";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

export default function ProfileTabNavigator() {
    let loggedIn = useSelector((state:RootState) => state.loggedIn);
    let stack = loggedIn?
        (
            <ProfileTabStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{headerTitle: appName()}}
            />
            ) :
        ([
            <ProfileTabStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerTitle: appName()}}
                key={0}
            />,
            <ProfileTabStack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerTitle: appName()}}
                key={1}
            />
        ])
    return (
        <ProfileTabStack.Navigator>
            {stack}
        </ProfileTabStack.Navigator>
    );
}
