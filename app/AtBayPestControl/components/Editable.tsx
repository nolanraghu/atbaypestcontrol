import React, {useState} from 'react'
import {Text, TextInput, TouchableOpacity, useColorScheme, View} from 'react-native'
import { Icon } from 'react-native-elements'
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from "../assets/Classes/Email";
import {save} from "../assets/Data/Data";
import {useDispatch} from "react-redux";
import {changePlan} from "../redux/action";

export default function Editable ({textIn, editText, type}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const dispatch = useDispatch()
    const [text, onChangeText] = useState(textIn);
    let x = type + ": ";

    return (
        <View style={{flexDirection: "row"}}>
            <Text style={styles.Text}>{x}</Text>
            <TextInput style={[styles.inputText]}
                       onChangeText={text=>{onChangeText(text); editText(text);save();dispatch(changePlan())}}
                       value={text}
            />
        </View>

    )
}

interface renderProps {
    textIn: string,
    editText: (text:string) => void
    type:string,
}
