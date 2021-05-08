import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';
import { UsersService } from '../../../_services/users.service';
import { Observable } from 'rxjs';
import { Pagination } from '../../../_models/pagination';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    pageNumber = 1;
    pageSize = 5;

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.loadMembers();
    }

    // tslint:disable-next-line:typedef
    loadMembers() {
        this.userService
            .getUsers(this.pageNumber, this.pageSize)
            .subscribe((response) => {
                this.users = response.result;
                this.pagination = response.pagination;
            });
    }
}
