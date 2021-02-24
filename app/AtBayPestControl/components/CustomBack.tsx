import {HeaderBackButton} from "@react-navigation/stack";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {useDispatch, useSelector} from "react-redux";
import {makeAlert} from "./errorMessage";
import {notSavedText} from "../assets/text/text";
import {endEditingEmail} from "../redux/action";
import {RootState} from "../redux/store";

export default function CustomBack(props:any) {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const editingEmails = useSelector((state:RootState) => state.isEditingEmail)

    let goingBack = () => {
        if (editingEmails) {
            makeAlert(
                notSavedText(),
                ()=>{
                    navigation.goBack();
                    dispatch(endEditingEmail());
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