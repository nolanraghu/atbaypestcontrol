import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {buttonColor, getBackgroundColor, getStyle} from "../assets/Stylesheets/Styles";
import Payment from "../components/Payment";
import {getUser, PAY} from "../assets/Data/Data";

export default function UpdatePlanPopup() {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const styles = getStyle(scheme);

    const isChangingPlan = getUser().getPlan().hasPendingChanges();

    function renderPay () {

        function onPressPayment () {
            console.log('payed')
        }

        function onPressEdit () {
            console.log('edit')
        }

        let PayArray = PAY.map(function([id, name, card], index) {
            return  <Payment
                key={id}
                index={index}
                name={name}
                card={card}
                onPressEdit={onPressEdit}
                onPressPayment={onPressPayment}
            />
        })

        return (
            <View style={{
                width: '100%',
                paddingTop: 30,
            }}>
                {PayArray[0]}
            </View>
        )
    }

    return(
        <View style={{height: '100%', backgroundColor: getBackgroundColor(scheme)}}>
            <View style={styles.header}>
                <Text style={styles.title}>Confirm Changes:</Text>
                <View>
                    <Button title="Update Plan"
                            color= {buttonColor}
                            onPress={()=> navigation.navigate('BugsTabScreen')}/>
                    <Text style={[styles.fullText, {marginTop: 10}, styles.link]}
                          onPress={()=>{navigation.navigate('BugsTabScreen')}}>
                        Delete changes
                    </Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.caption}>This is a paragraph</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Payment information:</Text>
                    </View>
                    {renderPay()}
                    <View style={styles.section}>
                        <Text style={styles.captionFade}>Notes!</Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.fullText}>New monthly cost: $11.99</Text>
            </View>
        </View>
    )
}