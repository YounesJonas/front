

export class ReturnCodeObject {

    public returnCode: String;

    getReturnCode =() =>{
        return this.returnCode;
    }

    setReturnCode = (returnCode: String) =>{

        this.returnCode = returnCode;
    }
}