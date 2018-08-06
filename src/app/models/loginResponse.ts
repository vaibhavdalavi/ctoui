import { User } from "./user";

export interface LoginResponse {
    message?: string;

    status?: LoginResponse.StatusEnum;

    user?: User;
}
export namespace LoginResponse {

    export enum StatusEnum { 
        FAILED = <any> 'FAILED',
        SUCCESS = <any> 'SUCCESS',
    }
}