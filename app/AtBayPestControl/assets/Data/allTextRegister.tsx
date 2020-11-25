import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const registerText = [
    new TextBox('Username', 'This field should not be empty', 'username', User.changeUserName),
    new TextBox('Email Address', 'This field should not be empty', 'emailAddress',
        User.getEmails()[User.getEmails().length-1].updateEmail),
    new TextBox('Confirm Email Address', 'Email addresses must match', 'emailAddress',
        User.getEmails()[User.getEmails().length-1].updateEmail),
    new TextBox('Password', 'This field should not be empty', 'password',User.changePassword),
    new TextBox('Confirm Password', 'Passwords must match', 'password',User.changePassword),
    new TextBox('Address Line 1', 'This field should not be empty', 'streetAddressLine1',
        User.getAddresses()[User.getAddresses().length-1].updateAddress),
    new TextBox('Address Line 2', '', 'streetAddressLine2',
        User.getAddresses()[User.getAddresses().length-1].updateAddressLine2),
    new TextBox('City', '', 'addressCity',
        User.getAddresses()[User.getAddresses().length-1].updateCity),
    new TextBox('State', '', 'addressState',
        User.getAddresses()[User.getAddresses().length-1].updateState),
    new TextBox('Zip Code', '', 'postalCode',
        User.getAddresses()[User.getAddresses().length-1].updateZip),
]