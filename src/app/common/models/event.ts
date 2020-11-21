export class event {
    public title: String;
    public start: Date;
    public end: Date;
    public color: String;

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
}