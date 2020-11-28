import React from 'react'
import {Button, ScrollView, Text, TextInput, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Input} from "react-native-elements";
import {loginText} from "../assets/Data/allTextLogin";
import InputBox from "../components/RenderTextBox";
import {registerText} from "../assets/Data/allTextRegister";
import {getUser} from "../assets/Data/Data";
import {logIn} from "../redux/action";
import {useDispatch} from "react-redux";

export default function RegisterScreen ({route, navigation}: any) {
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
                {InputArray}
                <Button  title={'Submit'} onPress={register}/>
            </ScrollView>
        </View>
    )
}

