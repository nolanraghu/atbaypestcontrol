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
import ContactUsScreen from "../screens/ContactUsScreen";
import AddSubscription from "../screens/PaymentScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

export default function ProfileTabNavigator() {
    let loggedIn = useSelector((state:RootState) => state.loggedIn);
    let stack = loggedIn?
        ([
            <ProfileTabStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{headerTitle: appName()}}
                key={0}
            />,
            <ProfileTabStack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={{headerTitle:appName()}}
                key={3}
            />,
            <ProfileTabStack.Screen
                name='ContactUsScreen'
                component={ContactUsScreen}
                options={{headerTitle: appName()}}
                key={1}
            />,
            <ProfileTabStack.Screen
                name='AddSubscriptions'
                component={AddSubscription}
                options={{headerTitle: appName()}}
                key={2}
            />
            ]) :
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
