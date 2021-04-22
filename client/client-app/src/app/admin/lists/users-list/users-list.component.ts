import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users.service';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    users: User[] = [];

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe((users) => {
            this.users = users;
        });
    }
}
