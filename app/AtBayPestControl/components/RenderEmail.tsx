import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from "../assets/Classes/Email";
import {defaultMarker} from "../assets/text/text";

export default function renderItem ({email, index, onPressEmail, onPressEdit = ()=>{}}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let subText = '';
    if (index == 0) {
        if (subText === ''){
            subText += defaultMarker();
        } else {
            subText += ' ' + defaultMarker();
        }
    }

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
                        {subText !== '' && (
                            <Text style={styles.subText}>
                                {subText}
                            </Text>
                        )}
                    </View>
                </View>
                <View style={styles.editRow}>
                    {index === 0 && (
                        <Icon
                            name="edit"
                            underlayColor="transparent"
                            iconStyle={styles.Icon}
                            onPress={() => onPressEdit()}
                        />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    email: Email
    index: number
    onPressEmail: (email?: string) => void
    onPressEdit?: () => void
}

