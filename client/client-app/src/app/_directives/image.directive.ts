import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
} from '@angular/core';

@Directive({
    selector: '[appImage]',
})
export class ImageDirective {
    @Output() mouseEventDown: EventEmitter<any> = new EventEmitter();
    @Output() mouseEventDrag: EventEmitter<any> = new EventEmitter();
    @Output() mouseEventUp: EventEmitter<any> = new EventEmitter();

    constructor(element: ElementRef) {
        // element.nativeElement.style.border = '3px solid red';
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent): void {
        this.mouseEventDown.emit(event);
    }

    @HostListener('mousemove', ['$event'])
    onDrag(event: MouseEvent): void {
        this.mouseEventDrag.emit(event);
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(event: MouseEvent): void {
        this.mouseEventUp.emit(event);
    }
}
