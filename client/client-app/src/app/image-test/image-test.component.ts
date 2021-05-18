import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    // xCoordinate: number;
    // yCoordinate: number;
    addX = 0;
    addY = 0;
    showDrag: boolean;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    parentMouseDown(event): void {
        this.oldX = event.clientX - 185;
        this.oldY = event.clientY - 55;
        console.log(this.oldX, this.oldY);
        this.showDrag = true;
        event.preventDefault();
    }

    parentOnDrag(event): void {
        if (this.showDrag === true) {
            this.x = event.clientX - 185;
            this.y = event.clientY - 55;
            // this.xCoordinate = this.x;
            // this.yCoordinate = this.y;

            // get the width and height of the dragged area
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
                this.oldX -
                // tslint:disable-next-line:radix
                parseInt(this.contBox.nativeElement.offsetLeft + this.addX) +
                'px';
            this.bbox.nativeElement.style.top =
                this.oldY -
                // tslint:disable-next-line:radix
                parseInt(this.contBox.nativeElement.offsetTop + this.addY) +
                'px';
            this.bbox.nativeElement.style.width = w + 'px';
            this.bbox.nativeElement.style.height = h + 'px';
            this.bbox.nativeElement.style.display = 'block';
        }
        event.preventDefault();
    }

    parentOnMouseUp(event): void {
        this.showDrag = false;
        fetch(
            'http://127.0.0.1:5030/roi/0004,' +
                this.oldX +
                ',' +
                this.oldY +
                ',' +
                this.x +
                ',' +
                this.y +
                ''
        )
            .then((x) => x.json())
            .then((x) => {
                this.imageElement.nativeElement.src =
                    'http://localhost:5030/getImage/' + x.image;
                this.bbox.nativeElement.style = '';
            });
        console.log(this.oldX, this.oldY, this.x, this.y);
        event.preventDefault();
    }
}
