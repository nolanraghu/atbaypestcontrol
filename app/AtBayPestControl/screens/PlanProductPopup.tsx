import * as React from 'react';
import {
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";

import {getProductInfo} from "../controller/ProductPulling"
import CaptionImage from "../components/CaptionImage";
import {getStyle} from "../assets/Stylesheets/Styles";


export default function PlanProductPopup({route, navigation}:any){
    const {prodId} = route.params;
    let prodInfo = getProductInfo(prodId);
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{prodInfo.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={prodInfo.image} text={prodInfo.shortDescription}/>
                </View>
            </ScrollView>
        </View>
    );
};
