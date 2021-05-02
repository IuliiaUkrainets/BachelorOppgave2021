import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ImageResponse, MedicalImage } from '../_models/medicalimage';
import { map } from 'rxjs/operators';
import { decompressImage } from '../_decompression/decompression';

@Injectable({
    providedIn: 'root',
})
export class ImagesService {
    medicalImgUrl = environment.imageApiUrl;
    images: MedicalImage[] = [];

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
