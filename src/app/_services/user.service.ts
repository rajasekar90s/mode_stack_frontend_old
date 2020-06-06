import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        let heroku_url = "https://ancient-harbor-48882.herokuapp.com";
        //let heroku_url = "http://localhost:4000"
        //return this.http.get<User[]>(`${test_url}/user/blog/articles`);
        let user = JSON.parse(localStorage.getItem('currentUser'));
        console.log(user);
        return this.http.get<User[]>(`${heroku_url}/article/list`,{
          headers: new HttpHeaders({'Authorization': 'Bearer ' + user.body.accessToken})
        });

    }

    register(user: User) {
        //return this.http.post(`${config.apiUrl}/users/register`, user);
        let heroku_url = "https://ancient-harbor-48882.herokuapp.com"
        //let test_url = "http://localhost:4000"
        return this.http.post(`${heroku_url}/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
}
