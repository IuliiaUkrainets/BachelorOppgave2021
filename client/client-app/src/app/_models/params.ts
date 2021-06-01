import { ImageMeta, MedicalImage } from './medicalimage';

export class ImageParams {
    pageNumber = 1;
    pageSize = 3;
    search: string;
}

export class PatientParams {
    pageNumber = 1;
    pageSize = 10;
    search: string;
}
