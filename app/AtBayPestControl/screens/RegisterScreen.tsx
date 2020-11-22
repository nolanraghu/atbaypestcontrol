import React from 'react'
import {Text, TextInput, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";

export default function RegisterScreen () {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);



    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <Input
                placeholder={'User Name'}
                errorMessage={'Please enter a user name'}
                errorStyle={{color: 'red'}}
            />
        </View>
    )
}

