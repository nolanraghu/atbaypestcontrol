import {getUser} from "../Data/Data";

let User = getUser()

interface textProps {
    placeHolder: string
    errorMessage: () => string
    type: 'username' | 'password' | 'addressCity' | 'addressState' | 'streetAddressLine1' | 'streetAddressLine2' |
        'postalCode' | 'emailAddress' | 'none'
    onSubmit: (text: string) => void
}

export default class textBox implements textProps {
    placeHolder: string = '';
    errorMessage: () => string = User.validatePassword;
    type: 'username' | 'password' | 'addressCity' | 'addressState' | 'streetAddressLine1' | 'streetAddressLine2' |
        'postalCode' | 'emailAddress' | 'none' = 'username';
    onSubmit: (text: string) => void = User.getBackgroundPic;

    constructor(placeHolder: string, errorMessage: () => string, type: 'username' | 'password' | 'addressCity' | 'addressState' | 'streetAddressLine1' | 'streetAddressLine2' |
        'postalCode' | 'emailAddress' | 'none' = 'username', onSubmit: (text: string) => void) {
        this.placeHolder = placeHolder;
        this.errorMessage = errorMessage;
        this.type = type;
        this.onSubmit = onSubmit;
    }

    getPlaceHolder = () => {
        return this.placeHolder
    }

    getErrorMessage = () => {
        return this.errorMessage
    }

    getType = () => {
        return this.type
    }

    getOnSubmit = () => {
        return this.onSubmit
    }
}
