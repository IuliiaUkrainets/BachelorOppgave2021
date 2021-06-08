import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-test-errors',
    templateUrl: './test-errors.component.html',
    styleUrls: ['./test-errors.component.scss'],
})
export class TestErrorsComponent implements OnInit {
    baseUrl = 'https://localhost:5001/api/';
    validationErrors: string[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    get404Error(): void {
        this.http.get(this.baseUrl + 'error/not-found').subscribe(
            (response) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    get400Error(): void {
        this.http.get(this.baseUrl + 'error/bad-request').subscribe(
            (response) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    get500Error(): void {
        this.http.get(this.baseUrl + 'error/server-error').subscribe(
            (response) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    get401Error(): void {
        this.http.get(this.baseUrl + 'error/auth').subscribe(
            (response) => {},
            (error) => {
                console.log(error);
            }
        );
    }

    get400ValidationError(): void {
        this.http.post(this.baseUrl + 'account/register', {}).subscribe(
            (response) => {},
            (error) => {
                console.log(error);
                this.validationErrors = error;
            }
        );
    }
}
