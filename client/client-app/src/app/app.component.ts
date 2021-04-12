import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    users: any;

    constructor(public accountService: AccountService) {}

    ngOnInit(): void {
        this.setCurrentUser();
    }

    setCurrentUser(): void {
        const user: User = JSON.parse(localStorage.getItem('user') || '{}');
        this.accountService.setCurrentUser(user);
    }
}
