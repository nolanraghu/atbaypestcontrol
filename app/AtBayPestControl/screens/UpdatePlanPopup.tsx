import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from "react-native";
import {buttonColor, getStyle} from "../assets/Stylesheets/Styles";
import Payment from "../components/Payment";
import {getUser, PAY} from "../assets/Data/Data";
import {
    captionEquipmentDescription, captionProductandReqEquipment,
    captionProductDescription, confirmationNotes,
    confirmationTitle,
    confirmButton,
    newEquipmentConfirm, newPriceTextFooter,
    newProductsConfirm,
    removeProductsConfirm
} from "../assets/text/text";
import Product from "../assets/Classes/Product";
import CaptionImage from "../components/CaptionImage";
import Equipment from "../assets/Classes/Equipment";

export default function UpdatePlanPopup({route, navigation}:any) {
    const params = route.params;
    //This is for if you are just confirming that you want to delete the changes
    let deleting = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        deleting = params.deleting;
    }
    const scheme = useColorScheme();
    const styles = getStyle(scheme);

    const user = getUser();
    const plan = user.getPlan();
    const isChangingPlan = plan.hasPendingChanges();

    let keys = 0;

    function renderPay () {

        function onPressPayment () {
            console.log('payed')
        }

        function onPressEdit () {
            console.log('edit')
        }

        let PayArray = PAY.map(function([id, name, card], index) {
            return  <Payment
                key={keys++}
                index={index}
                name={name}
                card={card}
                onPressEdit={onPressEdit}
                onPressPayment={onPressPayment}
            />
        })

        return (
            <View style={{
                width: '100%',
                paddingTop: 30,
            }}>
                {PayArray[0]}
            </View>
        )
    }

    function pressButton(){
        //TODO
        navigation.navigate('BugsTabScreen');
    }

    function newProducts(){
        let pendingProducts:Product[] = plan.getPendingProducts();
        if (pendingProducts.length == 0){
            return ;
        } else {
            return(
                [<Text style={styles.title} key={keys++}>{newProductsConfirm(deleting)}</Text>].concat(
                    pendingProducts.map((product:Product) => {
                        return <CaptionImage source={product.getProductImage()}
                                             text={captionProductDescription(product)}
                                             key={keys++}/>
                    })
                )
            )
        }
    }

    function removingProducts(){
        let removingProducts:Product[] = plan.getRemovingProducts();
        if (removingProducts.length == 0){
            return ;
        } else {
            return(
                [<Text style={styles.title} key={keys++}>{removeProductsConfirm(deleting)}</Text>].concat(
                    removingProducts.map((product:Product) => {
                        return <CaptionImage source={product.getProductImage()}
                                             text={captionProductandReqEquipment(product)}
                                             key={keys++}/>
                    })
                )
            )
        }
    }

    function newEquipment(){
        let pendingEquipment:Equipment[] = plan.getPendingEquipment();
        if (pendingEquipment.length == 0){
            return ;
        } else {
            return(
                [<Text style={styles.title} key={keys++}>{newEquipmentConfirm(deleting)}</Text>].concat(
                    pendingEquipment.map((equipment:Equipment) => {
                        return <CaptionImage source={equipment.getEquipmentImage()}
                                             text={captionEquipmentDescription(equipment)}
                                             key={keys++}/>
                    })
                )
            )
        }
    }

    function paymentInfo(){
        if (deleting) {
            return;
        } else {
            return (
                [
                    <View style={styles.section} key={keys++}>
                        <Text style={styles.title}>Payment information:</Text>
                    </View>
                ].concat(renderPay())
            );
        }
    }

    function footer(){
        if(deleting){
            return;
        } else {
            return (
                <View style={styles.header}>
                    <Text style={styles.fullText}>{newPriceTextFooter(plan)}</Text>
                </View>
            )
        }
    }

    function notes(){
        if(deleting){
            return;
        } else {
            return(
                <View style={styles.section}>
                    <Text style={styles.captionFade}>{confirmationNotes(plan)}</Text>
                </View>
            );
        }
    }

    return(
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.title}>{confirmationTitle(deleting, isChangingPlan)}</Text>
                <Button title= {confirmButton(deleting, isChangingPlan)}
                        color= {buttonColor}
                        onPress={pressButton}/>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    {paymentInfo()}
                    {notes()}
                    {newProducts()}
                    {removingProducts()}
                    {newEquipment()}
                </View>
            </ScrollView>
            {footer()}
        </View>
    )
}