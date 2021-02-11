import React, {useState} from 'react'
import {Button, Text, TouchableOpacity, useColorScheme, View} from 'react-native'
import {buttonColor, getOffButtonColor, getStyle} from '../assets/Stylesheets/Styles'
import {getUser} from "../assets/Data/Data";
import InputBox from "../components/RenderTextBox";
import {useDispatch} from "react-redux";
import {changePlan, changeProfile, logIn} from "../redux/action";
import {getUserFromOnline} from "../assets/Data/Storage";
import {makeAlert} from "../components/errorMessage";
import {loginError} from "../assets/text/text";

export default function LoginScreen ({route, navigation}: any) {
    const params = route.params;
    let goingBack = false;
    if(params != undefined){
        //I think this is the only way to make an optional screen parameter
        goingBack = params.goingBack;
    }

    const [isSubmitted, submit] = useState(false);
    const [i, update] = useState(0);
    const [loggingIn, setLoggingIn] = useState(false);
    const [validUser, setValidUser] = useState(false);
    const [validPass, setValidPass] = useState(false);

    const dispatch = useDispatch();

    const scheme = useColorScheme();
    let styles = getStyle(scheme);
    let User = getUser();
    let keys=0;

    let InputArray = [
        <InputBox placeHolder={'Username'}
                  key={keys++}
                  errorMessage={()=> {return validUser? '':'Username does not exist'}}
                  type={"username"}
                  onSubmitEditing={User.changeUserName}
                  submitted={isSubmitted}/>,
        <InputBox placeHolder={'Password'}
                  key={keys++}
                  errorMessage={()=> {if(User.validatePassword() === ""){
                      return validPass? '':'Incorrect Password'
                  } else {
                      return User.validatePassword();
                  }}}
                  type={"password"}
                  onSubmitEditing={User.changePassword}
                  submitted={isSubmitted}/>
    ]

    function onPressText () {
        User.changeUserName('')
        User.changePassword('')
        navigation.navigate('RegisterScreen', {goingBack: goingBack})
    }

    function onPressButton () {
        if(!loggingIn){
            if (User.validatePassword() === '') {
                setLoggingIn(true);
                getUserFromOnline(User.getUserName(),
                    User.getPassword(),
                    ()=> {
                        makeAlert(loginError());
                        setLoggingIn(false);
                    },
                    () => {
                        getUser().logIn();
                        if(goingBack){
                            navigation.goBack();
                        }
                        dispatch(logIn());
                        dispatch(changePlan());
                        dispatch(changeProfile());
                        setLoggingIn(false);
                    },
                    () => {
                        setValidUser(true);
                        setValidPass(false);
                        submit(true);
                        update(i+1);
                        setLoggingIn(false);
                    },
                    ()=> {
                        setValidUser(false);
                        setValidPass(true);
                        submit(true);
                        update(i+1);
                        setLoggingIn(false);
                    })
            } else {
                submit(true);
                update(i+1);
            }
        }
    }

    function getButtonColor () {
        if (loggingIn){
            return getOffButtonColor(scheme);
        } else {
            return buttonColor;
        }
    }

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginHeadContainer}>
                <Text style={styles.loginText}>Login</Text>
                <Text style={styles.subText}>Please enter your login information</Text>
            </View>
            <View style={styles.loginHeadContainer}>
                <View style={styles.textArray}>
                    {InputArray}
                </View>
                <TouchableOpacity>
                    <Button  title={'Submit'} onPress={onPressButton} color={getButtonColor()}/>
                </TouchableOpacity>
                <View style={styles.wordRow}>
                    <Text style={styles.subText}>Don't have an account? </Text>
                    <Text style={styles.hyperLink} onPress={onPressText}>Register here</Text>
                </View>
            </View>
        </View>
    )
}
