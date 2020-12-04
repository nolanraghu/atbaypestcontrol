import React from 'react'
import {Text, useColorScheme, View} from 'react-native'
import {Input} from "react-native-elements";
import {getStyle} from '../assets/Stylesheets/Styles'
import {getUser} from "../assets/Data/Data";

export default function renderText ({placeHolder, errorMessage, type, onSubmitEditing, submitted}: renderProps) {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    let showErrorMessage = () => {
        if (submitted){
            return errorMessage();
        } else {
            return '';
        }
    }

    return (
        <Input
            placeholder={placeHolder}
            inputStyle={styles.inputText}
            errorMessage={showErrorMessage()}
            errorStyle={{color: 'red'}}
            secureTextEntry={type === 'none'}
            onSubmitEditing={(val) =>
                onSubmitEditing(val.nativeEvent.text)}
            onChangeText={text => onSubmitEditing(text)}
            textContentType={type}
        />
    )
}

interface renderProps {
    placeHolder: string
    errorMessage: () => string
    type: 'username' | 'password' | 'addressCity' | 'addressState' | 'streetAddressLine1' | 'streetAddressLine2' |
        'postalCode' | 'emailAddress' | 'none'
    onSubmitEditing: (text: string) => void
    submitted: boolean
}