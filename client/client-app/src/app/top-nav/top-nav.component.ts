import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(
        public accountService: AccountService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {}

    logout(): void {
        this.accountService.logout();
        // this.router.navigateByUrl('/');
    }
}
