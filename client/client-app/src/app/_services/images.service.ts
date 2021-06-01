import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    ImageMeta,
    ImageResponse,
    ImageText,
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
    imagesMetaCash = new Map();
    imageThumbs = new Map();

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
        const response = this.imagesMetaCash.get(
            Object.values(imageParams).join('-')
        );
        if (response) {
            return of(response);
        }
        let params = this.getPaginationHeaders(
            imageParams.pageNumber,
            imageParams.pageSize
        );
        if (imageParams.search != null) {
            params = params.append('search', imageParams.search);
        }

        // @ts-ignore
        return this.getPaginatedResult<ImageMeta[]>(
            this.baseUrl + 'images',
            params
        ).pipe(
            map((resp) => {
                this.imagesMetaCash.set(
                    Object.values(imageParams).join('-'),
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

    getPatientsImagesMeta(id: number): Observable<ImageMeta[]> {
        return this.http.get<ImageMeta[]>(this.baseUrl + 'images/' + id).pipe(
            map((imageMeta) => {
                return imageMeta;
            })
        );
    }

    // tslint:disable-next-line:typedef
    getImageThumbName(id: string) {
        console.log(this.imageThumbs);
        const imageThumb = this.imageThumbs.get(id);
        console.log(imageThumb);

        if (imageThumb !== undefined) {
            return of(imageThumb);
        }
        return this.http.get(this.medicalImgUrl + `images/['${id}']`).pipe(
            map((response) => {
                this.imageThumbs.set(
                    Object.keys(response)[0],
                    response[Object.keys(response)[0]]
                );

                return response[Object.keys(response)[0]];
            })
        );
    }

    getImageText(id: string): Observable<ImageText> {
        return this.http.get<ImageText>(this.medicalImgUrl + 'text/' + id).pipe(
            map((imageText) => {
                return imageText;
            })
        );
    }

    getRoi(
        id: string,
        oldX: number,
        oldY: number,
        x: number,
        y: number
    ): Observable<any> {
        return this.http
            .get<any>(
                this.medicalImgUrl +
                    'roi/' +
                    id +
                    ',' +
                    oldX +
                    ',' +
                    oldY +
                    ',' +
                    x +
                    ',' +
                    y +
                    ''
            )
            .pipe(
                map((response) => {
                    return response;
                })
            );
    }
}
