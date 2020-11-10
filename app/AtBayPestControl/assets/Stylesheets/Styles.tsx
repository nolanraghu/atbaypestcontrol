import {ColorSchemeName, StyleSheet} from "react-native";

export const buttonColor = 'rgb(72,190,87)';
export const tintColor = 'rgb(63,164,76)';

const backgroundDark = 'rgb(27,27,27)';
const headerDark = 'rgb(50,50,50)';
const textDark = 'rgb(229,229,229)';
const onButtonDark = 'rgb(105,105,105)';
const offButtonDark = 'rgb(60,60,60)';
const highlightDark = 'lightgreen';

const backgroundLight = 'rgb(236,236,236)';
const headerLight = 'rgb(245,245,245)';
const textLight = 'rgb(50,50,50)';
const onButtonLight = 'white';
const offButtonLight = 'rgb(231,231,231)';
const highlightLight = 'rgb(72,190,87)';

export function getBackgroundColor(state:ColorSchemeName){
    if(state === 'dark'){
        return backgroundDark;
    } else {
        return backgroundLight;
    }
}

export function getStyle(state:ColorSchemeName){
    let background, header, text, onButton, offButton, highlight, fadedText

    if(state === 'dark'){
        background = backgroundDark;
        header = headerDark;
        text = textDark;
        onButton = onButtonDark;
        offButton = offButtonDark;
        highlight = highlightDark;
    } else {
        background = backgroundLight;
        header = headerLight;
        text = textLight;
        onButton = onButtonLight;
        offButton = offButtonLight;
        highlight = highlightLight;
    }
    return StyleSheet.create({
        screen: {
            height: '100%',
            backgroundColor: background
        },
        container: {
            padding: '2.5%',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: background
        },
        header: {
            padding: '3%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: header,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10,
            color: text
        },
        product: {
            width: '94%',
            margin: '3%',
            marginBottom: '3.5%',
            aspectRatio: 3,
            backgroundColor: onButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row",
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        fullButtonOn: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: onButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        fullButtonOff: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: offButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'rgb(0,0,0)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            opacity: .8,
        },
        fullButtonPending: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: offButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
            opacity: .8
        },
        preventionButtonOff: {
            width: '89%',
            margin: '5.5%',
            marginBottom: '9%',
            aspectRatio: 3,
            backgroundColor: offButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            opacity: .8,
        },
        preventionButtonOn: {
            width: '89%',
            margin: '5.5%',
            marginBottom: '9%',
            aspectRatio: 3,
            backgroundColor: onButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        preventionButtonPending: {
            width: '89%',
            margin: '5.5%',
            marginBottom: '9%',
            aspectRatio: 3,
            backgroundColor: offButton,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'rgb(0,0,0)',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
            opacity: .8
        },
        buttonImage: {
            flex: 1,
            height: '70%',
            width: '70%',
            alignSelf: "center",
            resizeMode: 'contain',
            borderRadius: 8
        },
        preventionText: {
            color: text,
            alignSelf: 'center',
            flex: 2,
            textAlign: "center",
            fontSize: 24
        },
        fullText: {
            color: text,
            alignSelf: 'center',
            textAlign: "center"
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
            textAlign: 'left',
            margin: '4%',
            marginLeft: 10,
            color: text,
        },
        caption1: {
            flex: 2,
            textAlign: 'left',
            margin: '5%',
            marginBottom: 0,
            marginLeft: '2.5%',
            color: text,
        },
        caption2: {
            textAlign: 'left',
            margin: '5%',
            width: '90%',
            marginTop: -2.5,
            color: text,
        },
        captionFade: {
            textAlign: 'left',
            margin: '4%',
            marginLeft: 10,
            color: text,
            opacity: .45
        },
        price: {
            textAlign: 'center',
            fontSize: 20,
            margin: '5%',
            marginRight: 0,
            flex: 2,
        },
    });
}