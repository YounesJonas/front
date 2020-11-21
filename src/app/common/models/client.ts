import { Photo } from './photo';
export class Client {
    public username: string;
    public firstname: string;
    public lastname: string;
    public age: Number;
    public mail: string;
    public picture: Photo;
    public password: string;
    public dateDeNaissance: Date;
    public namePhoto: string;
    

    getDateDeNaissance =() =>{
        return this.dateDeNaissance;
    }

    setDateDeNaissance = (dateDeNaissance: Date) =>{
        this.dateDeNaissance = dateDeNaissance;
    }
    getUsername =() =>{
        return this.username;
    }

    setUsername = (username: string) =>{
        this.username = username;
    }

    getFirstname =() =>{
        return this.firstname;
    }


    setFirstname = (firstname: string) =>{
        this.firstname = firstname;
    }
    getLastname =() =>{
        return this.lastname;
    }

    setLastname = (lastname: string) =>{
        this.lastname = lastname;
    } 
    getMail =() =>{
        return this.mail;
    }

    setMail = (mail: string) =>{
        this.mail = mail;
    }

    getAge =() =>{
        return this.age;
    }

    setAge =(age : Number)=>{
        this.age = age;
    }
    getPassword =() =>{
        return this.password;
    }

    setPassword = (password: string) =>{
        this.password = password;
    }

    getPicture =() =>{
        return this.picture;
    }

    setPicture = (picture: Photo) =>{
        this.picture = picture;
    }
}