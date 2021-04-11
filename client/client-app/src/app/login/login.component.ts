import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(public accountService: AccountService) {}

    ngOnInit(): void {}

    login(): void {
        this.accountService.login(this.model).subscribe(
            (response) => {
                console.log(this.accountService.currentUser$);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
