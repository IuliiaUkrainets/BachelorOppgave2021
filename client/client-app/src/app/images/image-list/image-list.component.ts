import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { ImageMeta } from '../../_models/medicalimage';
import { Pagination } from '../../_models/pagination';
import { ImageParams } from '../../_models/params';
import { SearchParamService } from '../../_services/search-param.service';

@Component({
    selector: 'app-image-list',
    templateUrl: './image-list.component.html',
    styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
    imagesMeta: ImageMeta[] = [];
    pagination: Pagination;
    imageParams: ImageParams;
    search: string;

    constructor(
        private imageService: ImagesService,
        private searchService: SearchParamService
    ) {
        this.imageParams = new ImageParams();
    }

    ngOnInit(): void {
        this.loadImageMeta();
        this.searchService.search.subscribe((result) => {
            this.imageParams.search = result;
            this.loadImageMeta();
        });
    }

    loadImageMeta(): void {
        this.imageService
            .getImagesMeta(this.imageParams)
            .subscribe((response) => {
                this.imagesMeta = response.result;
                this.pagination = response.pagination;
            });
    }

    resetFilters(): void {
        this.imageParams = new ImageParams();
        this.loadImageMeta();
    }

    pageChanged(event: any): void {
        this.imageParams.pageNumber = event.page;
        this.loadImageMeta();
    }
}
