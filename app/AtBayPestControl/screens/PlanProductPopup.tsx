import * as React from 'react';
import {
    Button,
    ScrollView,
    StyleSheet,
    useColorScheme
} from "react-native";
import { Text, View } from '../components/Themed';
import {getProductInfo} from "../controller/ProductPulling"
import CaptionImage from "../components/Components";
import {buttonColor, getStyle} from "../assets/Stylesheets/Styles";
import {getBugInfo} from "../controller/BugPulling";



//@ts-ignore
const PlanProductPopup = ({route, navigation}) => {
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

export default PlanProductPopup;
