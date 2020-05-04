export class Ville {
    public id: Number;
    public nomVille: String;
    public codePostal: Number;


    getId =() =>{
        return this.id;
    }

    setId = (id: Number) =>{

        this.id = id;
    }

    getNomVille =() =>{
        return this.nomVille;
    }

    setNomVille = (nomVille: String) =>{

        this.nomVille = nomVille;
    }


    getCodePostal =() =>{
        return this.codePostal;
    }

    setCodePostal = (codePostal: Number) =>{

        this.codePostal = codePostal;
    }

}