import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types'

export default function renderItem (props: renderProps) {
    return (
        <TouchableOpacity onPress={() => props.onPressEmail(props.email)}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {props.index === 0 && (
                        <Icon
                            name= 'email'
                            underlayColor = 'transparent'
                            iconStyle={styles.emailIcon}
                            onPress={() => props.onPressEmail()}
                        />
                    )}
                </View>
                <View style={styles.emailRow}>
                    <View style={styles.emailColumn}>
                        <Text style={styles.emailText}>{props.email}</Text>
                    </View>
                    <View style={styles.emailNameColumn}>
                        {props.name.length !== 0 && (
                            <Text style={styles.emailNameText}>{props.name}</Text>
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