import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent implements ControlValueAccessor {
    // @ts-ignore
    @Input() label: string;
    @Input() type = 'text';

    constructor(@Self() @Optional() public ngControl: NgControl) {
        this.ngControl.valueAccessor = this;
    }

    registerOnChange(fn: any): void {}

    registerOnTouched(fn: any): void {}

    writeValue(obj: any): void {}
}
