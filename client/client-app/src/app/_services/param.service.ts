import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ParamService {
    paramId: string | null | undefined;
    paramPatientId: string | null | undefined;

    constructor() {}

    setParamId(param: string | null | undefined): void {
        this.paramId = param;
    }

    getParamId(): string | null | undefined {
        return this.paramId;
    }

    setParamPatientId(param: string | null | undefined): void {
        this.paramPatientId = param;
    }

    getParamPatientId(): string | null | undefined {
        return this.paramPatientId;
    }
}
