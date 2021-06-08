import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppUser } from '../_models/appuser';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    baseUrl = environment.apiUrl;
    private currentUserSource = new ReplaySubject<AppUser>(1);
    currentUser$ = this.currentUserSource.asObservable();

    constructor(private http: HttpClient) {}

    login(model: any): Observable<any> {
        return this.http
            .post<AppUser>(this.baseUrl + 'account/login', model)
            .pipe(
                map((response: AppUser) => {
                    let user: AppUser;
                    user = response;
                    if (user) {
                        this.setCurrentUser(user);
                    }
                })
            );
    }

    renewToken(): Observable<any> {
        return this.http
            .get<AppUser>(this.baseUrl + 'account/renew-token')
            .pipe(
                map((response: AppUser) => {
                    let user: AppUser;
                    user = response;
                    if (user) {
                        localStorage.removeItem('user');
                        this.setCurrentUser(user);
                    }
                })
            );
    }

    register(model: any): Observable<any> {
        return this.http
            .post<AppUser>(this.baseUrl + 'account/register', model)
            .pipe(
                map((user: AppUser) => {
                    if (user) {
                        // localStorage.setItem('user', JSON.stringify(user));
                        // this.currentUserSource.next(user);
                    }
                    return user;
                })
            );
    }

    setCurrentUser(user: AppUser): void {
        user.roles = [];
        const roles = this.getDecodedToken(user.token).role;
        Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user);
    }

    logout(): void {
        localStorage.removeItem('user');
        // @ts-ignore
        this.currentUserSource.next(null);
    }

    // tslint:disable-next-line:typedef
    getDecodedToken(token) {
        return JSON.parse(atob(token.split('.')[1]));
    }
}
