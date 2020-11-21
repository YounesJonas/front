export class Request{
    public id: Number;
    public  firstName:string;
	public lastName:string;
	public start:string;
	public end:string;
	public status:string;
	public tarif:string;
    public photo: any;
    public startDate:Date;
    public endDate:Date;
    

    getStartDate =() =>{
        return this.startDate
    }

    setStartDate =(startDate: Date) =>{
        this.startDate = startDate;
    }

    getEndDate =() =>{
        return this.endDate;
    }

    setEndDate =(endDate: Date) =>{
        this.endDate = endDate;
    }

    getId =() =>{
        return this.id;
    }

    setId = (id: Number) =>{
        this.id = id;
    }

    getFirstName =() =>{
        return this.firstName;
    }


    setFirstName = (firstName: string) =>{
        this.firstName = firstName;
    }
    getLastName =() =>{
        return this.lastName;
    }

    setLastName = (lastName: string) =>{
        this.lastName = lastName;
    } 

    getStart =() =>{
        return this.start;
    }

    setStart = (start: string) =>{
        this.start = start;
    }

    getEnd =() =>{
        return this.end
    }
    setEnd =(end: string) =>{
        this.end = end;
    }

    getStatus =() =>{
        return this.status;
    }

    setStatus = (status: string) =>{
        this.status = status;
    }

    getTarif=() =>{
        return this.tarif
    }
    setTarif =(tarif: string) =>{
        this.tarif = tarif;
    }

    getPhoto =() =>{
        return this.photo;
    }

    setPhoto = (photo: any) =>{
        this.photo = photo;
    }
}