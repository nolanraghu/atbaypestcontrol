import React, {useState} from 'react'
import {Button, ScrollView, Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import {registerInputs} from "../assets/Data/allTextRegister";
import {getUser} from "../assets/Data/Data";
import {changePlan, changeProfile, logIn} from "../redux/action";
import {useDispatch} from "react-redux";
import {addNewUser} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {usernameExists, userNotAddedError} from "../assets/text/text";

export default function RegisterScreen({ route, navigation }: any) {
    let User = getUser();
    const params = route.params;
    let goingBack = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        goingBack = params.goingBack;
    }

    const [isSubmitted, submit] = useState(false);
    const [i, update] = useState(0);
    const [emailMatch, setEmailMatch] = useState('');
    const [passMatch, setPassMatch] = useState('');

    const [registering, setRegistering] = useState(false);

    const scheme = useColorScheme();
    let styles = getStyle(scheme);

    const dispatch = useDispatch();

    let InputArray = registerInputs(isSubmitted, emailMatch, setEmailMatch, passMatch, setPassMatch);

    let register = () => {
        let load = () => {
            //You can add a function here if you want something to happen while it's loading
        }

        if (!registering){
            if (User.validateUser()) {
                setRegistering(true);
                addNewUser(
                    ()=>{
                        makeAlert(userNotAddedError())
                        setRegistering(false);
                    },
                    ()=>{
                        User.logIn();
                        if(goingBack){
                            navigation.pop();
                            navigation.goBack();
                        }
                        dispatch(logIn());
                        dispatch(changePlan());
                        dispatch(changeProfile());
                        setRegistering(false);
                    },
                    ()=>{
                        makeAlert(usernameExists());
                        setRegistering(false);
                    }
                )
                load();
            } else {
                submit(true);
                update(i + 1);
            }
        }
    }

    function onPressText () {
        if(!registering){
            User.changeUserName('')
            User.changePassword('')
            navigation.navigate('LoginScreen', {goingBack: goingBack})
        }
    }

    function getButtonColor () {
        if (registering){
            return getOffButtonColor(scheme);
        } else {
            return buttonColor;
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.loginHeadContainer}>
                    <Text style={styles.loginText}>Register</Text>
                    <Text style={styles.subText}>Please enter your information to register</Text>
                </View>
                <View style={styles.textArray}>
                    {InputArray}
                </View>
                <TouchableOpacity style={styles.submitButton}>
                    <Button title={'Register'} onPress={register} color={getButtonColor()}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Already have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Login here</Text>
                </View>
            </ScrollView>
        </View>
    )
}

