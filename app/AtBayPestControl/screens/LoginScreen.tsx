import React from 'react'
import {Button, Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {getUser} from "../assets/Data/Data";
import {loginText} from '../assets/Data/allTextLogin'
import InputBox from "../components/RenderTextBox";
import {StackActions} from "react-navigation";
import {useDispatch} from "react-redux";
import {LOG_IN, logIn} from "../redux/action";

export default function LoginScreen ({route, navigation}: any) {
    const params = route.params;
    let goingBack = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        goingBack = params.goingBack;
    }

    const dispatch = useDispatch();

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
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

    function onPressText () {
        navigation.navigate('RegisterScreen', {goingBack: goingBack})
    }

    function onPressButton () {
        getUser().logIn();
        if(goingBack){
            navigation.goBack();
        }
        dispatch(logIn())
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