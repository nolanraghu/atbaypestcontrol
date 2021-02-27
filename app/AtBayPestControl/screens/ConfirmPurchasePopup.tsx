import * as React from 'react';
import {Button, ScrollView, Text, useColorScheme, View} from "react-native";
import {buttonColor, getOffButtonColor, getStyle} from "../assets/Stylesheets/Styles";
import {
    confirmationNotesItems, confirmPayment,
    confirmPurchaseButton,
    confirmTitle, costText,
    purchaseListTitle
} from "../assets/text/text";
import {getEquipmentByID, getProductByID, getUser} from "../assets/Data/Data";
import Payment from "../components/RenderPayment";
import CaptionImage from "../components/CaptionImage";
import Product from "../assets/Classes/Product";
import AddPayment from "../components/addPayment";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

export default function ConfirmPurchasePopup({route, navigation}:any){
    const {itemID:itemID, type:type} = route.params;
    // I know this is bad style but I didn't want to make a whole class that product and equipment inherit...
    let price:number;
    let item:any;
    let isProduct = false;
    if(type === 'Product'){
        item = getProductByID(itemID);
        price = item.getPrice();
        isProduct = true;
    } else {
        item = getEquipmentByID(itemID);
        price = item.getPrice();
    }

    const scheme = useColorScheme();
    const styles = getStyle(scheme);
    const hasPayment = getUser().getPayments().length != 0;

    // This makes the screen rerender if hasPayment might have changed
    useSelector((state:RootState) => state.hasPaymentVersion);

    let keys = 0;

    function renderPay () {

        if(getUser().getPayments().length == 0){
            return <AddPayment screen={'ConfirmPurchasePopup'} key={"addPaymentScreen"}/>
        } else {
            return (
                <View style={{width: '100%'}} key={keys++}>
                    <Payment
                        payment={getUser().getPayments()[0]}
                        index={0}
                        onPressEdit={()=>{navigation.navigate('EditPayments', {lastScreen: 'ConfirmPurchasePopup'})}}
                        onPressPayment={()=>{}}/>
                </View>
            )
        }

    }

    function paymentInfo(){
        return (
            [
                <View style={styles.section} key={keys++}>
                    <Text style={styles.title}>{confirmPayment()}</Text>
                </View>,
                renderPay()
            ]
        );
    }

    function highlight(text:string){
        return (
            <Text style={styles.highlightedText} key={keys++}>{text}</Text>
        )
    }

    function notes(){
        return(
            <View style={styles.section}>
                <Text style={styles.captionFade}>
                    {confirmationNotesItems(price, isProduct, highlight, item)}
                </Text>
            </View>
        );
    }

    function newItem(){
        if (isProduct){
            return(
                <CaptionImage source={item.getProductImage()}
                              text={item.getProductDetails()}/>
            )
        } else {
            return(
                <CaptionImage source={item.getEquipmentImage()}
                              text={item.getEquipmentDescription()}/>
            )
        }
    }

    function footer(){
        return (
            <View style={styles.header}>
                <Text style={styles.fullText}>{costText(price)}</Text>
            </View>
        )
    }

    function pressButton(){
        if (hasPayment){
            let user = getUser();
            user.makePayment(price);
            user.purchaseItems(item);
            navigation.goBack();
        }
    }

    function getButtonColor(){
        if (!hasPayment){
            return getOffButtonColor(scheme);
        } else {
            return buttonColor;
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {confirmTitle()}
                </Text>
                <Button title={confirmPurchaseButton()} onPress={pressButton} color={getButtonColor()}/>
            </View>
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    {paymentInfo()}
                    {notes()}
                    <Text style={styles.title}>{purchaseListTitle()}</Text>
                    {newItem()}
                </View>
            </ScrollView>
            {footer()}
        </View>
    )
}//
