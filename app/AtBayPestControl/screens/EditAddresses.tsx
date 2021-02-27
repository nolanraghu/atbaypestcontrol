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
import {changeProfile, endEditingAddress, startEditingAddress} from "../redux/action";
import {RootState} from "../redux/store";

export default function EditAddresses() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();

    const [addresses, setAddresses] = useState(user.getAddresses().map(address => address.getReadable()));
    const [updating, setUpdating] = useState(false);
    const [i, update] = useState(0);

    const dispatch = useDispatch();
    const editingAddresses = useSelector((state:RootState) => state.isEditingAddresses)

    let keys = i;

    let isValidAddress = (address:string) => {
        address = address.trim();
        let addressLines = address.split('\n');
        if (addressLines.length == 2 || addressLines.length == 3){
            if(addressLines[0].length == 0){
                return false;
            }
            let lastAddressLine = addressLines[addressLines.length - 1].split(',');
            if (lastAddressLine.length != 2 ||
                lastAddressLine[0].length == 0 ||
                lastAddressLine[1].length == 0){
                return false;
            }
            let lastSpaceIndex = lastAddressLine[1].lastIndexOf(' ');
            let state = lastAddressLine[1].slice(0, lastSpaceIndex);
            let zip = lastAddressLine[1].slice(lastSpaceIndex + 1);
            if (state.length == 0 || zip.length == 0){
                return false;
            }
        } else {
            return false;
        }

        return true;
    }

    let editAddressArray = addresses.map((address, index) =>
        <Editable type={index == 0? "Default" : "Address"}
                  textIn={address}
                  editText={(newAddress)=>{
                      let mAddresses = addresses;
                      mAddresses[index] = newAddress;
                      setAddresses(mAddresses);
                      dispatch(startEditingAddress())
                  }}
                  onEndEditing={()=>{
                      if (!isValidAddress(addresses[index])){
                          if(editingAddresses){
                              makeAlert('Not a valid address');
                          }
                      }
                  }}
                  deletable={true}
                  onDelete={()=>{
                      let mAddresses = addresses;
                      mAddresses.splice(index, 1)
                      setAddresses(mAddresses);
                      dispatch(startEditingAddress());
                      update(keys++);
                  }}
                  multiline={true}
                  key={keys++}/>);

    let addAddress = () => {
        let mAddresses = addresses;
        mAddresses.push('');
        setAddresses(mAddresses);
        dispatch(startEditingAddress());
        update(keys++);
    }

    let addButton =
        <TouchableOpacity
            key={keys++}
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={addAddress}>
            <Icon
                name={'add-circle'}
                underlayColor = 'transparent'
                iconStyle={styles.Icon2}
                onPress={addAddress}
            />
            <Text style={[styles.inputText, {opacity: .7}]}>
                {addresses.length == 0?
                    "add an address" :
                    "add another address"}
            </Text>
        </TouchableOpacity>

    let checkAddresses = (addressArray:string[]) => {
        for(let address of addressArray){
            if(!isValidAddress(address)){
                return false;
            }
        }
        return true;
    }

    let pressButton = () => {
        if(!updating) {
            if(addresses.length == 0) {
                makeAlert("You must have at least one address");
            } else if(!checkAddresses(addresses)) {
                makeAlert("One of your addresses is not valid");
            } else {
                setUpdating(true);
                user.setAddresses(addresses);
                updateUserOnline(
                    () => {
                        makeAlert(notUpdated());
                        setUpdating(false);
                    },
                    () => {
                        setUpdating(false);
                        dispatch(endEditingAddress());
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
                    {editAddressArray}
                    {addButton}
                    {endButton}
                </Card>
            </View>
        </ScrollView>
    )
};