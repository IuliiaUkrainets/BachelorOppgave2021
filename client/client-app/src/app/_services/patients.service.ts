import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Patient } from '../_models/patient';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { PatientParams } from '../_models/params';

@Injectable({
    providedIn: 'root',
})
export class PatientsService {
    baseUrl = environment.apiUrl;
    patients: Patient[] = [];
    paginatedResult: PaginatedResult<Patient[]> = new PaginatedResult<
        Patient[]
    >();
    patientsCash = new Map();

    constructor(private http: HttpClient) {}

    getPatients(
        patientsParams: PatientParams
    ): Observable<PaginatedResult<Patient[]>> {
        const response = this.patientsCash.get(
            Object.values(patientsParams).join('-')
        );

        if (response) {
            return of(response);
        }

        let params = this.getPaginationHeaders(
            patientsParams.pageNumber,
            patientsParams.pageSize
        );

        if (patientsParams.search != null) {
            params = params.append('search', patientsParams.search);
        }

        return this.getPaginatedResult<Patient[]>(
            this.baseUrl + 'patients',
            params
        ).pipe(
            map((resp) => {
                this.patientsCash.set(
                    Object.values(patientsParams).join('-'),
                    resp
                );
                return resp;
            })
        );
    }

    private getPaginatedResult<T>(url, params): Observable<PaginatedResult<T>> {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
        return this.http
            .get<T>(url, {
                observe: 'response',
                params,
            })
            .pipe(
                map((response) => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') !== null) {
                        paginatedResult.pagination = JSON.parse(
                            response.headers.get('Pagination')
                        );
                    }
                    return paginatedResult;
                })
            );
    }

    private getPaginationHeaders(
        pageNumber: number,
        pageSize: number
    ): HttpParams {
        let params = new HttpParams();
        params = params.append('pageNumber', pageNumber.toString());
        params = params.append('pageSize', pageSize.toString());

        return params;
    }

    getPatient(id: number | null): Observable<Patient> {
        const patient = this.patients.find((x) => x.id === id);
        if (patient !== undefined) {
            return of(patient);
        }
        return this.http.get<Patient>(this.baseUrl + 'patients/' + id);
    }
}
