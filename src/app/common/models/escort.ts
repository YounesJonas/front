import { Photo } from './photo';

export class Escort {
    public username: String;
    public firstname: String;
    public lastname: String;
    public nomUtilisateur: String;
    public numeroTel: String;
    public age: Number;
    public taille: Number;
    public poids: Number;
    public description: String;
    public orientationSexuelle: String;
    public aProposDeMoi: String;
    public nationalite: String;
    public yeux: String;
    public cheveux: String;
    public mail: String;
    public nomVille: String;
    public sexe: String;
    public password: String;
    public dateDeNaissance: Date;
    public siteUrl: String;
    public pictures: Array<Photo>;
    getDateDeNaissance =() =>{
        return this.dateDeNaissance;
    }

    setDateDeNaissance = (dateDeNaissance: Date) =>{
        this.dateDeNaissance = dateDeNaissance;
    }



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

    getNationalite =() =>{
        return this.nationalite;
    }

    setNationalite = (nationalite: String) =>{
        this.nationalite = nationalite;
    }

    getMail =() =>{
        return this.mail;
    }

    setMail = (mail: String) =>{
        this.mail = mail;
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

    getTaille =() =>{
        return this.taille;
    }

   
}