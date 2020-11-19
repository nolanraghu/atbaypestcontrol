import {createStackNavigator} from "@react-navigation/stack";
import {PlanTabParamList} from "../types";
import PlanTabScreen from "../screens/PlanTabScreen";
import * as React from "react";
import PlanProductPopup from "../screens/PlanProductPopup";
import {appName} from "../assets/text/text";
import ConfirmPurchasePopup from "../screens/ConfirmPurchasePopup";

const PlanTabStack = createStackNavigator<PlanTabParamList>();

function PlanTabNavigator() {
    return (
        <PlanTabStack.Navigator>
            <PlanTabStack.Screen
                name="PlanTabScreen"
                component={PlanTabScreen}
                options={{headerTitle: appName()}}
            />
            <PlanTabStack.Screen
                name="PlanProductPopup" /*try saying that five times fast*/
                component={PlanProductPopup}
                options={{headerTitle: appName()}}
            />
            <PlanTabStack.Screen
                name="ConfirmPurchasePopup"
                component={ConfirmPurchasePopup}
                options={{headerTitle: appName()}}
            />
        </PlanTabStack.Navigator>
    );
}

export default PlanTabNavigator;
