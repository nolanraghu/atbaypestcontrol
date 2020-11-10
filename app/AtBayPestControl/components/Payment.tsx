import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default function renderItem ({card, index, name, onPressEdit, onPressPayment}: renderProps) {
    card = card.replace(/\s/g, "")

    return (
        <TouchableOpacity onPress={() => onPressPayment()}>
            <View style={[styles.container]}>
                <View style={styles.iconRow}>
                    {index === 0 && (
                        <Icon
                            name= 'payment'
                            underlayColor = 'transparent'
                            iconStyle={styles.payIcon}
                            onPress={() => onPressPayment()}
                        />
                    )}
                </View>
                <View style={styles.payRow}>
                    <View style={styles.payColumn}>
                        <Text style={styles.payText}>{"xxxx-xxxx-xxxx-" + card.substr(card.length - 4,)}</Text>
                    </View>
                    <View style={styles.payNameColumn}>
                        {name.length !== 0 && (
                            <Text style={styles.payNameText}>{name}</Text>
                        )}
                    </View>
                </View>
                <View style={styles.editRow}>
                    <Icon
                        name="edit"
                        underlayColor="transparent"
                        iconStyle={styles.payIcon}
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 25,
    },
    payColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    payIcon: {
        color: 'darkgray',
        fontSize: 30,
    },
    payNameColumn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    payNameText: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    payRow: {
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    payText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconRow: {
        flex: 2,
        justifyContent: 'center',
    },
    editRow: {
        flex: 2,
        justifyContent: 'flex-start',
    },
})