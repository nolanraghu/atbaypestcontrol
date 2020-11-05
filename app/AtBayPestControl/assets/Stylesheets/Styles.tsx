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

export function getRippleColor(state:ColorSchemeName){
    if(state === 'dark'){
        return backgroundDark;
    } else {
        return backgroundLight;
    }
}

export function getStyle(state:ColorSchemeName){
    let background, header, text, onButton, offButton, highlight

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
        image: {
            flex: 1,
            height: '70%',
            width: '70%',
            alignSelf: "center",
            resizeMode: 'contain',
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
        }
    });
}