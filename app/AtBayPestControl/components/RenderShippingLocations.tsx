import React from 'react'
import {Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from '../assets/Stylesheets/Styles'
import Address from "../assets/Classes/Address";
import {defaultMarker} from "../assets/text/text";

export default function renderItem ({address, index, onPressPlace, onPressEdit = ()=>{}}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let mainText = address.getAddress();
    if(address.getAddress2().length != 0){
        mainText = mainText + ', ' + address.getAddress2();
    }
    let subText = address.getCity() + ', ' + address.getState() + ' ' + address.getZip();
    if (index == 0) {
        if (subText === ''){
            subText += defaultMarker();
        } else {
            subText += ' ' + defaultMarker();
        }
    }

    return (
        <TouchableOpacity onPress={() => onPressPlace()}>
            <View style={styles.container}>
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
                        <Text style={styles.Text}>{mainText}</Text>
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
    address: Address
    index: number
    onPressPlace: () => void
    onPressEdit?: () => void
}