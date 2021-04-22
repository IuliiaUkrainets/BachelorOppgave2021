import { Component, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    model: any = {};

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {}

    register(): void {
        this.accountService.register(this.model).subscribe(
            (response) => {
                console.log(response);
                this.cancel();
            },
            (error) => {
                console.log(error);
                this.toastr.error(error.error);
            }
        );
    }

    cancel(): void {
        console.log('cancel');
    }
}
