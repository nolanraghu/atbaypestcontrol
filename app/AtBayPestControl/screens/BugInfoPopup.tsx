import * as React from 'react';

import { Text, View } from '../components/Themed';
import {Button, Image, ScrollView, StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

//TODO: Fix how everything shifts up, fix colors

export default function BugInfoPopup() {
    const navigation = useNavigation();
    // This is just an array of arrays of parameters for <CaptionImage>
    const captionImageListData = [
        [require('../assets/images/ant.png'),
            'Here is where you\'ll put a bunch of information about ants, such as their size, friendliness, death ' +
            'rate, art styles, etc.'],
        [require('../assets/images/1831477.webp'),
            'It turns out, making text wrap in React is VERY difficult :/']
    ]

    //This maps those onto CaptionImages. There's probably a cleaner way to do this, by just making
    // <CaptionImage> return a list? That seems potentially bad tho
    // I just add this in as JS by putting it in brackets in the ScrollView
    let captionImageListArr = captionImageListData.map(function([source, text], index){
        return <CaptionImage source={source} text={text} key={index}/>
    })
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ant Infestation:</Text>
            <ScrollView>
                {captionImageListArr}
                <View style={styles.section}>
                    <Text style={styles.price}>Price to add: $3.99</Text>
                    <View style={styles.button}>
                        <Button title="Add to Plan" onPress={()=> navigation.navigate('BugsTabScreen')}/>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

function CaptionImage({source, text = 'information'}: CaptionImageProps){
    return(
        <View style={styles.section}>
            <Image source={source}  style={styles.image}/>
            <Text style={styles.caption}>{text}</Text>
        </View>
    )
}

interface CaptionImageProps{
    source: object
    text?: string
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        // backgroundColor: 'transparent',
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
        // backgroundColor: 'black',
        padding: '2%',
        margin: '5%',
        width: '60%',
        textAlign: 'center',
        // borderRadius: 8
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
    },
    caption: {
        flex: 2,
        textAlign: 'center',
        margin: '5%',
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
    }
})
