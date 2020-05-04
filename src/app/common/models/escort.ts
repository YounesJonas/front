export class Escort {
    public username: String;
    public firstname: String;
    public lastname: String;
    public email: String;
    public nomVille: String;
    public sexe: String;
    public password: String;

    getUsername =() =>{
        return this.username;
    }

    setUsername = (username: String) =>{
        this.username = username;
    }

    getFirstname =() =>{
        return this.firstname;
    }

    setFirstname = (firstname: String) =>{
        this.firstname = firstname;
    }
    getLastname =() =>{
        return this.lastname;
    }

    setLastname = (lastname: String) =>{
        this.lastname = lastname;
    }
    getEmail =() =>{
        return this.email;
    }

    setEmail = (email: String) =>{
        this.email = email;
    }
    getNomPaVille =() =>{
        return this.nomVille;
    }

    setNomVille = (nomVille: String) =>{
        this.nomVille = nomVille;
    }
    getSexe =() =>{
        return this.sexe;
    }

    setSexe = (sexe: String) =>{
        this.sexe = sexe;
    }
    getPassword =() =>{
        return this.password;
    }

    setPassword = (password: String) =>{
        this.password = password;
    }
}