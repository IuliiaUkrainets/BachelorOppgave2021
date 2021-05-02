import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ParamService {
    param: string | null | undefined;

    constructor() {}

    setParam(param: string | null | undefined): void {
        this.param = param;
    }

    getParam(): string | null | undefined {
        return this.param;
    }
}
