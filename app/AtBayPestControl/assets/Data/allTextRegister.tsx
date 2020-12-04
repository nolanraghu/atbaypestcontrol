import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";
import InputBox from "../../components/RenderTextBox";
import React from "react";

let User = getUser()

export const registerText = [
    new TextBox('Username', User.validateUserName, 'username',
        (newText) => User.changeUserName(newText)),
    new TextBox('Email Address', User.validateEmail, 'emailAddress',
        (newText) => User.getLatestEmail().updateEmail(newText)),
    new TextBox('Confirm Email Address', User.validateEmail, 'emailAddress',
        (newText) => User.getLatestEmail().updateEmail(newText)),
    new TextBox('Password', User.validatePassword, 'password',
        (newText) => User.changePassword(newText)),
    new TextBox('Confirm Password', User.validatePassword, 'password',
        (newText) => User.changePassword(newText)),
    new TextBox('Address Line 1', User.validateAddress, 'streetAddressLine1',
        (newText) => User.getLatestAddress().updateAddress(newText)),
    new TextBox('Address Line 2', User.validateAddress2, 'streetAddressLine2',
        (newText) => User.getLatestAddress().updateAddressLine2(newText)),
    new TextBox('City', User.validateCity, 'addressCity',
        (newText) => User.getLatestAddress().updateCity(newText)),
    new TextBox('State', User.validateState, 'addressState',
        (newText) => User.getLatestAddress().updateState(newText)),
    new TextBox('Zip Code', User.validateZip, 'postalCode',
        (newText) => User.getLatestAddress().updateZip(newText)),
]

export function registerInputs (isSubmitted:boolean){
    let emailMatch = '';
    let passMatch = '';
    let keys = 0;
    return (
        [
            <InputBox key={keys++}
                      placeHolder={'Username'}
                      errorMessage={User.validateUserName}
                      type={"username"}
                      onSubmitEditing={(newText) => User.changeUserName(newText)}
                      submitted={isSubmitted}/>,
            <InputBox key={keys++}
                      placeHolder={'Email Address'}
                      errorMessage={User.validateEmail}
                      type={"emailAddress"}
                      onSubmitEditing={(newText) => User.getLatestEmail().updateEmail(newText)}
                      submitted={isSubmitted}/>,
            <InputBox key={keys++}
                      placeHolder={'Confirm Email Address'}
                      errorMessage={()=> {
                          if (User.getLatestEmail().getEmail() === emailMatch){
                              return '';
                          } else {
                              return 'Emails do not match';
                          }
                      }}
                      type={"emailAddress"}
                      onSubmitEditing={newText => emailMatch = newText}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Password'}
                      key={keys++}
                      errorMessage={User.validatePassword}
                      type={"password"}
                      onSubmitEditing={(newText) => User.changePassword(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Confirm Password'}
                      key={keys++}
                      errorMessage={()=>{
                          if (User.getPassword() === passMatch){
                              return ''
                          } else {
                              console.log(User.toString());
                              console.log(emailMatch);
                              console.log(passMatch);
                              return 'Passwords do not match'
                          }
                      }}
                      type={"password"}
                      onSubmitEditing={newText => passMatch = newText}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Address Line 1'}
                      key={keys++}
                      errorMessage={User.validateAddress}
                      type={'streetAddressLine1'}
                      onSubmitEditing={(newText) => User.getLatestAddress().updateAddress(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Address Line 2'}
                      key={keys++}
                      errorMessage={User.validateAddress2}
                      type={'streetAddressLine2'}
                      onSubmitEditing={(newText) => User.getLatestAddress().updateAddressLine2(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'City'}
                      key={keys++}
                      errorMessage={User.validateCity}
                      type={'addressCity'}
                      onSubmitEditing={(newText) => User.getLatestAddress().updateCity(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'State'}
                      key={keys++}
                      errorMessage={User.validateState}
                      type={'addressState'}
                      onSubmitEditing={(newText) => User.getLatestAddress().updateState(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Zip Code'}
                      key={keys++}
                      errorMessage={User.validateZip}
                      type={'postalCode'}
                      onSubmitEditing={(newText) => User.getLatestAddress().updateZip(newText)}
                      submitted={isSubmitted}/>
        ]
    );
}
