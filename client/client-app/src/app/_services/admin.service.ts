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
}
