import * as React from 'react';
import {Button, ScrollView, StyleSheet, useColorScheme, Text, View} from "react-native";
// @ts-ignore
import { useNavigation } from '@react-navigation/native';
import {buttonColor, getBackgroundColor, getStyle} from "../assets/Stylesheets/Styles";

// TODO: Payment info, dynamify, and probably change the way the text stuff is styled in the ScrollView

export default function PlanUpdatePopup() {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    const styles = getStyle(scheme);
    return(
        <View style={{height: '100%', backgroundColor: getBackgroundColor(scheme)}}>
            <View style={styles.header}>
                <Text style={styles.title}>Confirm New Plan:</Text>
                <Button title="Update Plan"
                        color= {buttonColor}
                        onPress={()=> navigation.navigate('BugsTabScreen')}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.caption}>This is a paragraph</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.title}>Payment information:</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.caption}>I'm just gonna copy this part from Kahero later</Text>
                    </View>
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