import {createStackNavigator} from "@react-navigation/stack";
import {ProfileTabParamList} from "../types";
import ProfileTabScreen from "../screens/ProfileTabScreen";
import * as React from "react";
import {appName} from "../assets/text/text";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import ContactUsScreen from "../screens/ContactUsScreen";
import AddSubscription from "../screens/PaymentScreen";
import EditUsernamePasswordScreen from "../screens/EditUsernamePasswordScreen";
import EditEmails from "../screens/EditEmails";
import EditAddresses from "../screens/EditAddresses";
import EditPayments from "../screens/EditPayments";
import CustomBack from "../components/CustomBack";

const ProfileTabStack = createStackNavigator<ProfileTabParamList>();

export default function ProfileTabNavigator() {
    let loggedIn = useSelector((state:RootState) => state.loggedIn);
    let stack = loggedIn?
        ([
            <ProfileTabStack.Screen
                name="ProfileTabScreen"
                component={ProfileTabScreen}
                options={{headerTitle: appName()}}
                key={"ProfileTabScreen"}
            />,
            <ProfileTabStack.Screen
                name="EditUsernamePasswordScreen"
                component={EditUsernamePasswordScreen}
                options={{
                    headerTitle:appName(),
                    headerLeft: (props) => (
                        CustomBack(props, "UsernamePassword")
                    ),
                }}
                key={"EditUsernamePasswordScreen"}
            />,
            <ProfileTabStack.Screen
                name="EditEmails"
                component={EditEmails}
                options={{
                    headerTitle:appName(),
                    headerLeft: (props) => (
                        CustomBack(props, "Email")
                    ),
                }}
                key={"EditEmails"}
            />,
            <ProfileTabStack.Screen
                name="EditAddresses"
                component={EditAddresses}
                options={{
                    headerTitle:appName(),
                    headerLeft: (props) => (
                        CustomBack(props, "Address")
                    ),
                }}
                key={"EditAddresses"}
            />,
            <ProfileTabStack.Screen
                name="EditPayments"
                component={EditPayments}
                options={{headerTitle:appName()}}
                key={"EditPayments"}
            />,
            <ProfileTabStack.Screen
                name='ContactUsScreen'
                component={ContactUsScreen}
                options={{headerTitle: appName()}}
                key={'ContactUsScreen'}
            />,
            <ProfileTabStack.Screen
                name='AddSubscriptions'
                component={AddSubscription}
                options={{headerTitle: appName()}}
                key={'AddSubscriptions'}
            />
            ]) :
        ([
            <ProfileTabStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{headerTitle: appName()}}
                key={"LoginScreen"}
            />,
            <ProfileTabStack.Screen
                name="RegisterScreen"
                component={RegisterScreen}
                options={{headerTitle: appName()}}
                key={"RegisterScreen"}
            />
        ])
    return (
        <ProfileTabStack.Navigator>
            {stack}
        </ProfileTabStack.Navigator>
    );
}
