import {Text, useColorScheme, View} from "react-native";
import {getStyle} from "../assets/Stylesheets/Styles";
import TEAM from "../assets/Data/DevTeamInfo";
import * as React from "react";
import Separator from "./Separator";

export default function ProductItem(person: number) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const first = "Email: " + TEAM[person].email;
    const second = "GitHub Username: " + TEAM[person].gitHub;

    return (
        <View>
            <Text style={[styles.Text, {fontWeight:"bold"}]}>{TEAM[person].name}</Text>
            <Text style={styles.Text}>{first}</Text>
            <Text style={styles.Text}>{second}</Text>
            <Text> </Text>
            <Text> </Text>
            {Separator()}
        </View>
    );
}

