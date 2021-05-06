import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { ImageMeta, MedicalImage } from '../../_models/medicalimage';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
    // ids: string[] = [
    //     '0004',
    //     '0008',
    //     '0010',
    //     '0016',
    //     '0126',
    //     '0127',
    //     '0130',
    //     '0302',
    // ];
    // ids: string[] = ['0302', '0008', '0010', '0016', '0126', '0127'];
    ids: string[] = [];
    imagesMeta: ImageMeta[] = [];
    images: MedicalImage[] = [];

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {
        this.getImageMeta();
    }

    getImages(): void {
        this.ids.forEach((id) => {
            this.imageService.getImage(id).subscribe((image) => {
                this.images.push(image);
            });
        });
    }

    getImageMeta(): void {
        this.imageService.getImagesMeta().subscribe((imageMeta) => {
            this.imagesMeta = imageMeta;
            console.log(this.imagesMeta);
            this.imagesMeta.forEach((meta) => {
                this.ids.push(meta.url);
            });
            this.getImages();
        });
    }
}
