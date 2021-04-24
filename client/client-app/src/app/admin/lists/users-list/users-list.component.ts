import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    users$: Observable<User[]> | undefined;

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
    }
}
