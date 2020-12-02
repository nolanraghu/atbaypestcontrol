import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const registerText = [
    new TextBox('Username', User.validateEmail, 'username',
        User.changeUserName),
    new TextBox('Email Address', User.validateEmail, 'emailAddress',
        User.getLatestEmail().updateEmail),
    new TextBox('Confirm Email Address', User.validateEmail, 'emailAddress',
        User.getLatestEmail().updateEmail),
    new TextBox('Password', User.validatePassword, 'password',
        User.changePassword),
    new TextBox('Confirm Password', User.validatePassword, 'password',
        User.changePassword),
    new TextBox('Address Line 1', User.validateAddress, 'streetAddressLine1',
        User.getLatestAddress().updateAddress),
    new TextBox('Address Line 2', User.validateAddress2, 'streetAddressLine2',
        User.getLatestAddress().updateAddressLine2),
    new TextBox('City', User.validateCity, 'addressCity',
        User.getLatestAddress().updateCity),
    new TextBox('State', User.validateState, 'addressState',
        User.getLatestAddress().updateState),
    new TextBox('Zip Code', User.validateZip, 'postalCode',
        User.getLatestAddress().updateZip),
]