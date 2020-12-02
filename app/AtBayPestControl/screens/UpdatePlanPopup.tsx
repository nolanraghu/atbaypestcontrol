import * as React from 'react';
import {Button, ScrollView, useColorScheme, Text, View} from "react-native";
import {buttonColor, getStyle} from "../assets/Stylesheets/Styles";
import Payment from "../components/RenderPayment";
import {getPaymentByID, getUser} from "../assets/Data/Data";
import {
    captionEquipmentDescription, captionProductAndReqEquipment,
    captionProductDescription, confirmationNotes,
    confirmationTitle,
    confirmButton, confirmPayment,
    newEquipmentConfirm, newPriceTextFooter,
    newProductsConfirm,
    removeProductsConfirm
} from "../assets/text/text";
import Product from "../assets/Classes/Product";
import CaptionImage from "../components/CaptionImage";
import Equipment from "../assets/Classes/Equipment";
import {useDispatch} from "react-redux";
import {changePlan} from "../redux/action";

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

    // Hook to use Redux
    const dispatch = useDispatch()

    const user = getUser();
    const plan = user.getPlan();
    const isChangingPlan = plan.hasPendingChanges();

    let keys = 0;

    function renderPay () {
        //TODO
        function onPressPayment () {
            console.log('payed')
        }

        function onPressEdit () {
            console.log('edit')
        }

        return (
            <View style={{width: '100%'}} key={keys++}>
                <Payment
                    payment={getPaymentByID(getUser().getPayments()[0])}
                    index={0}
                    onPressEdit={onPressEdit}
                    onPressPayment={onPressPayment}/>
            </View>
        )
    }

    function pressButton(){
        if(deleting){
            user.removeManyEquipment(plan.removePendingChanges());
        } else {

            user.makePayment(plan.getNewPrice().upfront);
            if(isChangingPlan){
                let nextDate = plan.setDueDate(plan.getDueDate());
                user.setMonthlyPayments(plan.getNewPrice().monthly, nextDate);
            }
            plan.addChangesToPlan();
        }
        dispatch(changePlan());
        navigation.navigate('BugsTabScreen');
    }

    function newProducts(){
        let pendingProducts:Product[] = plan.getPendingProducts();
        if (pendingProducts.length == 0){
            return ;
        } else {
            return([
                <Text style={styles.title} key={keys++}>{newProductsConfirm(deleting)}</Text>,
                pendingProducts.map((product:Product) => {
                    return <CaptionImage source={product.getProductImage()}
                                         text={captionProductDescription(product)}
                                         key={keys++}/>
                })
            ])
        }
    }

    function removingProducts(){
        let removingProducts:Product[] = plan.getRemovingProducts();
        if (removingProducts.length == 0){
            return ;
        } else {
            return([
                <Text style={styles.title} key={keys++}>{removeProductsConfirm(deleting)}</Text>,
                removingProducts.map((product:Product) => {
                    return <CaptionImage source={product.getProductImage()}
                                         text={captionProductAndReqEquipment(product)}
                                         key={keys++}/>
                })
            ])
        }
    }

    function newEquipment(){
        let pendingEquipment:Equipment[] = plan.getPendingEquipment();
        if (pendingEquipment.length == 0){
            return ;
        } else {
            return ([
                <Text style={styles.title} key={keys++}>{newEquipmentConfirm(deleting)}</Text>,
                pendingEquipment.map((equipment:Equipment) => {
                    return <CaptionImage source={equipment.getEquipmentImage()}
                                         text={captionEquipmentDescription(equipment)}
                                         key={keys++}/>
                })
            ])
        }
    }

    function paymentInfo(){
        if (deleting) {
            return;
        } else {
            return (
                [
                    <View style={styles.section} key={keys++}>
                        <Text style={styles.title}>{confirmPayment()}</Text>
                    </View>,
                    renderPay()
                ]
            );
        }
    }

    function footer(){
        if(deleting || !isChangingPlan){
            return;
        } else {
            return (
                <View style={styles.header}>
                    <Text style={styles.fullText}>{newPriceTextFooter(plan)}</Text>
                </View>
            )
        }
    }

    function highlight(text:string){
        return (
            <Text style={styles.highlightedText} key={keys++}>{text}</Text>
        )
    }

    function notes(){
        if(deleting){
            return;
        } else {
            return(
                <View style={styles.section}>
                    <Text style={styles.captionFade}>
                        {confirmationNotes(plan, isChangingPlan, highlight)}
                    </Text>
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
