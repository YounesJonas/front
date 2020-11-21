export class Nationalite {
    public id: Number;
    public nationalite: String;

    getId =() =>{
        return this.id;
    }

    setId = (id: Number) =>{

        this.id = id;
    }

    getNationalite =() =>{
        return this.nationalite;
    }

    setNationalite = (nationalite: String) =>{

        this.nationalite = nationalite;
    }
}