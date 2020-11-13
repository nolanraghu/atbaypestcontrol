import {useNavigation} from "@react-navigation/native";
import {Image, Pressable, Text, useColorScheme} from "react-native";
import {getBackgroundColor, getStyle} from "../assets/Stylesheets/Styles";
import * as React from "react";
import {useState} from "react";
import {getUser} from "../assets/Data/Data";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";
import Infestation from "../Assets/Classes/Infestation";
import User from "../Assets/Classes/User";
import Plan from "../Assets/Classes/Plan";

export default function BugPressable({bug}: bugProps){
    const navigation = useNavigation();
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const [user, updateUser] = useState(getUser())

    const getPressStyle = (stateString: string, preventionButton: boolean) => {
        switch (stateString){
            case 'off':
                return (preventionButton? styles.preventionButtonOff: styles.fullButtonOff);
            case 'on':
                return (preventionButton? styles.preventionButtonOn: styles.fullButtonOn);
            case 'pending':
                return (preventionButton? styles.preventionButtonPending: styles.fullButtonPending);
        }
    }

    return(
        <Pressable style={getPressStyle(user.getPlan().getButtonStatus(bug), bug.isPreventionPlan())}
                   onPress={()=> navigation.navigate('BugInfoPopupScreen', {
                       infestation: bug
                   })}
                   android_ripple= {{color: getBackgroundColor(scheme)}}>

            <Image source={bug.getBugImage()} style={styles.buttonImage}/>
            <Text style={bug.isPreventionPlan()?
                styles.preventionText :
                styles.fullText}>{bug.getBugName()}</Text>

        </Pressable>
    );
}

interface bugProps{
    bug: Infestation
}