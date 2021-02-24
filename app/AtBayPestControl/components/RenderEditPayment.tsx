import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from "../assets/Stylesheets/Styles";
import Payment from "../assets/Classes/Payment";
import {defaultMarker} from "../assets/text/text";

export default function renderEditPayment ({payment, index, onPressDelete, onPressDefault, onView}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    let card = payment.getCardNumber().replace(/\s/g, "");

    let subText = payment.getCardType();
    if (index == 0) {
        if (subText === ''){
            subText += defaultMarker();
        } else {
            subText += ' ' + defaultMarker();
        }
    }

    return (
        <TouchableOpacity onPress={onView}>
            <View style={styles.container}>
                <View style={styles.iconRow}>
                    <Icon
                        name= 'remove-circle'
                        underlayColor = 'transparent'
                        iconStyle={styles.Icon4}
                        onPress={onPressDelete}
                    />
                </View>
                <View style={styles.Row}>
                    <View style={styles.column}>
                        <Text style={[styles.Text, {letterSpacing: .5, fontSize:18}]}>
                            {"⨯⨯⨯⨯-⨯⨯⨯⨯-⨯⨯⨯⨯-" + card.substr(card.length - 4,)}
                        </Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {subText !== '' && (
                            <Text style={styles.subText}>
                                {subText}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.editRow}>
                    {index != 0 && (
                        <Text style={styles.link} onPress={onPressDefault}>
                            Set as Default
                        </Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    payment: Payment
    index: number
    onPressDelete: () => void
    onPressDefault: () => void
    onView: () => void
}
