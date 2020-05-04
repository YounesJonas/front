import { Abstract } from './Abstract';

export class CityString extends Abstract{
    public nomVille: String;
    public codePostal: Number;

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