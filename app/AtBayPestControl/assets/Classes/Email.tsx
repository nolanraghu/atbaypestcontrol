// Simple class to contain the Emails. The multiple emails of the user will be an array of these objects

interface EmailProps {
    email: string
}

interface EmailasJSON {
    email: string
}

export default class Email implements EmailProps{
    email: string = "";

    constructor (email: string = '') {
            this.email = email;
    }

    toString = () => {
        return JSON.stringify (
            {
                email: this.email
            }
        );
    }

    fromString = (jsonString: string) => {
        let json = JSON.parse(jsonString) as EmailasJSON;

        this.email = json.email;

        return this;
    }

    getEmail = () => {
        return this.email;
    }

    updateEmail = (email: string) => {
        this.email = email;
    }

    equals = (email: string) => {
        if (this.getEmail().toLowerCase() === email.toLowerCase()) return '';
        else return 'Emails must match'
    }
}
