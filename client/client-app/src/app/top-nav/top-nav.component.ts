import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(public accountService: AccountService) {}

    ngOnInit(): void {}

    logout(): void {
        this.accountService.logout();
    }
}
