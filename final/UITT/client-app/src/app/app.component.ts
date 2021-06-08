import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from './_services/param.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        public accountService: AccountService,
        public router: Router,
        private route: ActivatedRoute,
        private paramService: ParamService
    ) {}

    ngOnInit(): void {
        this.setCurrentUser();
    }

    setCurrentUser(): void {
        // @ts-ignore
        const user: AppUser = JSON.parse(localStorage.getItem('user'));
        this.accountService.setCurrentUser(user);
    }

    isImageRoute(): boolean {
        return (
            this.router.url ===
            '/image/' +
                this.paramService.paramId +
                '/' +
                this.paramService.paramPatientId
        );
    }
}
