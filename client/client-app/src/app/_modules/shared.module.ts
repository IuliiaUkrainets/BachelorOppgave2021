import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        IconSpriteModule,
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right',
        }),
    ],
    exports: [
        BsDropdownModule,
        BsDropdownModule,
        IconSpriteModule,
        ToastrModule,
    ],
})
export class SharedModule {}
