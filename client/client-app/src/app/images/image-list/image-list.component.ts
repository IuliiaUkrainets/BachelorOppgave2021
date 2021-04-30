import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ImagesService } from '../../_services/images.service';
import { ImageResponse } from '../../_models/medicalimage';
import { createLogErrorHandler } from '@angular/compiler-cli/ngcc/src/execution/tasks/completion';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
    imageData: any | undefined;
    dataUri: any | undefined;

    // @ViewChild('canvas', { static: true })
    // // @ts-ignore
    // canvas: ElementRef<HTMLCanvasElement>;
    //
    // // @ts-ignore
    // private ctx: CanvasRenderingContext2D;

    constructor(
        private httpClient: HttpClient,
        private imageService: ImagesService
    ) {}

    ngOnInit(): void {
        // @ts-ignore
        this.httpClient
            .get<ImageResponse>('http://127.0.0.1:5030/image/0004')
            .subscribe((response) => {
                const t = this.decompress(
                    response.image[0],
                    response.image[1],
                    response.image[2],
                    response.image[3]
                );
                const width = 512;
                const height = 512;
                const buffer = new Uint8ClampedArray(width * height * 4);
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const pos = (y * width + x) * 4;
                        buffer[pos] = t[y][x];
                        buffer[pos + 1] = t[y][x];
                        buffer[pos + 2] = t[y][x];
                        buffer[pos + 3] = 255;
                    }
                }

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = width;
                canvas.height = height;

                // @ts-ignore
                const idata = ctx.createImageData(width, height);

                idata.data.set(buffer);

                // @ts-ignore
                ctx.putImageData(idata, 0, 0);
                this.dataUri = canvas.toDataURL();
            });
    }

    // tslint:disable-next-line:typedef
    // @ts-ignore
    // tslint:disable-next-line:typedef
    decompress(WLL, WLH, WHL, WHH) {
        const WL = [];
        for (let i = 0; i < WLL[0].length; i++) {
            const temp = [];
            const temp1 = [];
            for (let j = 0; j < WLL.length; j++) {
                temp.push(Number(WLL[i][j]) + Number(WLH[i][j]));

                temp1.push(Number(WLL[i][j]) - Number(WLH[i][j]));
            }
            WL.push(temp);
            WL.push(temp1);
        }
        const WH = [];
        for (let i = 0; i < WHL[0].length; i++) {
            const temp = [];
            const temp1 = [];
            for (let j = 0; j < WHL.length; j++) {
                temp.push(Number(WHL[i][j]) + Number(WHH[i][j]));

                temp1.push(Number(WHL[i][j]) - Number(WHH[i][j]));
            }
            WH.push(temp);
            WH.push(temp1);
        }

        const W = [];
        for (let i = 0; i < WL.length; i++) {
            const temp = [];
            for (let j = 0; j < WL[0].length; j++) {
                temp.push(Number(WL[i][j]) + Number(WH[i][j]));
                temp.push(Number(WL[i][j]) - Number(WH[i][j]));
            }
            W.push(temp);
        }
        return W;
    }

    // tslint:disable-next-line:typedef
    // @ts-ignore
    // tslint:disable-next-line:typedef
    // decompress(WLL, WLH, WHL, WHH) {
    //     const WL = [];
    //     // @ts-ignore
    //     for (let i = 0; i < WLL[0].length; i++) {
    //         const temp = [];
    //         const temp1 = [];
    //         for (let j = 0; j < WLL.length; j++) {
    //             temp.push(WLL[i][j] + WLH[i][j]);
    //             temp1.push(WLL[i][j] - WLH[i][j]);
    //         }
    //         WL.push(temp);
    //         WL.push(temp1);
    //     }
    //
    //     const WH = [];
    //     // @ts-ignore
    //     for (let i = 0; i < WHL[0].length; i++) {
    //         const temp = [];
    //         const temp1 = [];
    //         for (let j = 0; j < WHL.length; j++) {
    //             temp.push(WHL[i][j] + WHH[i][j]);
    //             temp1.push(WHL[i][j] - WHH[i][j]);
    //         }
    //         WH.push(temp);
    //         WH.push(temp1);
    //     }
    //
    //     const W = [];
    //     for (let i = 0; i < WH[0].length; i++) {
    //         const temp = [];
    //         const temp1 = [];
    //         for (let j = 0; j < WH.length; j++) {
    //             temp.push(WL[i][j] + WH[i][j]);
    //             temp1.push(WL[i][j] - WH[i][j]);
    //         }
    //         W.push(temp);
    //         W.push(temp1);
    //     }
    //     return W;
    // }
}
