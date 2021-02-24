import * as React from 'react';
import {Card} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    View, Button
} from 'react-native';
import {buttonColor, getStyle} from '../assets/Stylesheets/Styles'
import { useNavigation } from '@react-navigation/native';
import {getUser} from "../assets/Data/Data";
import {addPayment} from "../components/addPayment";
import Payment from "../components/RenderEditPayment";
import {useState} from "react";

export default function EditPayments() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();

    const [i, update] = useState(0);

    let keys = 0;

    let payArray;

    if(!user.hasPayment()){
        payArray = addPayment('EditPayments');
    } else {
        payArray = user.getPayments().map(function(payment, index) {
            return  <Payment
                key={keys++}
                payment={payment}
                index={index}
                onPressDefault={()=>{user.setDefaultPayment(index); update(i+1)}}
                onPressDelete={()=>{user.deletePayment(index); update(i+1)}}
                onView={()=>{}}
            />
        })
    }

    let addButton = addPayment('EditPayments', true);

    let pressButton = () => {
        navigation.navigate("ProfileTabScreen", {changed: true});
    }

    let endButton =
        <View style={styles.deleteProfile} key={keys++}>
            <Button
                title={"done"}
                onPress={pressButton}
                color={buttonColor}/>
        </View>


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Card containerStyle={[styles.cardContainer]}>
                    <View style={styles.emailContainer}>
                        {payArray}
                    </View>
                    {addButton}
                    {endButton}
                </Card>
            </View>
        </ScrollView>
    )
};

