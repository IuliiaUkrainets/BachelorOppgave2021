import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForAdmin } from '../_models/user';

@Injectable({
    providedIn: 'root',
})
export class AdminService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getUsersWithRoles(): Observable<UserForAdmin[]> {
        return this.http.get<UserForAdmin[]>(
            this.baseUrl + 'admin/users-with-roles'
        );
    }

    updateUserRoles(username: string, roles: string[]): Observable<any> {
        return this.http.post(
            this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles,
            {}
        );
    }
}
