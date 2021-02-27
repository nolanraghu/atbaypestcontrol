import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {Icon} from "react-native-elements";
import {noPaymentText} from "../assets/text/text";
import * as React from "react";
import {getStyle} from "../assets/Stylesheets/Styles";
import { useNavigation } from "@react-navigation/native";

export default function addPayment({screen, additional = false}:addPaymentProps){
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let navigation = useNavigation();

    return (
        <TouchableOpacity
            style={{width: '100%'}}
            onPress={()=>{navigation.navigate('AddSubscriptions', {lastScreen:screen})}}
        >
            <View style={styles.container}>
                <View style={styles.iconRow}>
                    <Icon
                        name={'add-circle'}
                        underlayColor = 'transparent'
                        iconStyle={styles.Icon}
                        onPress={()=>{navigation.navigate('AddSubscriptions', {lastScreen:screen})}}
                    />
                </View>
                <View style={styles.Row}>
                    <View style={[styles.column, {marginVertical: '3%'}]}>
                        <Text style={styles.Text}>{additional? 'Add another payment method':noPaymentText()}</Text>
                    </View>
                </View>
                <View style={styles.editRow}>

                </View>
            </View>
        </TouchableOpacity>
    )
}

interface addPaymentProps {
    screen: string,
    additional?: boolean
}