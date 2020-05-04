import { Abstract } from './Abstract';

export class PaysString extends Abstract{
    public nomPays: String;

    getNomPays = () =>{
        return this.nomPays;
    }

    setNomPays = (nomPays: String) =>{
        this.nomPays = nomPays;
    }
}