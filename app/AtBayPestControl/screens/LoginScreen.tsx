import React from 'react'
import {Button, Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {getUser} from "../assets/Data/Data";
import {loginText} from '../assets/Data/allTextLogin'
import InputBox from "../components/RenderTextBox";
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen () {

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();
    let User = getUser();

    let InputArray = loginText.map(function(Text, index) {
        return  <InputBox
                    key={index}
                    errorMessage={Text.getErrorMessage()}
                    type={Text.getType()}
                    placeHolder={Text.getPlaceHolder()}
                    onSubmitEditing={Text.onSubmit}
                />
    })

    function onPressButton () {
        console.debug(User.validateUser(), User.validateAddress(), User.validatePassword(), User.validateCity(),
            User.validateZip(), User.validateEmail())
        if (User.validateUser()) navigation.navigate('LoginScreen');
        else navigation.navigate('ProfileTabScreen');
    }

    function onPressText () {
        navigation.navigate('RegisterScreen')
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginHeadContainer}>
                <Text style={styles.loginText}>Login</Text>
                <Text style={styles.subText}>Please enter your login information</Text>
            </View>
            <View style={styles.loginHeadContainer}>
                <View style={styles.textArray}>
                    {InputArray}
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Button  title={'Submit'} onPress={onPressButton} color={'green'}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Don't have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Register here</Text>
                </View>
            </View>
        </View>
    )
}