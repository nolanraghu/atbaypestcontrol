import React from 'react'
import {Button, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {loginText} from "../assets/Data/allTextLogin";
import InputBox from "../components/RenderTextBox";
import {registerText} from "../assets/Data/allTextRegister";
import {useNavigation} from "@react-navigation/native"
import {getUser} from "../assets/Data/Data";

export default function RegisterScreen () {

    let User = getUser()
    const navigation = useNavigation()
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    let InputArray = registerText.map(function(Text, index) {
        return  <InputBox
            key={index}
            errorMessage={Text.getErrorMessage()}
            type={Text.getType()}
            placeHolder={Text.getPlaceHolder()}
            onSubmitEditing={Text.onSubmit}
        />
    })

    function onPressButton () {
        if (User.validateUser()) navigation.navigate('RegisterScreen');
        else navigation.navigate('ProfileTabScreen');
    }

    function onPressText () {
        navigation.navigate('LoginScreen')
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.loginHeadContainer}>
                    <Text style={styles.loginText}>Register</Text>
                    <Text style={styles.subText}>Please enter your information to register</Text>
                </View>
                <View style={styles.textArray}>
                    {InputArray}
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Button title={'Register'} onPress={onPressButton} color={'green'}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Already have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Login here</Text>
                </View>
            </ScrollView>
        </View>
    )
}

