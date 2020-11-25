import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const registerText = [
    new TextBox('Username', 'This field should not be empty', 'username',User.changeUserName),
    new TextBox('Email Address', 'This field should not be empty', 'emailAddress', User.changePassword),
    new TextBox('Confirm Email Address', 'Email addresses must match', 'emailAddress', User.changePassword),
    new TextBox('Password', 'This field should not be empty', 'password',User.changePassword),
    new TextBox('Confirm Password', 'Passwords must match', 'password',User.changePassword),
    new TextBox('Address Line 1', 'This field should not be empty', 'streetAddressLine1',User.changePassword),
    new TextBox('Address Line 2', '', 'streetAddressLine2',User.changePassword),
    new TextBox('City', '', 'addressCity',User.changePassword),
    new TextBox('State', '', 'addressState',User.changePassword),
    new TextBox('Zip Code', '', 'postalCode',User.changePassword),
]