import { Http, Headers, RequestOptionsArgs, Response, URLSearchParams } from "@angular/http";
import 'rxjs/Rx';
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { LoginRequest } from "../models/loginRequest";
import { LoginResponse } from "../models/loginResponse";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    isLoggedIn = false;
    user: User = {};
    actingUser: User = {};
    redirectUrl: string;

    /*protected basePath = 'http://localhost:8760/challenge-service';
    public defaultHeaders: Headers = new Headers({ 'Content-Type': 'application/json' });*/

    constructor(public router: Router) {}

    /*login(loginRequest: LoginRequest, extraHttpRequestParams?: any)  : Observable<LoginResponse> {
        const path = this.basePath+'/ctoassociate/login';

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;

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
    }*/
    reset(): void {
        this.isLoggedIn = false;
        this.user = {};
        this.actingUser = {};
      }

    logout() {
        //localStorage.removeItem('currnetUser');
        this.reset();
        this.router.navigate(['/login']);
    }
}