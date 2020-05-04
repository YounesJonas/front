import { Abstract } from './Abstract';

export class ReturnCodeObject extends Abstract {

    public returnCode: String;

    getReturnCode =() =>{
        return this.returnCode;
    }

    setReturnCode = (returnCode: String) =>{

        this.returnCode = returnCode;
    }
}