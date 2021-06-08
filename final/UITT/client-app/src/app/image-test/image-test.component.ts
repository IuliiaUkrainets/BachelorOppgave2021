import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ImagesService } from '../_services/images.service';

@Component({
    selector: 'app-image-test',
    templateUrl: './image-test.component.html',
    styleUrls: ['./image-test.component.scss'],
})
export class ImageTestComponent implements OnInit {
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

    constructor(private imageService: ImagesService) {}

    ngOnInit(): void {}

    // parentMouseDown(event): void {
    //     this.oldX = event.clientX;
    //     this.oldY = event.clientY;
    //     console.log(this.oldX, this.oldY);
    //     this.showDrag = true;
    //     event.preventDefault();
    // }
    //
    // parentOnDrag(event): void {
    //     if (this.showDrag === true) {
    //         this.x = event.clientX;
    //         this.y = event.clientY;
    //         this.xCoord = this.x;
    //         this.yCoord = this.y;
    //         const w =
    //             this.x > this.oldX ? this.x - this.oldX : this.oldX - this.x;
    //
    //         const h =
    //             this.y > this.oldY ? this.y - this.oldY : this.oldY - this.y;
    //
    //         this.addX = 0;
    //         this.addY = 0;
    //
    //         if (this.x < this.oldX) {
    //             this.addX = w;
    //         }
    //         if (this.y < this.oldY) {
    //             this.addY = h;
    //         }
    //         this.bbox.nativeElement.style.left =
    //             String(
    //                 this.oldX -
    //                     (this.contBox.nativeElement.style.offsetLeft +
    //                         this.addX)
    //             ) + 'px';
    //         this.bbox.nativeElement.style.top =
    //             String(
    //                 this.oldY -
    //                     (this.contBox.nativeElement.style.offsetTop + this.addY)
    //             ) + 'px';
    //         this.bbox.nativeElement.style.width = w + 'px';
    //         this.bbox.nativeElement.style.height = h + 'px';
    //         this.bbox.nativeElement.style.display = 'block';
    //     }
    //     event.preventDefault();
    // }
    //
    // parentOnMouseUp(event): void {
    //     this.showDrag = false;
    //     this.imageService
    //         .getRoi('0004', this.oldX, this.oldY, this.x, this.y)
    //         .subscribe((response) => {
    //             this.imageElement.nativeElement.src =
    //                 'http://localhost:5030/getImage/' + response.image;
    //             this.bbox.nativeElement.style = '';
    //         });
    //     console.log(this.oldX, this.oldY, this.x, this.y);
    //     event.preventDefault();
    // }
}
