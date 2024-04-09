import { Decision } from "./decision.enum";

export class DataTransfert {
    data: ArrayBuffer;
    decision?: Decision;
    name: string;
    folder: string; 
    userId?: string; 
    remotePath: string; 
    type: string; 

    constructor(data_: ArrayBuffer, decision_: Decision, name_: string, folder_: string, path_: string, type_: string) {
        this.data = data_;
        this.decision= decision_;
        this.name= name_;
        this.folder= folder_; 
        this.remotePath= path_; 
        this.type= type_;
    }
}