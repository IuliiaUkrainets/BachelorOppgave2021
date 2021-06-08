import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { serialize } from 'uri-js';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    baseUrl = environment.apiUrl;
    users: User[] = [];
    paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    userCash = new Map();

    constructor(private http: HttpClient) {}

    getUsers(
        page?: number,
        itemsPerPage?: number,
        search?: string
    ): Observable<PaginatedResult<User[]>> {
        let params = new HttpParams();
        if (page !== null && itemsPerPage !== null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }

        if (search !== null) {
            params = params.append('search', search);
        }
        return this.http
            .get<User[]>(this.baseUrl + 'users', {
                observe: 'response',
                params,
            })
            .pipe(
                map((response) => {
                    this.paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') !== null) {
                        this.paginatedResult.pagination = JSON.parse(
                            response.headers.get('Pagination')
                        );
                    }
                    return this.paginatedResult;
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
