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
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles';
import {getBugInfo} from "../controller/BugPulling";

//TODO: Fix how everything shifts up, fix colors

//@ts-ignore
export default function BugInfoPopup({route, navigation}) {
    const {bugId} = route.params;
    const bugInfo = getBugInfo(bugId);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    //This maps the data onto CaptionImages. There's probably a cleaner way to do this, by just making
    // <CaptionImage> return a list? That seems potentially bad tho
    // I just add this in as JS by putting it in brackets in the ScrollView
    /*
    let captionImageListArr = captionImageListData.map(function(bugInfo, index){
        return <CaptionImage source={bugInfo.image} text={bugInfo.name} key={index}/>
    })
    */
    return(
        <View style={{height: '100%'}}>
            <View style={styles.header}>
                <Text style={styles.title}>{bugInfo.name + " Infestation"}</Text>
                <Button title="Add to Plan"
                        color= {buttonColor}
                        onPress={()=> navigation.navigate('BugsTabScreen')}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {CaptionImage({source: bugInfo.image, text: bugInfo.description})}
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.fullText}>Price to add: $3.99</Text>
            </View>
        </View>
    )
}

function CaptionImage({source, text = 'information'}: CaptionImageProps){
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    //  These states say what text is in the top and in the bottom, defaulting
    // to everything being in the top
    const [topText, setTopText] = useState(text); //This is just so we know what is being displayed
    const [topHeight, setTopHeight] = useState(-1); // -1 means auto, but it messes up if you type 'auto'
    const [bottomText, setBottomText] = useState('');

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
    }

    //This function is because it won't let the state represent numbers and strings
    const getHeight = (height: number) => {
        if(height === -1){
            return 'auto';
        } else {
            return height;
        }
    }

    return(
        <View style={styles.section}>
            <Image source={source}  style={styles.image}/>
            <Text style={[styles.caption, {height: getHeight(topHeight)}]} onTextLayout={_onTextLayout}>{text}</Text>
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
