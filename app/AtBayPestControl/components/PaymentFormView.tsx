import React, {useState} from 'react';
import {Text, View, Button, useColorScheme} from 'react-native';
// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';
import {buttonColor, getStyle} from "../assets/Stylesheets/Styles";
import CheckBox from "@react-native-community/checkbox";
import {getUser} from "../assets/Data/Data";
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default function PaymentFormView({onSubmit, submitted, error}:any) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const [cardState, setCardState] = useState<any>({valid:false});
    const [defaultCard, setDefault] = useState(true);
    let firstCard = !getUser().hasPayment();
    return (
        <View>
            <View>
                <CreditCardInput requiresName onChange={(cardState:any) => {setCardState(cardState)}} />
            </View>
            <View style={styles.checkboxView}>
                <CheckBox onCheckColor={buttonColor}
                          disabled={firstCard}
                          value={defaultCard}
                          onValueChange={value => setDefault(value)}/>
                <Text style={styles.checkboxText}>Use as default card</Text>
            </View>
            <View style={styles.buttonView}>
                <Button
                    title='Add card'
                    color={buttonColor}
                    disabled={!cardState.valid || submitted}
                    onPress={() => onSubmit(cardState, defaultCard)}
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