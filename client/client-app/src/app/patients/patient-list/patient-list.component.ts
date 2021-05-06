import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../_models/patient';
import { PatientsService } from '../../_services/patients.service';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
    patients$: Observable<Patient[]> | undefined;
    patients: Patient[] = [];
    ssn = '';
    lastName = '';
    email = '';
    telephone = '';

    constructor(private patientService: PatientsService) {}

    ngOnInit(): void {
        this.patients$ = this.patientService.getPatients();
        this.patients$.subscribe((patients) => {
            this.patients = patients;
        });
    }

    searchBySsn(): void {
        if (this.ssn === '') {
            this.ngOnInit();
        } else {
            this.patients = this.patients.filter((res) => {
                return res.ssn.match(this.ssn);
            });
        }
    }

    searchByLastName(): void {
        if (this.lastName === '') {
            this.ngOnInit();
        } else {
            this.patients = this.patients.filter((res) => {
                return res.lastName
                    .toLocaleLowerCase()
                    .match(this.lastName.toLocaleLowerCase());
            });
        }
    }

    searchByEmail(): void {
        if (this.email === '') {
            this.ngOnInit();
        } else {
            this.patients = this.patients.filter((res) => {
                return res.email
                    .toLocaleLowerCase()
                    .match(this.email.toLocaleLowerCase());
            });
        }
    }

    searchByTelephone(): void {
        if (this.telephone === '') {
            this.ngOnInit();
        } else {
            this.patients = this.patients.filter((res) => {
                return res.phoneNumber
                    .toLocaleLowerCase()
                    .match(this.telephone.toLocaleLowerCase());
            });
        }
    }
}
