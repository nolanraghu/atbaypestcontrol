import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default function renderItem ({location, index, onPressPlace}: renderProps) {
    return (
        <TouchableOpacity onPress={() => onPressPlace()}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'place'
                            underlayColor = 'transparent'
                            iconStyle={styles.emailIcon}
                            onPress={() => onPressPlace()}
                        />
                    )}
                </View>
                <View style={styles.emailRow}>
                    <View style={styles.emailColumn}>
                        <Text style={styles.emailText}>{location[0] + ', ' + location[1]}</Text>
                    </View>
                    <View style={styles.emailNameColumn}>
                        {location[2].length !== 0 && (
                            <Text style={styles.emailNameText}>{location[2] + ', ' + location[3]}</Text>
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    emailColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    emailIcon: {
        color: 'gray',
        fontSize: 30,
    },
    emailNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    emailNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    emailRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    emailText: {
        fontSize: 16,
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
})