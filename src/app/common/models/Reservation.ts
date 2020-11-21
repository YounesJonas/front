export class Reservation{
    public id: Number;
    public title: String;
    public start: Date;
    public end: Date;
    public color: String;
    public tarif: any;
    public username: String;
    public sexe: String;
    public orientationSexuelle: String;
    public ville: String;
    public adresse: String;

    getId =() =>{
        return this.id;
    }

    setId = (id: Number) =>{
        this.id = id;
    }

    getTitle =() =>{
        return this.title;
    }

    setTitle = (title: String) =>{
        this.title = title;
    }

    getStart =() =>{
        return this.start;
    }

    setStart = (start: Date) =>{
        this.start = start;
    }

    getEnd =() =>{
        return this.end;
    }

    setEnd = (end: Date) =>{
        this.end = end;
    }

    getColor =() =>{
        return this.end;
    }

    setColor = (color: String)  =>{
        this.color = color;
    }

    getTarif =() =>{
        return this.tarif;
    }

    setTarif = (tarif: any)  =>{
        this.tarif = tarif;
    }

    getUsername =() =>{
        return this.username;
    }

    setUsername = (username: String)  =>{
        this.username = username;
    }

    getSexe =() =>{
        return this.sexe;
    }

    setSexe = (sexe: String)  =>{
        this.sexe = sexe;
    }

    getVille =() =>{
        return this.ville;
    }

    setVille = (ville: String)  =>{
        this.ville = ville;
    }

    getAdresse =() =>{
        return this.adresse;
    }

    setAdresse = (adresse: String)  =>{
        this.adresse = adresse;
    }
}