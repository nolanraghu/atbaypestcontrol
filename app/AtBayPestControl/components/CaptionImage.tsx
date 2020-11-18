import {Image, NativeSyntheticEvent, TextLayoutEventData, useColorScheme, Text, View} from "react-native";
import {getStyle} from "../assets/Stylesheets/Styles";
import {useState} from "react";
import * as React from "react";

export default function CaptionImage({source, text = 'information'}: CaptionImageProps){
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    //  These states say what text is in the top and in the bottom, defaulting
    // to everything being in the top
    const [topText, setTopText] = useState(text); //This is just so we know what is being displayed
    const [topHeight, setTopHeight] = useState(-1); // -1 means auto, but it messes up if you type 'auto'
    const [bottomText, setBottomText] = useState('');
    // This is so if there's nothing in the bottom text box, we don't get a huge margin underneath it
    const [hasBottom, setHasBottom] = useState(false)

    //  When we layout the text, it will split the text into top and bottom, and if
    // it needs to be split, it will show that
    const _onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
        let top = "";
        let bottom = "";
        let height = 0;
        //  Right now it just splits it into 8 lines by the picture, the rest underneath.
        // If we need to measure it, we can use e.nativeEvent.lines[].height
        for(let i = 0; i < e.nativeEvent.lines.length; i++){
            if (i < 8){
                top = top + e.nativeEvent.lines[i].text;
                height += e.nativeEvent.lines[i].height;
            } else {
                bottom = bottom + e.nativeEvent.lines[i].text;
            }
        }
        if(top != topText){
            // I had to change the way this was done because changing the text on top
            // was somehow changing how much text could display in a single line
            setTopHeight(height);
            setTopText(top);
            setBottomText(bottom);
        }
        if(bottom === ""){
            setHasBottom(false);
        } else {
            setHasBottom(true);
        }
    }

    //This function is because it won't let the state represent numbers and strings
    const getHeight = (height: number) => {
        if(height === -1){
            return 'auto';
        } else {
            return height;
        }
    }

    function renderBottomText(hasBottom:boolean){
        if(hasBottom){
            return <Text style={styles.caption2}>{bottomText}</Text>
        } else {
            return;
        }
    }

    return(
        <View style={styles.section}>
            <Image source={source}  style={styles.image}/>
            <Text style={[styles.caption1, {height: getHeight(topHeight)}]} onTextLayout={_onTextLayout}>{text}</Text>
            {renderBottomText(hasBottom)}
        </View>
    )
}

interface CaptionImageProps{
    source: object
    text?: string | any
}