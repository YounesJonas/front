export class ConfirmationEmail {

    public email: String;
    public codeConfirmation: Number;


    getEmail =() =>{
        return this.email;
    }

    setEmail = (email: String) =>{
        this.email = email;
    }


    getCodeConfirmation =() =>{
        return this.codeConfirmation;
    }

    setCodeConfirmation = (codeConfirmation: Number) =>{
        this.codeConfirmation = codeConfirmation;
    }
}