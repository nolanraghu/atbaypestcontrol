import React from 'react'
import {Text, useColorScheme, View} from 'react-native'
import {Input} from "react-native-elements";
import {getStyle} from '../assets/Stylesheets/Styles'

export default function renderItem ({name, placeHolder, errorMessage, index}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <Input
            placeholder= {placeHolder}
            errorMessage= {errorMessage}
            label={name}
            containerStyle={styles.container}
        />
    )
}

interface renderProps {
    name: string
    placeHolder: string
    errorMessage: string
    index: number
}