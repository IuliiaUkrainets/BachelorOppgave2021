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

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    medicalImgUrl = environment.imageApiUrl;
    baseUrl = environment.apiUrl;
    images: MedicalImage[] = [];
    imagesMeta: ImageMeta[] = [];
    patientImageMeta: ImageMeta[] = [];
    paginatedResult: PaginatedResult<ImageMeta[]> = new PaginatedResult<
        ImageMeta[]
    >();

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
        page?: number,
        itemsPerPage?: number
    ): Observable<PaginatedResult<ImageMeta[]>> {
        let params = new HttpParams();
        if (page !== null && itemsPerPage !== null) {
            params = params.append('pageNumber', page.toString());
            params = params.append('pageSize', itemsPerPage.toString());
        }
        // @ts-ignore
        return this.http
            .get<ImageMeta[]>(this.baseUrl + 'images', {
                observe: 'response',
                params,
            })
            .pipe(
                map((response) => {
                    this.paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') !== null) {
                        this.paginatedResult.pagination = JSON.parse(
                            response.headers.get('Pagination')
                        );
                    }
                    return this.paginatedResult;
                })
            );
    }

    getPatientsImagesMeta(id: number): Observable<ImageMeta[]> {
        return this.http.get<ImageMeta[]>(this.baseUrl + 'images/' + id).pipe(
            map((imageMeta) => {
                return imageMeta;
            })
        );
    }
}
