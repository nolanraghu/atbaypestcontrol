import React from 'react'
import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle, buttonColor, getBackgroundColor} from '../assets/Stylesheets/Styles'

export default function renderItem ({email, index, name, onPressEmail}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <TouchableOpacity onPress={() => onPressEmail(email)}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'email'
                            underlayColor = 'transparent'
                            iconStyle={styles.Icon}
                            onPress={() => onPressEmail()}
                        />
                    )}
                </View>
                <View style={styles.Row}>
                    <View style={styles.column}>
                        <Text style={styles.Text}>{email}</Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {name.length !== 0 && (
                            <Text style={styles.subText}>{name}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    email: string
    index: number
    name: string
    onPressEmail: (email?: string) => void
}

