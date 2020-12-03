import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

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