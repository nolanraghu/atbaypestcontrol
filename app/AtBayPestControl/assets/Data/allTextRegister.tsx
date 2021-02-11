import {getUser} from "./Data";
import InputBox from "../../components/RenderTextBox";
import React from "react";

export function registerInputs (isSubmitted:boolean,
                                emailMatch:string,
                                setEmailMatch:any,
                                passMatch:string,
                                setPassMatch:any){
    let User = getUser()
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
                      onSubmitEditing={(newText) => User.defaultEmail().updateEmail(newText)}
                      submitted={isSubmitted}/>,
            <InputBox key={keys++}
                      placeHolder={'Confirm Email Address'}
                      errorMessage={()=> {
                          if (User.defaultEmail().getEmail() === emailMatch){
                              return '';
                          } else {
                              return 'Emails do not match';
                          }
                      }}
                      type={"emailAddress"}
                      onSubmitEditing={newText => setEmailMatch(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Password'}
                      key={keys++}
                      errorMessage={User.validatePassword}
                      type={"none"}
                      onSubmitEditing={(newText) => User.changePassword(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Confirm Password'}
                      key={keys++}
                      errorMessage={()=>{
                          if (User.getPassword() === passMatch){
                              return ''
                          } else {
                              return 'Passwords do not match'
                          }
                      }}
                      type={"none"}
                      onSubmitEditing={newText => setPassMatch(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Address Line 1'}
                      key={keys++}
                      errorMessage={User.validateAddress}
                      type={'streetAddressLine1'}
                      onSubmitEditing={(newText) => User.defaultAddress().updateAddress(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Address Line 2'}
                      key={keys++}
                      errorMessage={User.validateAddress2}
                      type={'streetAddressLine2'}
                      onSubmitEditing={(newText) => User.defaultAddress().updateAddressLine2(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'City'}
                      key={keys++}
                      errorMessage={User.validateCity}
                      type={'addressCity'}
                      onSubmitEditing={(newText) => User.defaultAddress().updateCity(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'State'}
                      key={keys++}
                      errorMessage={User.validateState}
                      type={'addressState'}
                      onSubmitEditing={(newText) => User.defaultAddress().updateState(newText)}
                      submitted={isSubmitted}/>,
            <InputBox placeHolder={'Zip Code'}
                      key={keys++}
                      errorMessage={User.validateZip}
                      type={'postalCode'}
                      onSubmitEditing={(newText) => User.defaultAddress().updateZip(newText)}
                      submitted={isSubmitted}/>
        ]
    );
}
