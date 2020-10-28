import * as React from 'react';

import { Text, View } from '../components/Themed';
import {
    Button,
    Image,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TextLayoutEventData,
    useColorScheme
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useState} from "react";

// This is just an array of arrays of parameters for <CaptionImage>
const captionImageListData = [
    [require('../assets/images/ant.png'),
        'Ant example info paragraph here is for you to know how this works and so ' +
        'ant. Example info paragraph here is for you to know how this works and so ' +
        'ant example info paragraph here. Is for you to know how this works and so ' +
        'ant example info paragraph here is for you to know how this works and so ' +
        'ant example info paragraph here is for you to know how this works and so ' +
        'ant example info paragraph here is for you to know. \n     How this works and so ' +
        'ant example info paragraph. Here is for you to know how this works and so ' +
        'ant example info paragraph here is for you to know how this works and so ' +
        'ant example info paragraph here is for you to know how this works and so ' +
        'ant example info paragraph here is. For you to know how this works and so ' +
        'ant example info paragraph here is for you to know how this works and so.'],
    [require('../assets/images/1831477.webp'),
        'It turns out, making text wrap in React is VERY difficult :/. The good news is, I did it!']
]

//TODO: Fix how everything shifts up, fix colors

export default function BugInfoPopup() {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    let styles = stylesLight;
    if(scheme === "dark"){
        styles = stylesDark;
    }

    //This maps the data onto CaptionImages. There's probably a cleaner way to do this, by just making
    // <CaptionImage> return a list? That seems potentially bad tho
    // I just add this in as JS by putting it in brackets in the ScrollView
    let captionImageListArr = captionImageListData.map(function([source, text], index){
        return <CaptionImage source={source} text={text} key={index}/>
    })

    return(
        <View style={styles.container}>
            <View style={styles.back}>
                <Text style={styles.title}>Ant Infestation:</Text>
            </View>
            <ScrollView>
                {captionImageListArr}
            </ScrollView>
            <View style={styles.back}>
                <View style={styles.section}>
                    <Text style={styles.price}>Price to add: $3.99</Text>
                    <View style={styles.button}>
                        <Button title="Add to Plan" onPress={()=> navigation.navigate('BugsTabScreen')}/>
                    </View>
                </View>
            </View>
        </View>
    )
}

function CaptionImage({source, text = 'information'}: CaptionImageProps){
    const scheme = useColorScheme();
    let styles = stylesLight;
    if(scheme === "dark"){
        styles = stylesDark;
    }

    //  These states say what text is in the top and in the bottom, defaulting
    // to everything being in the top
    const [topText, setTopText] = useState(text);
    const [bottomText, setBottomText] = useState('');

    //  When we layout the text, it will split the text into top and bottom, and if
    // it needs to be split, it will show that
    const _onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
        let top = "";
        let bottom = "";
        //  Right now it just splits it into 8 lines by the picture, the rest underneath.
        // If we need to measure it, we can use e.nativeEvent.lines[].height
        for(let i = 0; i < e.nativeEvent.lines.length; i++){
            if (i < 8){
                top = top + e.nativeEvent.lines[i].text;
            } else {
                bottom = bottom + e.nativeEvent.lines[i].text;
            }
        }
        if(top != topText){
            setTopText(top);
            setBottomText(bottom);
        }
    }
    return(
        <View style={styles.section}>
            <Image source={source}  style={styles.image}/>
            <Text style={styles.caption} onTextLayout={_onTextLayout}>{topText}</Text>
            <Text style={styles.caption2}>{bottomText}</Text>
        </View>
    )
}

interface CaptionImageProps{
    source: object
    text?: string
}

const stylesLight = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        height: '100%'
    },
    popupContainer: {
        width: '90%',
        height: 'auto',
        maxHeight: '74%',
        marginTop: '40%',
        borderRadius: 28,
        backgroundColor: 'rgba(90,98,87,.95)',
        alignSelf: "center",
        alignContent: "center",
        overflow: "hidden"
    },
    title: {
        fontSize: 25,
        padding: '2%',
        margin: '5%',
        width: '60%',
        textAlign: 'center',
    },
    image: {
        borderRadius: 8,
        margin: '5%',
        flex: 1,
        backgroundColor: 'white',
        aspectRatio: 1,
    },
    section: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    caption: {
        flex: 2,
        textAlign: 'left',
        margin: '5%',
        marginBottom: 0,
        marginLeft: '2.5%',
    },
    caption2: {
        textAlign: 'left',
        margin: '5%',
        width: '90%',
        marginTop: -2.5
    },
    price: {
        textAlign: 'center',
        fontSize: 20,
        margin: '5%',
        marginRight: 0,
        flex: 2,
    },
    button: {
        flex: 1.5,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5%',
    },
    back: {
        backgroundColor: 'rgb(226,226,226)'
    }
})
const stylesDark = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        height: '100%'
    },
    popupContainer: {
        width: '90%',
        height: 'auto',
        maxHeight: '74%',
        marginTop: '40%',
        borderRadius: 28,
        backgroundColor: 'rgba(90,98,87,.95)',
        alignSelf: "center",
        alignContent: "center",
        overflow: "hidden"
    },
    title: {
        fontSize: 25,
        padding: '2%',
        margin: '5%',
        width: '60%',
        textAlign: 'center',
    },
    image: {
        borderRadius: 8,
        margin: '5%',
        flex: 1,
        backgroundColor: 'white',
        aspectRatio: 1,
    },
    section: {
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    caption: {
        flex: 2,
        textAlign: 'left',
        margin: '5%',
        marginBottom: 0,
        marginLeft: '2.5%',
    },
    caption2: {
        textAlign: 'left',
        margin: '5%',
        width: '90%',
        marginTop: -2.5
    },
    price: {
        textAlign: 'center',
        fontSize: 20,
        margin: '5%',
        marginRight: 0,
        flex: 2,
    },
    button: {
        flex: 1.5,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '5%',
    },
    back: {
        backgroundColor: 'rgb(41,41,41)'
    }
})
