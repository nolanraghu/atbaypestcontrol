import React from 'react'
import {Text, TextInput, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {getUser} from "../assets/Data/Data";
import {useState} from 'react'
import Separator from "../components/Separator";

export default function LoginScreen () {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let User = getUser();
    const [userName, changeUserName] = useState('');

    function handleButtonPress (val: string) {
        User.changePassword(val);
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginHeadContainer}>
                <Text style={styles.loginText}>Login</Text>
                <Text style={styles.subText}>Please enter your login information</Text>
            </View>
            <View style={styles.loginHeadContainer}>
                <Input
                    placeholder={'User Name'}
                    inputStyle={styles.inputText}
                    errorMessage={'This field should not be empty'}
                    renderErrorMessage={true}
                    errorStyle={{color: 'red'}}
                    onSubmitEditing={(val) =>
                        User.changeUserName(val.nativeEvent.text)}
                    textContentType={'username'}
                />
                <Input
                    placeholder={'Password'}
                    inputStyle={styles.inputText}
                    errorMessage={'This field should not be empty'}
                    secureTextEntry={true}
                    renderErrorMessage={true}
                    errorStyle={{color: 'red'}}
                    onSubmitEditing={(val) =>
                        User.changePassword(val.nativeEvent.text)}
                    textContentType={'password'}
                />
            </View>
        </View>
    )
}