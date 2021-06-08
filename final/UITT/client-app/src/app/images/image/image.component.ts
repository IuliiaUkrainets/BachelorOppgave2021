import {
    Component,
    ElementRef,
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
    medicalImage: MedicalImage | undefined;
    containerWidth = 100;
    patient: Patient;
    bsModalRef: BsModalRef;
    coefficient = 0;

    @ViewChild('appImage') contBox: ElementRef;
    @ViewChild('bbox') bbox: ElementRef;
    @ViewChild('imageElement') imageElement: ElementRef;

    x: number;
    y: number;
    oldX: number;
    oldY: number;
    addX = 0;
    addY = 0;
    showDrag: boolean;
    xCoord = 0;
    yCoord = 0;

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
        console.log('getImageAndPatient');
        const paramId = this.route.snapshot.paramMap.get('id');
        // this.paramService.setParamId(paramId);

        const paramPatientId = this.route.snapshot.paramMap.get('patientId');
        // this.paramService.setParamPatientId(paramPatientId);

        // @ts-ignore
        const paramPatientIdNum: number = +paramPatientId;

        this.patientService
            .getPatient(paramPatientIdNum)
            .subscribe((patient) => {
                this.patient = patient;
            });

        this.imageService.getImage(paramId).subscribe((image) => {
            this.medicalImage = image;
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
        if (this.containerWidth < 170) {
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
        this.getImageAndPatient();
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

    parentMouseDown(event): void {
        this.oldX = event.clientX;
        this.oldY = event.clientY;
        this.showDrag = true;
        event.preventDefault();
    }

    parentOnDrag(event): void {
        if (this.showDrag === true) {
            this.x = event.clientX;
            this.y = event.clientY;
            this.xCoord = this.x;
            this.yCoord = this.y;
            const w =
                this.x > this.oldX ? this.x - this.oldX : this.oldX - this.x;

            const h =
                this.y > this.oldY ? this.y - this.oldY : this.oldY - this.y;

            this.addX = 0;
            this.addY = 0;

            if (this.x < this.oldX) {
                this.addX = w;
            }
            if (this.y < this.oldY) {
                this.addY = h;
            }
            this.bbox.nativeElement.style.left =
                String(
                    this.oldX -
                        (this.contBox.nativeElement.offsetLeft + this.addX)
                ) + 'px';
            this.bbox.nativeElement.style.top =
                String(
                    this.oldY -
                        (this.contBox.nativeElement.offsetTop + this.addY)
                ) + 'px';
            this.bbox.nativeElement.style.width = w + 'px';
            this.bbox.nativeElement.style.height = h + 'px';
            this.bbox.nativeElement.style.display = 'block';
        }
        event.preventDefault();
    }

    parentOnMouseUp(event): void {
        this.showDrag = false;
        this.imageService
            .getRoi(
                this.route.snapshot.paramMap.get('id'),
                this.oldX - this.contBox.nativeElement.offsetLeft,
                this.oldY - this.contBox.nativeElement.offsetTop,
                this.xCoord - this.contBox.nativeElement.offsetLeft,
                this.yCoord - this.contBox.nativeElement.offsetTop
            )
            .subscribe((response) => {
                this.medicalImage.imageString =
                    'http://localhost:5030/getImage/' + response.image;
                this.bbox.nativeElement.style = '';
            });
        event.preventDefault();
    }
}
