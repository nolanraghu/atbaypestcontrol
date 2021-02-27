import {HeaderBackButton} from "@react-navigation/stack";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {makeAlert} from "./errorMessage";
import {notSavedText} from "../assets/text/text";
import {endEditingAddress, endEditingEmail, endEditingUsernamePassword} from "../redux/action";
import {RootState} from "../redux/store";

export default function CustomBack(props:any, screen:"Email"|"Address"|"UsernamePassword") {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let dispatchDoneEditing:any, editing:any;

    let emailSelector = useSelector((state:RootState) => state.isEditingEmail);
    let addressSelector = useSelector((state:RootState) => state.isEditingAddresses);
    let usernamePasswordSelector = useSelector((state:RootState) => state.isEditingUsernamePassword);

    if (screen === "Email"){
        dispatchDoneEditing = ()=>{dispatch(endEditingEmail())};
        editing = emailSelector;
    } else if (screen === "Address"){
        dispatchDoneEditing = ()=>{dispatch(endEditingAddress())};
        editing = addressSelector;
    } else if (screen === "UsernamePassword"){
        dispatchDoneEditing = ()=>{dispatch(endEditingUsernamePassword())};
        editing = usernamePasswordSelector;
    } else {
        //Just for errors
        dispatchDoneEditing = ()=>{dispatch(endEditingUsernamePassword())};
        editing = usernamePasswordSelector;
    }

    let goingBack = () => {
        if (editing) {
            makeAlert(
                notSavedText(),
                ()=>{
                    navigation.goBack();
                    dispatchDoneEditing();
                },
                true
            )
        } else {
            navigation.goBack();
        }
    }

    return (
        <HeaderBackButton
            {...props}
            onPress={goingBack}
        />
    )
}