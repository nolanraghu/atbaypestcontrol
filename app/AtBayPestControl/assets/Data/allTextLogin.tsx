import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const loginText = [
    new TextBox('Username/Email', 'This field should not be empty', 'username',User.changeUserName),
    new TextBox('Password', 'This field should not be empty', 'password', User.changePassword)
]
