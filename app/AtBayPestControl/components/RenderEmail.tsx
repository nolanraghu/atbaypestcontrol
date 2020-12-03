import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from "../assets/Classes/Email";

export default function renderItem ({email, index, onPressEmail}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <TouchableOpacity onPress={() => onPressEmail(email.getEmail())}>
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
                        <Text style={styles.Text}>{email.getEmail()}</Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {email.getType().length !== 0 && (
                            <Text style={styles.subText}>{'Main Email'}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    email: Email
    index: number
    onPressEmail: (email?: string) => void
}

