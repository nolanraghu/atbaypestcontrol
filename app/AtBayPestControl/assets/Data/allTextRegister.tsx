import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const registerText = [
    new TextBox('Username', User.validateEmail, 'username',
        User.changeUserName),
    new TextBox('Email Address', User.validateEmail, 'emailAddress',
        User.getEmailByID(User.getEmails().length-1).updateEmail),
    new TextBox('Confirm Email Address', User.validateEmail, 'emailAddress',
        User.getEmailByID(User.getEmails().length-1).updateEmail),
    new TextBox('Password', User.validatePassword, 'password',
        User.changePassword),
    new TextBox('Confirm Password', User.validatePassword, 'password',
        User.changePassword),
    new TextBox('Address Line 1', User.validateAddress, 'streetAddressLine1',
        User.getAddressByID(User.getAddresses().length-1).updateAddress),
    new TextBox('Address Line 2', User.validateAddress, 'streetAddressLine2',
        User.getAddressByID(User.getAddresses().length-1).updateAddressLine2),
    new TextBox('City', User.validateCity, 'addressCity',
        User.getAddressByID(User.getAddresses().length-1).updateCity),
    new TextBox('State', User.validateState, 'addressState',
        User.getAddressByID(User.getAddresses().length-1).updateState),
    new TextBox('Zip Code', User.validateZip, 'postalCode',
        User.getAddressByID(User.getAddresses().length-1).updateZip),
]