import { Component, OnInit } from '@angular/core';
import { Pagination } from 'src/app/_models/pagination';
import { Patient } from '../../_models/patient';
import { PatientsService } from '../../_services/patients.service';
import { PatientParams } from '../../_models/params';
import { SearchParamService } from '../../_services/search-param.service';

@Component({
    selector: 'app-patient-list',
    templateUrl: './patient-list.component.html',
    styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
    patients: Patient[] = [];
    pagination: Pagination;
    patientParams: PatientParams;

    constructor(
        private patientService: PatientsService,
        private searchService: SearchParamService
    ) {
        this.patientParams = new PatientParams();
    }

    ngOnInit(): void {
        this.loadPatients();
        this.searchService.search.subscribe((result) => {
            this.patientParams.search = result;
            this.loadPatients();
        });
    }

    loadPatients(): void {
        this.patientService
            .getPatients(this.patientParams)
            .subscribe((response) => {
                this.patients = response.result;
                this.pagination = response.pagination;
            });
    }

    pageChanged(event: any): void {
        this.patientParams.pageNumber = event.page;
        this.loadPatients();
    }
}
