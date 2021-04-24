import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UsersService } from '../_services/users.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    users$: Observable<User[]> | undefined;

    constructor(private userService: UsersService) {}

    ngOnInit(): void {
        this.users$ = this.userService.getUsers();
    }
}
