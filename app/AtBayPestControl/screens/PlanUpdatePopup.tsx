import * as React from 'react';

import { Text, View } from '../components/Themed';
import {Button, ScrollView, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

// TODO: Fix how everything shifts up, fix colors, add payment info, figure out navigating back w/o back button

export default function PlanUpdatePopup() {
    const navigation = useNavigation();
    return(
        <View style={styles.container}>
            <Text style={styles.title}>New Plan:</Text>
            <ScrollView>
                <Text style={styles.caption}>
                    This is all the information about the plan.
                </Text>
                <Text style={styles.caption}>
                    This is another paragraph
                </Text>
                <View style={styles.section}>
                    <Text style={styles.price}>New monthly cost: $11.99</Text>
                    <View style={styles.button}>
                        <Button title="Update Plan" onPress={()=> navigation.navigate('BugsTabScreen')}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        height: '100%'
    },
    popupContainer: {
        width: '90%',
        height: 'auto',
        maxHeight: '74%',
        marginTop: '40%',
        borderRadius: 28,
        backgroundColor: 'rgba(90,98,87,.95)',
        alignSelf: "center",
        alignContent: "center",
        overflow: "hidden"
    },
    title: {
        fontSize: 25,
        padding: '2%',
        margin: '5%',
        width: '60%',
        textAlign: 'center',
    },
    image: {
        borderRadius: 8,
        margin: '5%',
        flex: 1,
        backgroundColor: 'white',
        aspectRatio: 1
    },
    section: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
    },
    caption: {
        flex: 2,
        textAlign: 'center',
        margin: '5%',
    },
    price: {
        textAlign: 'center',
        fontSize: 20,
        margin: '5%',
        marginRight: 0,
        flex: 2,
    },
    button: {
        flex: 1.5,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5%',
    }
})