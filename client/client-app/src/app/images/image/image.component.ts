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

    x=0;
    y=0;
    oldx=0;
    oldy=0;
    showDrag = false;
    x_coord = 0;
    y_coord = 0;
    constructor(
        private imageService: ImagesService,
        private route: ActivatedRoute,
        private paramService: ParamService,
        private patientService: PatientsService,
        private modalService: BsModalService,
        private router: Router
    ) {}

    onMouseMove(e): void {
        if (this.showDrag == true) {
            let contbox = document.getElementById("cont");
            this.x = e.clientX; //det første mouseup x coord
            this.y = e.clientY; //det andre mouseup y coord
            this.x_coord =this.x;
            this.y_coord =this.y;
            let bbox = document.getElementById("bbox");
            
            //få bredden og høyden på det slepte området
            let w = (this.x >this.oldx ? this.x-this.oldx : this.oldx-this.x);
            let h = (this.y > this.oldy ?this.y-this.oldy : this.oldy-this.y);
            let addx: number = 0, addy = 0;
            //disse to neste linjene bedømmer om boksen ble dratt bakover
            //og legger boksens bredde til bbox-posisjoneringsforskyvningen
            if (this.x < this.oldx) { addx = w; }
            if (this.y < this.oldy) { addy = h; }
            bbox.style.left = String(this.oldx-(contbox.offsetLeft+addx))+"px";
            bbox.style.top = String(this.oldy-(contbox.offsetTop+addy))+"px";
            bbox.style.width = w+"px";
            bbox.style.height = h+"px";
            bbox.style.display = "block";
          }
          e.preventDefault();
    }

    onMouseDown(e): void{
        this.oldx = e.clientX;
        this.oldy = e.clientY; 
       this.showDrag = true;
        e.preventDefault();
    }

    onMouseUp(e): void{
        this.showDrag = false;
        let contbox = document.getElementById("cont");

        fetch('http://127.0.0.1:5030/roi/0004,'+(this.oldx - contbox.offsetLeft)+','+(this.oldy - contbox.offsetTop)+','+(this.x_coord  - contbox.offsetLeft)+','+(this.y_coord - contbox.offsetTop)+'').then(x=> x.json()).then(x=>
          {
            document.querySelector('img').src = 'http://localhost:5030/getImage/' + x.image;
            let bbox = document.getElementById("bbox");
            bbox.style.border = 'none';
          });
        e.preventDefault();
    }
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
