import * as React from 'react';
import {
    Button,
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles';
import {getBugInfo} from "../controller/BugPulling";
import CaptionImage from "../components/CaptionImage";

export default function BugInfoPopup({route, navigation}: any) {
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
        <View style={styles.screen}>
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



