import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UsersService } from '../_services/users.service';
import { Pagination } from '../_models/pagination';
import { SearchParamService } from '../_services/search-param.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    pageNumber = 1;
    pageSize = 9;
    search = '';

    constructor(
        private userService: UsersService,
        private searchService: SearchParamService
    ) {}

    ngOnInit(): void {
        this.loadMembers();
        this.searchService.search.subscribe((result) => {
            this.search = result;
            this.loadMembers();
        });
    }

    // tslint:disable-next-line:typedef
    loadMembers(): void {
        this.userService
            .getUsers(this.pageNumber, this.pageSize, this.search)
            .subscribe((response) => {
                this.users = response.result;
                this.pagination = response.pagination;
            });
    }

    pageChanged(event: any): void {
        this.pageNumber = event.page;
        this.loadMembers();
    }
}
