// Simple class to contain the Emails. The multiple emails of the user will be an array of these objects

interface EmailProps {
    id: string, // id
    email: string, // the email
    type: string, // the type of email "personal", "work"
    defaultE: boolean // Whether this particular email is the default or not (may not be needed)
}

export default class Email implements EmailProps{

    id: string = "";
    email: string = "";
    type: string = "";
    defaultE: boolean = false;

    constructor (id: string = "", email: string = "", type: string = "", defaultE: boolean = false) {
        this.id = id;
        this.email = email;
        this.type = type;
        this.defaultE = defaultE;
    }

    getEmail = () => {
        return this.email;
    }

    getType = () => {
        return this.type;
    }

    getDefaultE = () => {
        return this.defaultE;
    }

    updateEmail = (email: string) => {
        this.email = email;
    }

    updateType = (type: string) => {
        this.type = type
    }

    updateDefaultE = (defaultE: boolean) => {
        this.defaultE = defaultE
    }

}