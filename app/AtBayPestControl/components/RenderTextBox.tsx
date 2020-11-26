import React from 'react'
import {Text, useColorScheme, View} from 'react-native'
import {Input} from "react-native-elements";
import {getStyle} from '../assets/Stylesheets/Styles'
import {getUser} from "../assets/Data/Data";

export default function renderText ({placeHolder, errorMessage, type, onSubmitEditing}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return (
        <Input
            placeholder={placeHolder}
            inputStyle={styles.inputText}
            errorMessage={errorMessage}
            renderErrorMessage={false}
            errorStyle={{color: 'red'}}
            secureTextEntry={type === 'password'}
            onSubmitEditing={(val) =>
                onSubmitEditing(val.nativeEvent.text)}
            onChangeText={text => onSubmitEditing(text)}
            textContentType={type}
        />
    )
}

interface renderProps {
    placeHolder: string
    errorMessage: string
    type: 'username' | 'password' | 'addressCity' | 'addressState' | 'streetAddressLine1' | 'streetAddressLine2' |
        'postalCode' | 'emailAddress'
    onSubmitEditing: (text: string) => void
}