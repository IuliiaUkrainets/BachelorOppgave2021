import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { ImageMeta, MedicalImage } from '../../_models/medicalimage';
import { PaginatedResult, Pagination } from '../../_models/pagination';
import { User } from '../../_models/user';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
    imagesMeta: ImageMeta[] = [];
    pagination: Pagination;
    pageNumber = 1;
    pageSize = 3;

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {
        this.loadImageMeta();
    }

    loadImageMeta(): void {
        this.imageService
            .getImagesMeta(this.pageNumber, this.pageSize)
            .subscribe((response) => {
                this.imagesMeta = response.result;
                this.pagination = response.pagination;
            });
    }

    pageChanged(event: any): void {
        this.pageNumber = event.page;
        this.loadImageMeta();
    }

    // getImageMeta(): void {
    //     this.imageService.getImagesMeta().subscribe((imageMeta) => {
    //         this.imagesMeta = imageMeta;
    //         // this.imagesMeta.forEach((meta) => {
    //         //     this.ids.push(meta.url);
    //         // });
    //         // this.getImages();
    //     });
    // }

    //  getImages(): void {
    //     this.ids.forEach((id) => {
    //         this.imageService.getImage(id).subscribe((image) => {
    //             this.images.push(image);
    //         });
    //     });
    // }
}
