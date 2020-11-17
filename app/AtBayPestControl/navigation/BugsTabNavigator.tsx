import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {BugsTabParamList} from "../types";
import BugsTabScreen from "../screens/BugsTabScreen";
import BugInfoPopup from "../screens/BugInfoPopup";
import UpdatePlanPopup from "../screens/UpdatePlanPopup";
import {appName} from "../assets/text/text";

const BugsTabStack = createStackNavigator<BugsTabParamList>();

function BugsTabNavigator() {
    return (
        <BugsTabStack.Navigator>
            <BugsTabStack.Screen
                name="BugsTabScreen"
                component={BugsTabScreen}
                options={{ headerTitle: appName()}}
            />
            <BugsTabStack.Screen
                name="BugInfoPopupScreen"
                component={BugInfoPopup}
                options={{ headerTitle: appName()}}
            />
            <BugsTabStack.Screen
                name="PlanUpdatePopupScreen"
                component={UpdatePlanPopup}
                options={{ headerTitle: appName()}}
            />
        </BugsTabStack.Navigator>);
}

export default BugsTabNavigator;
