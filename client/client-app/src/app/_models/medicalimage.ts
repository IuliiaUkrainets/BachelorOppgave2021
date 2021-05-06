export interface ImageResponse {
    image: [][];
}

export interface MedicalImage {
    id: string | null;
    imageString: string | null;
}

export interface ImageMeta {
    id: number;
    url: string;
    patientId: number;
}
