import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    users: any;

    constructor(
        private http: HttpClient,
        public accountService: AccountService
    ) {}

    ngOnInit(): void {
        this.getUsers();
        this.setCurrentUser();
    }

    setCurrentUser(): void {
        const user: User = JSON.parse(localStorage.getItem('user') || '{}');
        this.accountService.setCurrentUser(user);
    }

    getUsers(): void {
        this.http.get('https://localhost:5001/api/users').subscribe(
            (response) => {
                // @ts-ignore
                this.users = response;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
