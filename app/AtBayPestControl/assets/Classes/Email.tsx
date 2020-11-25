// Simple class to contain the Emails. The multiple emails of the user will be an array of these objects

interface EmailProps {
    id: string, // id
    email: string, // the email
    type: string, // the type of email "personal", "work"
    defaultE: boolean // Whether this particular email is the default or not (may not be needed)
}

interface EmailasJSON {
    id: string,
    email: string,
    type: string,
    defaultE: boolean
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

    toString = () => {
        return JSON.stringify (
            {
                id: this.id,
                email: this.email,
                type: this.email,
                defaultE: this.defaultE
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as EmailasJSON;

        this.id = json.id;
        this.email = json.email;
        this.type = json.type;
        this.defaultE = json.defaultE;
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