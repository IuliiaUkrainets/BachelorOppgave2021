import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
    @Input()
    user!: User;

    constructor() {}

    ngOnInit(): void {
        console.log(this.user);
    }
}
