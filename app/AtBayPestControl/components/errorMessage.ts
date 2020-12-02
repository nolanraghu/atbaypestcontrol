import {Alert} from "react-native";
import {errorDismiss, errorTitle} from "../assets/text/text";

export const makeAlert = (errorMessage:string) =>
    Alert.alert(
        errorTitle(),
        errorMessage,
        [
            { text: errorDismiss(), onPress: () => {} }
        ],
        { cancelable: false }
    );