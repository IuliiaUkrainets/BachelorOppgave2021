import { Component, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    model: any = {};

    constructor(private accountService: AccountService) {}

    ngOnInit(): void {}

    register(): void {
        this.accountService.register(this.model).subscribe(
            (response) => {
                console.log(response);
                this.cancel();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    cancel(): void {
        console.log('cancel');
    }
}
