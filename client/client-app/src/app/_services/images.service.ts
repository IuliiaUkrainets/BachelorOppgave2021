import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
    ImageMeta,
    ImageResponse,
    MedicalImage,
} from '../_models/medicalimage';
import { map } from 'rxjs/operators';
import { decompressImage } from '../_decompression/decompression';

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

    getImagesMeta(): Observable<ImageMeta[]> {
        if (this.imagesMeta.length > 0) {
            return of(this.imagesMeta);
        }
        return this.http.get<ImageMeta[]>(this.baseUrl + 'images').pipe(
            map((imageMeta) => {
                this.imagesMeta = imageMeta;
                return imageMeta;
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

    // getImages(ids: string[]): Observable<MedicalImage> {
    //     ids.forEach((id) => {
    //         return this.http
    //             .get<ImageResponse>(this.medicalImgUrl + 'image/' + id)
    //             .pipe(
    //                 map((imageResponse: ImageResponse) => {
    //                     const imageString: string | null = decompressImage(
    //                         imageResponse
    //                     );
    //                     this.images.push({ id, imageString });
    //                     return this.images;
    //                 })
    //             );
    //     });
    // }
}
