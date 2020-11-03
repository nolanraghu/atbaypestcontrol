import * as React from 'react';
import {
    Button,
    Image,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    TextLayoutEventData,
    useColorScheme
} from "react-native";
import { Text, View } from '../components/Themed';
import {useState} from "react";
import {getProductInfo} from "../controller/ProductPulling"
import {useNavigation} from "@react-navigation/native";

//@ts-ignore
const PlanProductPopup = ({route, navigation}) => {
    const {prodId} = route.params;
    let prodInfo = getProductInfo(prodId);
    const scheme = useColorScheme();
    let styles = stylesLight;
    if(scheme === "dark"){
        styles = stylesDark;
    }

    return(
        <View style={styles.container}>
            <View style={styles.productBox}>
                <Text style={styles.title}>{prodInfo.name}</Text>
            </View>
            <ScrollView>
                <View>
                    <CaptionImage source={prodInfo.image} text={prodInfo.shortDescription}/>
                </View>
            </ScrollView>
            <View style={styles.back}>
                <View>
                    <Text>Price to add: $3.99</Text>
                    <View>
                        <Button title="Add to Plan" onPress={()=> navigation.navigate('PlanTabScreen')}/>
                    </View>
                </View>
            </View>
        </View>


    );

};

////////EVERYTHING PAST THIS LINE SHOULD GO IN A TOP-LEVEL DIRECTORY HELPER FOLDER//////////////////////

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
        <View style={lazyStyles.section}>
            <Image source={require("../assets/images/product4.jpeg")} style={lazyStyles.image}/>
            <Text style={lazyStyles.caption} onTextLayout={_onTextLayout}>{topText}</Text>
            <Text style={lazyStyles.caption2}>{bottomText}</Text>
        </View>
    )
}

interface CaptionImageProps{
    source: string
    text?: string
}

/////SHITTY COPY AND PAST STRAT ENDS/////////////////

//These should probably be somewhere better to
const lazyStyles = StyleSheet.create({
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
});



const stylesLight = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexDirection: "column",
        height: '100%'
    },
    productBox: {
        width: '89%',
        margin: '5.5%',
        marginBottom: '2%',
        aspectRatio: 3,
        backgroundColor: 'rgb(206,212,206)',
        borderRadius: 20,
        padding: 10,
        alignItems: "flex-start",
        flexDirection: 'row',
    },
    title: {
        fontSize: 25,
        padding: '2%',
        margin: '5%',
        width: '60%',
        textAlign: 'center',
    },
    back: {
        backgroundColor: 'rgb(226,226,226)'
    }
});

const stylesDark = StyleSheet.create({
    container: stylesLight.container,
    title: stylesLight.title,
    productBox: stylesLight.productBox,
    back: stylesLight.back,
});
export default PlanProductPopup;
