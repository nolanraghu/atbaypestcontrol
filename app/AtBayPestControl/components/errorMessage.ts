import {Alert} from "react-native";
import {errorCancel, errorDismiss, errorTitle} from "../assets/text/text";

export const makeAlert = (errorMessage:string, onOK = ()=>{}, cancel = false) =>
    Alert.alert(
        errorTitle(),
        errorMessage,
        (cancel?
            [{ text: errorDismiss(), onPress: onOK },
                {text: errorCancel(), onPress: ()=>{}}]
            : [{ text: errorDismiss(), onPress: onOK }]
        ),
        { cancelable: false }
    );