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
                    <Text>Price to add: {prodInfo.price}</Text>
                    <View>
                        <Button title="Add to Plan" onPress={()=> navigation.navigate('PlanTabScreen')}/>
                    </View>
                </View>
            </View>
        </View>


    );

};

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
