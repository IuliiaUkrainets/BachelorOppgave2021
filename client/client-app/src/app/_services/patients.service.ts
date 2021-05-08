import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../_models/patient';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PatientsService {
    baseUrl = environment.apiUrl;
    patients: Patient[] = [];

    constructor(private http: HttpClient) {}

    getPatients(): Observable<Patient[]> {
        if (this.patients.length > 0) {
            return of(this.patients);
        }
        return this.http.get<Patient[]>(this.baseUrl + 'patients').pipe(
            map((patients) => {
                this.patients = patients;
                return patients;
            })
        );
    }

    getPatient(id: number | null): Observable<Patient> {
        const patient = this.patients.find((x) => x.id === id);
        if (patient !== undefined) {
            return of(patient);
        }
        return this.http.get<Patient>(this.baseUrl + 'patients/' + id);
    }
}
