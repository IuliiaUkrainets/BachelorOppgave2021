import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UsersService } from '../../_services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    user: User | undefined;

    constructor(
        private userService: UsersService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }

    loadUser(): void {
        this.userService
            .getUser(this.route.snapshot.paramMap.get('username'))
            .subscribe((user) => {
                this.user = user;
            });
    }
}
