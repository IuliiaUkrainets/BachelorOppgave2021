import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    model: any = {};

    constructor() {}

    ngOnInit(): void {}

    register(): void {
        console.log(this.model);
    }

    cancel(): void {
        console.log('cancel');
    }
}
