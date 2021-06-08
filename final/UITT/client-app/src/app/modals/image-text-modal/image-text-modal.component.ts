import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-image-text-modal',
    templateUrl: './image-text-modal.component.html',
    styleUrls: ['./image-text-modal.component.scss'],
})
export class ImageTextModalComponent implements OnInit {
    content: string;

    constructor(public bsModelRef: BsModalRef) {}

    ngOnInit(): void {}
}
