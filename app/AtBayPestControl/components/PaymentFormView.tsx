import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default function PaymentFormView({onSubmit, submitted, error}:any) {
    const [cardState, setCardState] = useState<any>({valid:false});
    return (
        <View>
            <View>
                <CreditCardInput requiresName onChange={(cardState:any) => {setCardState(cardState)}} />
            </View>
            <View style={styles.buttonWrapper}>
                <Button
                    title='Pay'
                    color='red'
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
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    buttonWrapper: {
        padding: 10,
        zIndex: 100
    },
    alertTextWrapper: {
        flex: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertIconWrapper: {
        padding: 5,
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alertText: {
        color: '#c22',
        fontSize: 16,
        fontWeight: '400'
    },
    alertWrapper: {
        backgroundColor: '#ecb7b7',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 5,
        paddingVertical: 5,
        marginTop: 10
    }
});