import * as React from 'react';
import {Card} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    View, Button
} from 'react-native';
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import { useNavigation } from '@react-navigation/native';
import {getUser} from "../assets/Data/Data";
import {notUpdated, submit, usernameStolen} from "../assets/text/text";
import Editable from "../components/Editable";
import {useState} from "react";
import {updateUserOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {useDispatch} from "react-redux";
import {endEditingEmail, startEditingEmail} from "../redux/action";

export default function EditEmails() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();

    const [emails, setEmails] = useState(user.getEmails().map(email => email.getEmail()));
    const [updating, setUpdating] = useState(false);

    const dispatch = useDispatch();

    let keys = 0;

    let editEmailArray = emails.map((email, index) =>
            <Editable type={"Email"}
                      textIn={email}
                      editText={(newEmail)=>{
                          let mEmails = emails;
                          mEmails[index] = newEmail;
                          setEmails(mEmails);
                          dispatch(startEditingEmail())
                      }}
                      onEndEditing={()=>{
                          if (!(emails[index].includes('.') && emails[index].includes('@'))){
                              makeAlert('Not a valid email');
                          }
                      }}
                      key={keys++}/>);


    let pressButton = () => {
        if(!updating) {
            setEmails(emails);
            setUpdating(true);
            updateUserOnline(
                () => {
                    makeAlert(notUpdated());
                    setUpdating(false);
                },
                () => {
                    setUpdating(false);
                    dispatch(endEditingEmail());
                    navigation.navigate("ProfileTabScreen", {changed: true});
                },
                () => {
                    makeAlert(usernameStolen());
                    setUpdating(false);
                }
            )
        }
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
                title={submit()}
                onPress={pressButton}
                color={getButtonColor()}/>
        </View>


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Card containerStyle={[styles.cardContainer]}>
                    {editEmailArray}
                    {endButton}
                </Card>
            </View>
        </ScrollView>
    )
};