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

    constructor(private patientService: PatientsService) {}

    ngOnInit(): void {
        this.patients$ = this.patientService.getPatients();
        console.log(this.patients$);
    }
}
