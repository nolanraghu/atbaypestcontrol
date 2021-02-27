import React from 'react';
import {StyleSheet, Text, View, ScrollView, useColorScheme} from 'react-native';
import PaymentFormView from './PaymentFormView';
import {getUser} from "../assets/Data/Data";
import {getStyle} from "../assets/Stylesheets/Styles";

/**
 * The function renders a view with PaymentFormView
 */
export default function PaymentMethodScreen({onSubmit, submitted, error}:any) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
        return (
            <View style={styles.screen}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Use this form to add a new card to your account
                    </Text>
                </View>
                <ScrollView style={styles.scroll}>
                    <View style={styles.cardArea}>
                        {PaymentFormView({onSubmit, submitted, error})}
                    </View>
                </ScrollView>
                {/* Scrolls to the payment form */}
                {/*<KeyboardSpacer*/}
                {/*    onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }*/}
                {/*/>*/}
            </View>
        );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textWrapper: {
        margin: 10
    },
    infoText: {
        fontSize: 18,
        textAlign: 'center'
    },
    cardFormWrapper: {
        padding: 10,
        margin: 10
    }
});