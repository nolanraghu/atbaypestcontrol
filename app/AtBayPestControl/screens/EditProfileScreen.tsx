import * as React from 'react';
import {Card} from 'react-native-elements';
import {
    ScrollView,
    useColorScheme,
    Text,
    View, Pressable
} from 'react-native';
import {getStyle} from '../assets/Stylesheets/Styles'
import Email from '../components/RenderEmail'
import { useNavigation } from '@react-navigation/native';
import {getUser} from "../assets/Data/Data";
import {submit} from "../assets/text/text";
import Editable from "../components/Editable";

export default function EditProfileScreen() {
    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    const navigation = useNavigation();

    const user = getUser();
    let key = 0;

    let name = <Editable
        type={"Username"}
        textIn={user.getUserName()}
        editText={user.changeUserName}
    />;
    let pword = <Editable textIn={user.getPassword()} editText={user.changePassword} type={"Password"}/>;
    let AddyArray = user.getAddresses().map(function (addy) {
        return (
            <View style={{justifyContent: 'center'}}>
                <Editable key={key++} textIn={addy.address} editText={addy.updateAddress} type={"Address (Line 1)"}/>
                <Editable key={key++} textIn={addy.address2} editText={addy.updateAddressLine2} type={"Address (Line 2)"}/>
                <Editable key={key++} textIn={addy.city} editText={addy.updateCity} type={"City"}/>
                <Editable key={key++} textIn={addy.state} editText={addy.updateState} type={"State"}/>
                <Editable key={key++} textIn={addy.zip} editText={addy.updateZip} type={"Zip"}/>
            </View>
        )
    });
    let EmailArray = user.getEmails().map(function (email) {
        return <Editable
            key={key++}
            type={"Email"}
            textIn={email.getEmail()}
            editText={email.updateEmail}
        />
    });
    let endButton = <View style={styles.deleteProfile}>
        <Pressable onPress={() => {navigation.navigate("ProfileTabScreen",
            {changed: true}
            )}}>
            <Text style ={[styles.Text, {color: 'blue', fontWeight:"bold"}]}>
                {submit()}
            </Text>
        </Pressable>
    </View>


    return (
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Card containerStyle={[styles.cardContainer]}>
                    {name}
                    {pword}
                    {AddyArray}
                    {EmailArray}
                    {endButton}
                </Card>
            </View>
        </ScrollView>

    )
};

