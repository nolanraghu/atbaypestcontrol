import * as React from 'react';
import {Card, Icon} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    View, Button, Text, TouchableOpacity
} from 'react-native';
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import { useNavigation } from '@react-navigation/native';
import {getUser} from "../assets/Data/Data";
import {notUpdated, submit, usernameStolen} from "../assets/text/text";
import Editable from "../components/Editable";
import {useState} from "react";
import {updateUserOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {useDispatch, useSelector} from "react-redux";
import {changeProfile, endEditingEmail, startEditingEmail} from "../redux/action";
import {RootState} from "../redux/store";

export default function EditEmails() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();

    const [emails, setEmails] = useState(user.getEmails().map(email => email.getEmail()));
    const [updating, setUpdating] = useState(false);
    const [i, update] = useState(0);

    const dispatch = useDispatch();
    const editingEmails = useSelector((state:RootState) => state.isEditingEmail);

    let keys = i;

    let editEmailArray = emails.map((email, index) =>
            <Editable type={index == 0? "Default" : "Email"}
                      textIn={email}
                      editText={(newEmail)=>{
                          let mEmails = emails;
                          mEmails[index] = newEmail;
                          setEmails(mEmails);
                          dispatch(startEditingEmail())
                      }}
                      onEndEditing={()=>{
                          if (!(emails[index].includes('.') && emails[index].includes('@'))){
                              if(editingEmails){
                                  makeAlert('Not a valid email');
                              }
                          }
                      }}
                      deletable={true}
                      onDelete={()=>{
                          let mEmails = emails;
                          mEmails.splice(index, 1)
                          setEmails(mEmails);
                          dispatch(startEditingEmail());
                          update(keys++);
                      }}
                      key={keys++}/>);

    let addEmail = () => {
        let mEmails = emails;
        mEmails.push('');
        setEmails(mEmails);
        dispatch(startEditingEmail());
        update(keys++);
    }

    let addButton =
        <TouchableOpacity
            key={keys++}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={addEmail}>
            <Icon
                name={'add-circle'}
                underlayColor = 'transparent'
                iconStyle={styles.Icon2}
                onPress={addEmail}
            />
            <Text style={[styles.inputText, {opacity: .7}]}>
                {emails.length == 0?
                    "add an email" :
                    "add another email"}
            </Text>
        </TouchableOpacity>

    let checkEmails = (emailsArray:string[]) => {
        for(let email of emailsArray){
            if(!(email.includes('@') && email.includes('.'))){
                return false;
            }
        }
        return true;
    }

    let pressButton = () => {
        if(!updating) {
            if(emails.length == 0) {
                makeAlert("You must have at least one email");
            } else if(!checkEmails(emails)) {
                makeAlert("One of your emails is not valid");
            } else {
                setUpdating(true);
                user.setEmails(emails);
                updateUserOnline(
                    () => {
                        makeAlert(notUpdated());
                        setUpdating(false);
                    },
                    () => {
                        setUpdating(false);
                        dispatch(endEditingEmail());
                        dispatch(changeProfile());
                        navigation.navigate("ProfileTabScreen");
                    },
                    () => {
                        makeAlert(usernameStolen());
                        setUpdating(false);
                    }
                )
            }
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
                    {addButton}
                    {endButton}
                </Card>
            </View>
        </ScrollView>
    )
};