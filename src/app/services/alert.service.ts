import { Subject, Observable } from "rxjs";
import { Router, NavigationStart } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private subject = new Subject<any>();
    private flag = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.flag) {
                    this.flag = false;
                } else {
                    this.subject.next();
                }
            }
        });
    }

    success(message: string, flag = false) {
        this.flag = flag;
        this.subject.next({type: 'success', text: message});
    }

    error(message: string, flag = false) {
        this.flag = flag;
        this.subject.next({type: 'error', text:message});
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }

}