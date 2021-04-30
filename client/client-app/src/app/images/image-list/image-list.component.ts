import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from '../../_services/images.service';
import { ImageResponse } from '../../_models/medicalimage';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
    constructor(
        private httpClient: HttpClient,
        private imageService: ImagesService
    ) {}

    ngOnInit(): void {
        this.httpClient
            .get<ImageResponse>('http://127.0.0.1:5030/image/0008')
            .subscribe((response) => {
                console.log(response);
                console.log(response.image);
                console.log(response.image[0]);
                console.log(response.image[1]);
                console.log(response.image[2]);
                console.log(response.image[3]);
                const finalData = this.decompress(
                    response.image[0],
                    response.image[1],
                    response.image[2],
                    response.image[3]
                );
                console.log('DECOMPRESSED');
                console.log(finalData);
            });
    }

    // tslint:disable-next-line:typedef
    decompress(WLL: [], WLH: [], WHL: [], WHH: []) {
        const WL = [];
        // @ts-ignore
        for (let i = 0; i < WLL[0].length; i++) {
            const temp = [];
            const temp1 = [];
            for (let j = 0; j < WLL.length; j++) {
                temp.push(WLL[i][j] + WLH[i][j]);
                temp1.push(WLL[i][j] - WLH[i][j]);
            }
            WL.push(temp);
            WL.push(temp1);
        }

        const WH = [];
        // @ts-ignore
        for (let i = 0; i < WHL[0].length; i++) {
            const temp = [];
            const temp1 = [];
            for (let j = 0; j < WHL.length; j++) {
                temp.push(WHL[i][j] + WHH[i][j]);
                temp1.push(WHL[i][j] - WHH[i][j]);
            }
            WH.push(temp);
            WH.push(temp1);
        }

        const W = [];
        for (let i = 0; i < WH[0].length; i++) {
            const temp = [];
            const temp1 = [];
            for (let j = 0; j < WH.length; j++) {
                temp.push(WL[i][j] + WH[i][j]);
                temp1.push(WL[i][j] - WH[i][j]);
            }
            W.push(temp);
            W.push(temp1);
        }
        return W;
    }
}
