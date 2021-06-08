import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamService } from '../../_services/param.service';
import { Patient } from '../../_models/patient';
import { PatientsService } from '../../_services/patients.service';
import { ImageMeta, MedicalImage } from '../../_models/medicalimage';
import { ImagesService } from '../../_services/images.service';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html',
    styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
    patient: Patient | undefined;
    ids: string[] = [];
    patientImagesMeta: ImageMeta[] = [];
    images: MedicalImage[] = [];
    // @ts-ignore
    param: number;

    constructor(
        private patientService: PatientsService,
        private route: ActivatedRoute,
        private paramService: ParamService,
        private imageService: ImagesService
    ) {}

    ngOnInit(): void {
        const param = this.route.snapshot.paramMap.get('id');
        // @ts-ignore
        const paramNum: number = +param;
        this.param = paramNum;

        this.patientService.getPatient(paramNum).subscribe((patient) => {
            console.log(patient);
            this.patient = patient;
            this.imageService
                .getPatientsImagesMeta(this.patient.id)
                .subscribe((patientsImageMeta) => {
                    console.log(patientsImageMeta);
                    this.patientImagesMeta = patientsImageMeta;
                });
        });
    }

    getImages(): void {
        this.ids.forEach((id) => {
            this.imageService.getImage(id).subscribe((image) => {
                this.images.push(image);
            });
        });
    }

    getImageMeta(): void {
        this.imageService
            .getPatientsImagesMeta(this.param)
            .subscribe((imageMeta) => {
                this.patientImagesMeta = imageMeta;
                console.log(this.patientImagesMeta);
                this.patientImagesMeta.forEach((meta) => {
                    this.ids.push(meta.url);
                });
                this.getImages();
            });
    }
}
