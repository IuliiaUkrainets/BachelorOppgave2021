import {
    Component,
    HostListener,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { MedicalImage } from '../../_models/medicalimage';
import { ActivatedRoute } from '@angular/router';
import { ParamService } from '../../_services/param.service';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
    // @ts-ignore
    @ViewChild('image') image;
    medicalImage: MedicalImage | undefined;
    containerWidth = 100;

    constructor(
        private imageService: ImagesService,
        private route: ActivatedRoute,
        private paramService: ParamService
    ) {}

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        this.paramService.setParam(param);

        this.imageService.getImage(param).subscribe((image) => {
            this.medicalImage = image;
        });
    }

    styleWidth(): string {
        return `width:${this.containerWidth}%;`;
    }

    styleHeight(): string {
        return `height:${this.containerWidth}%;`;
    }

    shrink(): number {
        if (this.containerWidth < 400) {
            this.containerWidth += 5;
        }
        return this.containerWidth;
    }

    grow(): number {
        if (this.containerWidth > 0) {
            this.containerWidth -= 5;
        }
        return this.containerWidth;
    }

    reset(): number {
        return (this.containerWidth = 100);
    }
}
