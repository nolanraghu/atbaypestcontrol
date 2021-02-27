import * as React from 'react';
import {Card} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    View, Button
} from 'react-native';
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import {getUser} from "../assets/Data/Data";
import AddPayment from "../components/addPayment";
import Payment from "../components/RenderEditPayment";
import {useState} from "react";
import {updateUserOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {notUpdated, usernameStolen} from "../assets/text/text";
import {useDispatch, useSelector} from "react-redux";
import {changePayment, changeProfile} from "../redux/action";
import {RootState} from "../redux/store";

export default function EditPayments({route, navigation}:any) {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const params = route.params;
    let lastScreen:string;
    if (params != undefined) {
        lastScreen = params.lastScreen;
    } else {
        lastScreen = 'ProfileTabScreen'
    }

    const user = getUser();

    const [updating, setUpdating] = useState(false);

    const dispatch = useDispatch();

    useSelector((state:RootState) => state.hasPaymentVersion);

    let keys = 0;

    let payArray, addButton;

    if(!user.hasPayment()){
        payArray = <AddPayment screen={'EditPayments'} key={"addPaymentScreen"}/>

        addButton = [];
    } else {
        payArray = user.getPayments().map(function(payment, index) {
            return  <Payment
                key={keys++}
                payment={payment}
                index={index}
                onPressDefault={()=>{user.setDefaultPayment(index); dispatch(changePayment())}}
                onPressDelete={()=>{user.deletePayment(index); dispatch(changePayment())}}
                onView={()=>{}}
            />
        })

        addButton = <AddPayment screen={'EditPayments'} key={"addPaymentScreen"} additional={true}/>
    }

    let pressButton = () => {
        if (!updating){
            setUpdating(true);
            updateUserOnline(
                () => {
                    makeAlert(notUpdated());
                    setUpdating(false);
                },
                () => {
                    setUpdating(false);
                    dispatch(changeProfile());
                    navigation.navigate(lastScreen);
                    if(lastScreen != 'ProfileTabScreen'){
                        navigation.goBack();
                    }
                },
                () => {
                    makeAlert(usernameStolen());
                    setUpdating(false);
                }
            )
        }
        navigation.navigate(lastScreen);
    }

    let getButtonColor = () => {
        if (updating) {
            return getOffButtonColor(scheme);
        } else {
            return buttonColor
        }
    }

    let endButton =
        <View style={styles.deleteProfile} key={keys++}>
            <Button
                title={"Done"}
                onPress={pressButton}
                color={getButtonColor()}/>
        </View>


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Card containerStyle={[styles.cardContainer]}>
                    <View style={styles.emailContainer}>
                        {payArray}
                    </View>
                    {addButton}
                    {endButton}
                </Card>
            </View>
        </ScrollView>
    )
};

