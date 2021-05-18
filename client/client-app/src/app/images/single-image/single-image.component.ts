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

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {
        this.getImage();
    }

    getImage(): void {
        this.imageService.getImage(this.imageUrl).subscribe((image) => {
            console.log(image);
            this.medicalImage = image;
        });
    }
}
