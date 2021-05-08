import { Component, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import {
    AbstractControl,
    FormBuilder,
    FormControl,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    model: any = {};
    // @ts-ignore
    registerForm: FormGroup;

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(8),
                ],
            ],
            confirmPassword: [
                '',
                [Validators.required, this.matchValues('password')],
            ],
        });
    }

    matchValues(matchTo: string): ValidatorFn {
        return (control: AbstractControl) => {
            // @ts-ignore
            return control?.value === control?.parent?.controls[matchTo].value
                ? null
                : { isMatch: true };
        };
    }

    register(): void {
        console.log(this.registerForm.value);

        // this.accountService.register(this.model).subscribe(
        //     (response) => {
        //         console.log(response);
        //         this.cancel();
        //     },
        //     (error) => {
        //         console.log(error);
        //         this.toastr.error(error.error);
        //     }
        // );
    }

    cancel(): void {
        console.log('cancel');
    }
}
