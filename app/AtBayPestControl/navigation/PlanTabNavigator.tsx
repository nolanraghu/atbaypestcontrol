import {createStackNavigator} from "@react-navigation/stack";
import {PlanTabParamList} from "../types";
import PlanTabScreen from "../screens/PlanTabScreen";
import * as React from "react";

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

export default PlanTabNavigator;
