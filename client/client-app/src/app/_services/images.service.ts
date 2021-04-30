import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    baseUrl = environment.imageApiUrl;
    image = [];

    constructor(private http: HttpClient) {}

    getImage(imageId: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + imageId).pipe(
            map((image) => {
                this.image = image;
                return image;
            })
        );
    }
}
