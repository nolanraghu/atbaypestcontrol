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

export default function PaymentPopup (){
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
}