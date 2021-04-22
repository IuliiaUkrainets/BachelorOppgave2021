import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.baseUrl + 'users');
    }

    getUser(username: string | null): Observable<User> {
        return this.http.get<User>(this.baseUrl + 'users/' + username);
    }
}
