import React from 'react'
import {Button, ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {loginText} from "../assets/Data/allTextLogin";
import {Input} from "react-native-elements";
import InputBox from "../components/RenderTextBox";
import {registerText} from "../assets/Data/allTextRegister";
import {getUser} from "../assets/Data/Data";
import {logIn} from "../redux/action";
import {useDispatch} from "react-redux";

export default function RegisterScreen({ route, navigation }: any) {
    let User = getUser();
    const params = route.params;
    let goingBack = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        goingBack = params.goingBack;
    }
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const dispatch = useDispatch();

    let InputArray = registerText.map(function(Text, index) {
        return  <InputBox
            key={index}
            errorMessage={Text.getErrorMessage()}
            type={Text.getType()}
            placeHolder={Text.getPlaceHolder()}
            onSubmitEditing={Text.onSubmit}
        />
    })

    function onPressText() {
        navigation.navigate('LoginScreen')
    }

    let register = () => {
        getUser().logIn();
        if(goingBack){
            navigation.pop();
            navigation.goBack();
        }
        dispatch(logIn());
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
                    <Button title={'Register'} onPress={register} color={'green'}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Already have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Login here</Text>
                </View>
            </ScrollView>
        </View>
    )
}

