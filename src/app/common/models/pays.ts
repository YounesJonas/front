import { Abstract } from './Abstract';

export class Pays  {

    public id: Number;
    public nomPays: String;
    public iconePays: any;

    getId =() =>{
        return this.id;
    }

    setId = (id: Number) =>{

        this.id = id;
    }

    getNomPays =() =>{
        return this.nomPays;
    }

    setNomPays = (nomPays: String) =>{
        this.nomPays = nomPays;
    }

    getIconePays =() =>{
        return this.iconePays;
    }

    setIconePays = (iconePays: any) =>{
        this.iconePays = iconePays;
    }

}