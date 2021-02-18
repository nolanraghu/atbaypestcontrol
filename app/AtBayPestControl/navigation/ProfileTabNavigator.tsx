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
import EditUsernamePasswordScreen from "../screens/EditUsernamePasswordScreen";
import EditEmails from "../screens/EditEmails";
import EditAddresses from "../screens/EditAddresses";
import EditPayments from "../screens/EditPayments";

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
                name="EditUsernamePasswordScreen"
                component={EditUsernamePasswordScreen}
                options={{headerTitle:appName()}}
                key={3}
            />,
            <ProfileTabStack.Screen
                name="EditEmails"
                component={EditEmails}
                options={{headerTitle:appName()}}
                key={3}
            />,
            <ProfileTabStack.Screen
                name="EditAddresses"
                component={EditAddresses}
                options={{headerTitle:appName()}}
                key={3}
            />,
            <ProfileTabStack.Screen
                name="EditPayments"
                component={EditPayments}
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
