import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    baseUrl = environment.apiUrl;
    users: User[] = [];

    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        if (this.users.length > 0) {
            return of(this.users);
        }
        return this.http.get<User[]>(this.baseUrl + 'users').pipe(
            map((users) => {
                this.users = users;
                return users;
            })
        );
    }

    getUser(username: string | null): Observable<User> {
        const user = this.users.find((x) => x.username === username);
        if (user !== undefined) {
            return of(user);
        }
        return this.http.get<User>(this.baseUrl + 'users/' + username);
    }

    updateUser(user: User | undefined): Observable<User> {
        // @ts-ignore
        return this.http.put<User>(this.baseUrl + 'users', user).pipe(
            map(() => {
                if (user) {
                    const index = this.users.indexOf(user);
                    this.users[index] = user;
                }
            })
        );
    }

    deletePhoto(photoId: number): Observable<any> {
        return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
    }
}
