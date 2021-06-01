import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchParamService {
    private searchSource = new BehaviorSubject<string>('');
    search = this.searchSource.asObservable();

    constructor() {}

    changeSearch(searchString: string): void {
        this.searchSource.next(searchString);
    }
}
