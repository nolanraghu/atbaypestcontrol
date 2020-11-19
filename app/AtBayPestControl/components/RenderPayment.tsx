import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from "../assets/Stylesheets/Styles";

export default function renderItem ({card, index, name, onPressEdit, onPressPayment}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    card = card.replace(/\s/g, "")

    return (
        <TouchableOpacity onPress={() => onPressPayment()}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'payment'
                            underlayColor = 'transparent'
                            iconStyle={styles.Icon}
                            onPress={() => onPressPayment()}
                        />
                    )}
                </View>
                <View style={styles.Row}>
                    <View style={styles.column}>
                        <Text style={styles.payText}>{"xxxx-xxxx-xxxx-" + card.substr(card.length - 4,)}</Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {name.length !== 0 && (
                            <Text style={styles.subText}>{name}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.editRow}>
                    <Icon
                        name="edit"
                        underlayColor="transparent"
                        iconStyle={styles.Icon}
                        onPress={() => onPressEdit()}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    card: string
    index: number
    name: string
    onPressEdit: () => void
    onPressPayment: () => void
}