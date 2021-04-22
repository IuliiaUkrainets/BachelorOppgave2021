import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(public accountService: AccountService) {}

    ngOnInit(): void {
        this.setCurrentUser();
    }

    setCurrentUser(): void {
        // @ts-ignore
        const user: AppUser = JSON.parse(localStorage.getItem('user'));
        this.accountService.setCurrentUser(user);
    }
}
