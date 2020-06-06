import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
      private http: HttpClient,
      private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(null);
        //this.currentUserSubject = new BehaviorSubject<User>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, password) {
         //return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
        let heroku_url = "https://ancient-harbor-48882.herokuapp.com"
        //let heroku_url = "http://localhost:4000"
        return this.http.post<any>(`${heroku_url}/login`, { username, password })
            .pipe(map(user => {
              console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                //localStorage.setItem('currentUser', user.body.accessToken);
                //this.router.navigate(['/dashboard']);
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
