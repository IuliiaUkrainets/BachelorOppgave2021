import {
    Component,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ImagesService } from '../../_services/images.service';
import { MedicalImage } from '../../_models/medicalimage';
import { ActivatedRoute, Router } from '@angular/router';
import { ParamService } from '../../_services/param.service';
import { PatientsService } from '../../_services/patients.service';
import { Patient } from '../../_models/patient';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ImageTextModalComponent } from '../../modals/image-text-modal/image-text-modal.component';

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
    patient: Patient | undefined;
    bsModalRef: BsModalRef;
    coefficient = 0;

    constructor(
        private imageService: ImagesService,
        private route: ActivatedRoute,
        private paramService: ParamService,
        private patientService: PatientsService,
        private modalService: BsModalService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getImageAndPatient();
    }

    getImageAndPatient(): void {
        const paramId = this.route.snapshot.paramMap.get('id');
        this.paramService.setParamId(paramId);

        const paramPatientId = this.route.snapshot.paramMap.get('patientId');
        this.paramService.setParamPatientId(paramPatientId);

        // @ts-ignore
        const paramPatientIdNum: number = +paramPatientId;

        this.imageService.getImage(paramId).subscribe((image) => {
            this.medicalImage = image;
        });

        this.patientService
            .getPatient(paramPatientIdNum)
            .subscribe((patient) => {
                this.patient = patient;
            });
    }

    styleWidth(): string {
        return `width:${this.containerWidth}%;`;
    }

    styleHeight(): string {
        return `height:${this.containerWidth}%;`;
    }

    toggleNegative(): string {
        return `-webkit-filter: invert(${this.coefficient}); filter: invert(${this.coefficient})`;
    }

    changeCoefficient(): void {
        if (this.coefficient === 1) {
            this.coefficient = 0;
        } else {
            this.coefficient = 1;
        }
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

    openTextModal(): void {
        this.imageService
            .getImageText(this.medicalImage.id)
            .subscribe((imageText) => {
                const initialState = {
                    content: imageText.text,
                };
                this.bsModalRef = this.modalService.show(
                    ImageTextModalComponent,
                    { initialState }
                );
            });
    }
}
