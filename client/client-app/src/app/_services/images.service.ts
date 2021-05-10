import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    ImageMeta,
    ImageResponse,
    MedicalImage,
} from '../_models/medicalimage';
import { map } from 'rxjs/operators';
import { decompressImage } from '../_decompression/decompression';
import { PaginatedResult } from '../_models/pagination';
import { ImageParams } from '../_models/params';

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    medicalImgUrl = environment.imageApiUrl;
    baseUrl = environment.apiUrl;
    images: MedicalImage[] = [];
    imagesMeta: ImageMeta[] = [];
    patientImageMeta: ImageMeta[] = [];

    constructor(private http: HttpClient) {}

    getImage(id: string | null): Observable<MedicalImage> {
        const image = this.images.find((x) => x.id === id);
        if (image !== undefined) {
            return of(image);
        }
        return this.http
            .get<ImageResponse>(this.medicalImgUrl + 'image/' + id)
            .pipe(
                map((imageResponse: ImageResponse) => {
                    const imageString: string | null = decompressImage(
                        imageResponse
                    );
                    this.images.push({ id, imageString });
                    return { id, imageString };
                })
            );
    }

    getImagesMeta(
        imageParams: ImageParams
    ): Observable<PaginatedResult<ImageMeta[]>> {
        let params = this.getPaginationHeaders(
            imageParams.pageNumber,
            imageParams.pageSize
        );
        if (imageParams.lastName != null) {
            params = params.append('lastName', imageParams.lastName);
        }

        if (imageParams.ssn != null) {
            params = params.append('ssn', imageParams.ssn);
        }
        // @ts-ignore
        return this.getPaginatedResult<ImageMeta[]>(
            this.baseUrl + 'images',
            params
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

    getPatientsImagesMeta(id: number): Observable<ImageMeta[]> {
        return this.http.get<ImageMeta[]>(this.baseUrl + 'images/' + id).pipe(
            map((imageMeta) => {
                return imageMeta;
            })
        );
    }
}
