import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    age: number;
    created: Date;
    lastActive: Date;
    gender: string;
    address: string;
    city: string;
    category: string;
    practice: string;
    photos: Photo[];
}

export interface UserForAdmin {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    roles: string[];
}
