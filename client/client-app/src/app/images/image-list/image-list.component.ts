import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { MedicalImage } from '../../_models/medicalimage';

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
    ids: string[] = ['0004', '0008', '0010', '0016', '0126', '0127'];
    images: MedicalImage[] = [];

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {
        this.getImages();
    }

    getImages(): void {
        this.ids.forEach((id) => {
            this.imageService.getImage(id).subscribe((image) => {
                this.images.push(image);
            });
        });
    }
}
