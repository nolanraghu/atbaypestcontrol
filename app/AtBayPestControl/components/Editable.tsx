import React, {useState} from 'react'
import {Text, TextInput, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {save} from "../assets/Data/Data";
import {useDispatch} from "react-redux";
import {changePlan} from "../redux/action";

export default function Editable ({textIn, editText, type, onEndEditing = ()=>{}}: renderProps) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const dispatch = useDispatch()
    const [text, onChangeText] = useState(textIn);
    let x = type + ":  ";

    return (
        <View style={styles.inputView}>
            <Text style={styles.subText}>{x}</Text>
            <TextInput style={styles.inputText}
                       onChangeText={text=>{onChangeText(text); editText(text)}}
                       value={text}
                       onEndEditing={onEndEditing}
            />
        </View>

    )
}

interface renderProps {
    textIn: string,
    editText: (text:string) => void
    type:string,
    onEndEditing?: ()=>void
}
