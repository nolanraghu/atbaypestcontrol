import React from 'react'
import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle, buttonColor, getBackgroundColor} from '../assets/Stylesheets/Styles'

export default function renderItem ({location, index, onPressPlace}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <TouchableOpacity onPress={() => onPressPlace()}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'place'
                            underlayColor = 'transparent'
                            iconStyle={styles.Icon}
                            onPress={() => onPressPlace()}
                        />
                    )}
                </View>
                <View style={styles.Row}>
                    <View style={styles.column}>
                        <Text style={styles.Text}>{location[0] + ', ' + location[1]}</Text>
                    </View>
                    <View style={styles.nameColumn}>
                        {location[2].length !== 0 && (
                            <Text style={styles.subText}>{location[2] + ', ' + location[3]}</Text>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

interface renderProps {
    location: string[]
    index: number
    onPressPlace: () => void
}