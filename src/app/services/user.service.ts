import { Injectable, Optional } from "@angular/core";
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import { User } from "../models/user";
import 'rxjs-compat'
import { ServiceResponse } from "../models/serviceReponse";
import { Observable } from "rxjs";
import { LoginRequest } from "../models/loginRequest";
import { LoginResponse } from "../models/loginResponse";

@Injectable({
    providedIn: 'root',
})  

export class UserService {
    protected basePath = 'http://localhost:8760';
    public defaultHeaders: Headers = new Headers({ 
'Content-Type': 'application/json;charset=UTF-8'
});

    constructor(private httpClient: Http) {}

    register(user: User, extraHttpRequestParams?: any) : Observable<ServiceResponse> {
        const path = this.basePath+'/ctoassociate/createUser';
//debugger
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'user' is not null or undefined
        if (user === null || user === undefined) {
            throw new Error('Required parameter user was null or undefined when calling createUser.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(user);
        return this.httpClient.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }
    
    
    public login (loginRequest: LoginRequest, extraHttpRequestParams?: any ) : Observable<LoginResponse> {
        const path = this.basePath + '/ctoassociate/login';
        debugger;
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        // verify required parameter 'loginRequest' is not null or undefined
        if (loginRequest === null || loginRequest === undefined) {
            throw new Error('Required parameter loginRequest was null or undefined when calling login.');
        }
        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = JSON.stringify(loginRequest);

        return this.httpClient.request(path, requestOptions)
            .map((response: Response) => {
                if (response.status === 204) {
                    return undefined;
                } else {
                    return response.json();
                }
            });
    }
}