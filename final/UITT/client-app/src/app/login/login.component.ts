import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    model: any = {};

    constructor(
        public accountService: AccountService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {}

    login(): void {
        this.accountService.login(this.model).subscribe((response) => {
            this.router.navigateByUrl('/');
        });
    }
}
