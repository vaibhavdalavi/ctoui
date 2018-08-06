export interface ServiceResponse {
    

    message?: string;

    status?: ServiceResponse.StatusEnum;
}
export namespace ServiceResponse {

    export enum StatusEnum { 
        FAILED = <any> 'FAILED',
        SUCCESS = <any> 'SUCCESS',
    }
}