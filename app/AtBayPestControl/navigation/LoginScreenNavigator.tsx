import {createStackNavigator} from "@react-navigation/stack";
import {ProfileTabParamList} from "../types";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import * as React from "react";
import {appName} from "../assets/text/text";

const LoginScreenStack = createStackNavigator<ProfileTabParamList>();

export default function LoginScreenNavigator() {
    return (
        <LoginScreenStack.Navigator>
            <LoginScreenStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerTitle: appName()}}
            />
            <LoginScreenStack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerTitle: appName()}}
            />
        </LoginScreenStack.Navigator>
    );
}
