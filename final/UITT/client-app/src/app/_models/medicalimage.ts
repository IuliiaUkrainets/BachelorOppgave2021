export interface ImageResponse {
    image: [][][];
}

export interface MedicalImage {
    id: string | null;
    imageString: string | null;
}

export interface ImageMeta {
    id: number;
    url: string;
    taken: Date;
    patientId: number;
    patient: {
        id: number;
        dateOfBirth: Date;
        created: Date;
        gender: string;
        address: string;
        city: string;
        ssn: string;
        firstName: string;
        middlename: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        extraInfo: null;
    };
}

export interface ImageText {
    text: string;
}
