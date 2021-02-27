import React, {useState} from 'react'
import {Text, TextInput, useColorScheme, View} from 'react-native'
import {getStyle} from '../assets/Stylesheets/Styles'
import {Icon} from "react-native-elements";

export default function Editable ({textIn, editText, type, onEndEditing = ()=>{}, deletable = false,
                                      onDelete = ()=>{}}: renderProps, multiline=false) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const [text, onChangeText] = useState(textIn);
    let x = type + ":  ";

    let middle = () => {
        if(multiline){
            return <TextInput style={styles.inputText}
                              onChangeText={text=>{onChangeText(text); editText(text)}}
                              value={text}
                              onEndEditing={onEndEditing}
                              multiline
            />
        } else {
            return <TextInput style={styles.inputText}
                       onChangeText={text=>{onChangeText(text); editText(text)}}
                       value={text}
                       onEndEditing={onEndEditing}
            />
        }
    }

    return (
        <View style={styles.inputView}>
            <Text style={styles.subText}>{x}</Text>
            {middle()}
            {deletable && <Icon name={'remove-circle'}
                                underlayColor = 'transparent'
                                iconStyle={styles.Icon3}
                                onPress={onDelete}/>
            }

        </View>

    )
}

interface renderProps {
    textIn: string,
    editText: (text:string) => void
    type:string,
    onEndEditing?: ()=>void,
    deletable?: boolean,
    onDelete?: ()=>void,
    multiline?: boolean
}
