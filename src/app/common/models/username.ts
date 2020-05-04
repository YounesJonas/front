import { Abstract } from './Abstract';

export class Username extends Abstract{
    public username: String;

    getUsername = () =>{
        return this.username;
    }

    setUsername = (username: String) =>{
        this.username = username;
    }
}