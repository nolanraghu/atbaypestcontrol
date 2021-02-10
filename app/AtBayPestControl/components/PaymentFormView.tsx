import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, useColorScheme} from 'react-native';
// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import {buttonColor, getStyle} from "../assets/Stylesheets/Styles";
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default function PaymentFormView({onSubmit, submitted, error}:any) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const [cardState, setCardState] = useState<any>({valid:false});
    return (
        <View>
            <View>
                <CreditCardInput requiresName onChange={(cardState:any) => {setCardState(cardState)}} />
            </View>
            <View style={{flexDirection: 'row'}}>

            </View>
            <View style={styles.buttonView}>
                <Button
                    title='Add card'
                    color={buttonColor}
                    disabled={!cardState.valid || submitted}
                    onPress={() => onSubmit(cardState)}
                />
                {/* Show errors */}
                {error && (
                    <View style={styles.alertWrapper}>
                        <View style={styles.alertIconWrapper}>
                            <FontAwesome name="exclamation-circle" size={20} style={{ color: '#cc2222' }} />
                        </View>
                        <View style={styles.alertTextWrapper}>
                            <Text style={styles.alertText}>{error}</Text>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}