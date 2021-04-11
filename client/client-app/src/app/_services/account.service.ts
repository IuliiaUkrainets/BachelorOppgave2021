import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    baseUrl = 'https://localhost:5001/api/';
    private currentUserSource = new ReplaySubject<User>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {}

    login(model: any): Observable<any> {
        return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
            map((response: User) => {
                let user: User;
                user = response;
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.currentUserSource.next(user);
                }
            })
        );
    }

    setCurrentUser(user: User): void {
        this.currentUserSource.next(user);
    }

    logout(): void {
        localStorage.removeItem('user');
        // @ts-ignore
        this.currentUserSource.next(null);
    }
}
