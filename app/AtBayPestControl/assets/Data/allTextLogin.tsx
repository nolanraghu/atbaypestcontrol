import TextBox from "../Classes/TextBox";
import {getUser} from "./Data";

let User = getUser()

export const loginText = [
    new TextBox('Username', () => {return ""}, 'username',
        User.changeUserName),
    new TextBox('Password', User.validatePassword, 'password',
        User.changePassword)
]
