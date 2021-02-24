import {ColorSchemeName, Platform, StyleSheet} from "react-native";

export const buttonColor = 'rgb(72,190,87)';
export const tintColor = 'rgb(63,164,76)';

const backgroundDark = 'rgb(27,27,27)';
const headerDark = 'rgb(50,50,50)';
const textDark = 'rgb(229,229,229)';
const buttonDark = 'rgb(105,105,105)';
const fadedItemDark = 'rgb(60,60,60)';
const highlightDark = 'lightgreen';
const highlightRemovingDark = 'rgb(239,99,99)';
const fadedTextDark = 'rgb(118,118,118)';

const backgroundLight = 'rgb(236,236,236)';
const headerLight = 'rgb(245,245,245)';
const textLight = 'rgb(50,50,50)';
const buttonLight = 'white';
const fadedItemLight = 'rgb(231,231,231)';
const highlightLight = 'rgb(62,176,76)';
const highlightRemovingLight = 'rgb(255,43,43)';
const fadedTextLight = 'rgb(153,153,153)';

export function getBackgroundColor(state:ColorSchemeName){
    if(state === 'dark'){
        return backgroundDark;
    } else {
        return backgroundLight;
    }
}

export function getOffButtonColor(state:ColorSchemeName){
    if(state === 'dark'){
        return fadedItemDark;
    } else {
        return fadedItemLight;
    }
}

export function getStyle(state:ColorSchemeName) {
    let background, header, text, button, fadedItem, highlight, fadedText, highlightRemoving, inputBackground

    if (state === 'dark') {
        background = backgroundDark;
        header = headerDark;
        text = textDark;
        button = buttonDark;
        fadedItem = fadedItemDark;
        highlight = highlightDark;
        fadedText = fadedTextDark;
        highlightRemoving = highlightRemovingDark;
        inputBackground = backgroundDark;
    } else {
        background = backgroundLight;
        header = headerLight;
        text = textLight;
        button = buttonLight;
        fadedItem = fadedItemLight;
        highlight = highlightLight;
        fadedText = fadedTextLight;
        highlightRemoving = highlightRemovingLight;
        inputBackground = buttonLight;
    }
    return StyleSheet.create({
        screen: {
            height: '100%',
            backgroundColor: background,
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
            flexWrap: 'nowrap',
            flexDirection: 'row',
            backgroundColor: header,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            margin: 10,
            color: text,
            flexShrink: 1
        },
        product: {
            width: '94%',
            margin: '3%',
            marginBottom: '3.5%',
            aspectRatio: 3,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        productTitleImage: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'transparent',
            margin: 12,
            marginHorizontal: -10
        },
        productTextBox: {
            flex: 2,
            flexDirection:'column',
            backgroundColor: 'transparent',
            margin: 8,
            marginLeft: 0
        },
        fullButtonOn: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
        },
        fullButtonOff: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'rgb(0,0,0)',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        fullButtonPending: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
            borderStyle: 'dashed'
        },
        fullButtonRemoving: {
            width: '39%',
            margin: '5.5%',
            aspectRatio: 1,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "column",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlightRemoving,
            borderStyle: 'dashed'
        },
        preventionButtonOff: {
            width: '89%',
            margin: '5.5%',
            aspectRatio: 3,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
        },
        preventionButtonOn: {
            width: '89%',
            margin: '5.5%',
            aspectRatio: 3,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
        },
        preventionButtonPending: {
            width: '89%',
            margin: '5.5%',
            aspectRatio: 3,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'rgb(0,0,0)',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlight,
            borderStyle: "dashed"
        },
        preventionButtonRemoving: {
            width: '89%',
            margin: '5.5%',
            marginBottom: '9%',
            aspectRatio: 3,
            backgroundColor: button,
            borderRadius: 20,
            justifyContent: "center",
            flexDirection: "row-reverse",
            shadowColor: 'rgb(0,0,0)',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderWidth: 2.5,
            borderColor: highlightRemoving,
            borderStyle: "dashed"
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
        link: {
            color: highlight,
            textDecorationLine: 'underline',
        },
        highlightedText:{
            color: highlight
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
            color: text
        },
        captionFade: {
            textAlign: 'left',
            margin: '4%',
            marginLeft: 10,
            color: fadedText,
        },
        price: {
            textAlign: 'center',
            fontSize: 20,
            margin: '5%',
            marginRight: 0,
            flex: 2,
        },
        cardContainer: {
            backgroundColor: background,
            borderWidth: 0,
            flex: 1,
            margin: 0,
            padding: 0,
        },
        planContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 25,
        },
        emailContainer: {
            backgroundColor: background,
            flex: 1,
            paddingVertical: 15,
        },
        headerBackgroundImage: {
            paddingBottom: 30,
            paddingTop: 10,
            paddingHorizontal:10,
            alignItems: "flex-end"
        },
        headerContainer: {},
        headerColumn: {
            backgroundColor: 'transparent',
            alignSelf: 'center',
            ...Platform.select({
                ios: {
                    alignItems: 'center',
                    elevation: 1,
                    marginTop: -1,
                },
                android: {
                    alignItems: 'center',
                },
            }),
        },
        placeIcon: {
            color: 'white',
            fontSize: 26,
        },
        scroll: {
            backgroundColor: background,
        },
        userAddressRow: {
            alignItems: 'center',
            flexDirection: 'row',
        },
        userCityRow: {
            backgroundColor: 'transparent',
        },
        userCityText: {
            color: '#A5A5A5',
            fontSize: 15,
            fontWeight: '600',
            textAlign: 'center',
        },
        userImage: {
            borderColor: background,
            borderRadius: 85,
            borderWidth: 3,
            height: 170,
            marginBottom: 15,
            width: 170,
        },
        userNameText: {
            color: text,
            fontSize: 22,
            fontWeight: 'bold',
            paddingBottom: 8,
            textAlign: 'center',
        },
        iconRow: {
            flex: 2,
            justifyContent: 'center',
        },
        Icon: {
            color: fadedText,
            fontSize: 30,
        },
        Icon2: {
            color: fadedText,
            fontSize: 30,
            alignSelf: 'flex-start',
            margin: 10,
            marginLeft: 15
        },
        Icon3: {
            color: highlightRemoving,
            fontSize: 20,
            flexShrink: 0,
            marginLeft: 5
        },
        Icon4: {
            color: highlightRemoving,
            fontSize: 25,
        },
        Row: {
            flex: 8,
            flexDirection: 'column',
            justifyContent: 'center',
        },
        Text: {
            color: text,
            fontSize: 16,
        },
        subText: {
            color: fadedText,
            fontSize: 14,
            fontWeight: '200',
        },
        column: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 5,
        },
        nameColumn: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        payText: {
            color: text,
            fontSize: 18,
            fontWeight: 'bold',
        },
        editRow: {
            flex: 2,
            justifyContent: 'flex-start',
        },
        loginContainer: {
            flex: 1,
            padding: '2.5%',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            flexDirection: 'row',
            backgroundColor: background
        },
        loginText: {
            fontSize: 40,
            fontWeight: 'bold',
            alignItems: 'flex-start',
            color: highlight,
            flexShrink: 1,
            margin: '5%'
        },
        loginHeadContainer: {
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundColor: background,
            width: '100%',
        },
        inputText: {
            justifyContent: "flex-start",
            alignContent: "flex-start",
            color: text,
            fontSize: 20,
            flexGrow: 1,
            flexShrink: 1
        },
        inputView: {
            backgroundColor: inputBackground,
            flexDirection: "row",
            padding: 10,
            paddingHorizontal: 13,
            margin: 10,
            borderWidth:1,
            borderRadius: 10,
            borderColor: fadedItem,
            alignItems:'center'
        },
        hyperLink: {
            color: highlight,
            textDecorationLine: 'underline',
        },
        wordRow: {
            marginVertical: 20,
            flexDirection: 'row',
            alignContent: "center",
            justifyContent: "center",
            width: '100%'
        },
        textArray: {
            marginVertical: 20,
            width: '100%'
        },
        submitButton: {
            width: '100%',
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            color: highlight
        },
        deleteProfile: {
            backgroundColor: background,
            flex: 1,
            paddingTop: 20,
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 20,
            justifyContent: "center",
            flexDirection: "row",
            borderColor: highlightRemoving,
            /*
            borderWidth: 3,
            borderStyle: 'solid',
            borderRadius: 10,
            */
        },
        contactUs: {
            width: 30,
            height: 30,
            alignSelf:"flex-end",
            color: 'white'
        },
        cardArea: {
            width: '94%',
            margin: '3%',
            marginBottom: '3.5%',
            padding: '3%',
            paddingVertical: '5.5%',
            backgroundColor: backgroundLight,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 4,
            borderRadius: 20,
            justifyContent: "center",
        },
        alertTextWrapper: {
            flex: 20,
            justifyContent: 'center',
            alignItems: 'center'
        },
        alertIconWrapper: {
            padding: 5,
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center'
        },
        alertText: {
            color: '#c22',
            fontSize: 16,
            fontWeight: '400'
        },
        alertWrapper: {
            backgroundColor: '#ecb7b7',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            borderRadius: 5,
            paddingVertical: 5,
            marginTop: 10
        },
        buttonView: {
            width: '100%',
            alignContent: "center",
            flexDirection: "column",
            padding: '6%',
            paddingBottom: 3
        },
        checkboxView: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: -5,
            marginLeft: '6%'
        },
        checkboxText: {
            color: 'black',
            opacity: .7
        }
    });
}
