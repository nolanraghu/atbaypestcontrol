import React from 'react';
import {StyleSheet, Text, View, ScrollView, useColorScheme} from 'react-native';
import PaymentFormView from './PaymentFormView';
import {getUser} from "../assets/Data/Data";
import {getStyle} from "../assets/Stylesheets/Styles";

/**
 * The function renders a view with PaymentFormView
 */
export default function AddSubscriptionView({onSubmit, submitted, error}:any) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
        return (
            <View style={styles.screen}>
                <ScrollView style={styles.scroll}>
                    <View style={[styles.header, {flexWrap: 'wrap'}]}>
                        <Text style={[styles.title, {marginBottom: 2}]}>
                            Please Enter your payment information to complete this purchase.
                        </Text>
                        <Text style={[styles.caption, {marginBottom: 0}]}>
                            Subscription Plan: {getUser().getPlan().getCurrentPrice()}$/month
                        </Text>
                    </View>
                    <View style={styles.section}>
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