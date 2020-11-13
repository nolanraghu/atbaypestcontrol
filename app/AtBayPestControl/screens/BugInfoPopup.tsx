import * as React from 'react';
import {
    Button,
    ScrollView,
    useColorScheme,
    Text,
    View
} from "react-native";
import {getStyle, buttonColor} from '../assets/Stylesheets/Styles';
import CaptionImage from "../components/CaptionImage";
import {useState} from "react";
import {getUser} from "../assets/Data/Data";
import {noInfestationProductText, productEquipmentText} from "../assets/text/text";
import Equipment from "../assets/Classes/Equipment";
import Product from "../assets/Classes/Product";


export default function BugInfoPopup({route, navigation}: any) {
    const {infestation} = route.params;
    const [user, updateUser] = useState(getUser())
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const products:Product[] = infestation.getProducts()

    // Creates the list of product images and descriptions
    let productImages;
    if (products.length == 0){
        productImages = <Text style={styles.captionFade}>{noInfestationProductText()}</Text>
    } else{
        //Otherwise its hard to give everything its own key
        let keys = 0;
        productImages = products.map(function(product){
            let productText = product.getProductName() + ':\n  ' + product.getProductDetails()

            let equipment = product.equipmentList();
            function equipmentImages(equipmentList: Equipment[]){
                return equipmentList.map(function(equipment){
                    let equipmentText = equipment.getEquipmentName() + ':\n  ' + equipment.getEquipmentDescription();
                    return <CaptionImage source={equipment.getEquipmentImage()} text={equipmentText} key={keys++}/>
                })
            }

            let retVal = [(<CaptionImage source={product.getProductImage()}
                                            text={productText}
                                            key={keys++}/>)];

            //This is kinda ugly, but it displays the equipment underneath the products
            if (equipment.length != 0){
                retVal = [
                    retVal[0],
                    <View style={styles.section} key={keys++}>
                        <Text style={[styles.caption, {marginVertical: -5}]} key={keys++}>{productEquipmentText()}</Text>
                    </View>
                ].concat(equipmentImages(equipment));
            }

            return retVal;
        })
    }




    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{infestation.getBugName() + " Infestation"}</Text>
                <Button title="Add to Plan"
                        color= {buttonColor}
                        onPress={()=> navigation.navigate('BugsTabScreen')}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <CaptionImage source={infestation.getBugImage()} text={infestation.getBugDescription()}/>
                    <View style={styles.section}>
                        <Text style={styles.title}>Products to be added:</Text>
                    </View>
                    {productImages}
                </View>
            </ScrollView>
            <View style={styles.header}>
                <Text style={styles.fullText}>Price to add: $3.99</Text>
            </View>
        </View>
    )
}



