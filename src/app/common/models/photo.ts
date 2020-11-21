export class Photo   {
    public id:number;
    public name:String;
    public picture:any;

    getId =() =>{
        return this.id;
    }

    setId = (id: number) =>{
        this.id = id;
    }
    getName =() =>{
        return this.name;
    }

    setName = (name: String) =>{
        this.name = name;
    }

    getPicture =() =>{
        return this.picture;
    }

    setPicture = (picture: any) =>{
        this.picture = picture;
    }
}