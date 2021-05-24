import { Component, Input, OnInit } from '@angular/core';
import { MedicalImage } from '../../_models/medicalimage';
import { ImagesService } from '../../_services/images.service';

@Component({
    selector: 'app-single-image',
    templateUrl: './single-image.component.html',
    styleUrls: ['./single-image.component.scss'],
})
export class SingleImageComponent implements OnInit {
    @Input()
    imageUrl: string;
    medicalImage: MedicalImage;
    imageThumb: string;

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {
        this.getImageThumb();
    }

    getImage(): void {
        this.imageService.getImage(this.imageUrl).subscribe((image) => {
            this.medicalImage = image;
        });
    }

    getImageThumb(): void {
        this.imageService
            .getImageThumbName(this.imageUrl)
            .subscribe((image) => {
                this.imageThumb = image;
            });
    }
}
