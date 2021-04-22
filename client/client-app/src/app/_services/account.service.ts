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
                        localStorage.setItem('user', JSON.stringify(user));
                        this.currentUserSource.next(user);
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
        this.currentUserSource.next(user);
    }

    logout(): void {
        localStorage.removeItem('user');
        // @ts-ignore
        this.currentUserSource.next(null);
    }
}
