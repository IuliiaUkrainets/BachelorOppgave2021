import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    dateOfBirth: Date;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    address: string;
    city: string;
    photos: Photo[];
}
