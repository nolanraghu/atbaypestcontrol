import {useNavigation} from "@react-navigation/native";
import {Image, Pressable, Text, useColorScheme, View} from "react-native";
import {getBackgroundColor, getStyle} from "../assets/Stylesheets/Styles";
import * as React from "react";
import Product from "../assets/Classes/Product";

export default function ProductItem({product}: productProps) {
    const navigation = useNavigation();
    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    return(
        <Pressable onPress={() => {navigation.navigate("PlanProductPopup", {prodId: product.getID()})}}
                   style={styles.product}
                   android_ripple= {{color: getBackgroundColor(scheme)}}>
            <View style={styles.productTitleImage }>
                <Text style={[styles.fullText, {fontWeight: 'bold', marginBottom: 3, marginHorizontal: 10}]}
                      numberOfLines={3}>
                    {product.getName()}
                </Text>
                <Image source={product.getProductImage()}  style={styles.buttonImage}/>
            </View>
            <View style={styles.productTextBox}>
                <Text style={styles.fullText} numberOfLines={6}>{product.getProductDetails()}</Text>
            </View>
        </Pressable>
    );
}

interface productProps {
    product: Product
}