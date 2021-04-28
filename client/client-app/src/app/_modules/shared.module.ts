import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';

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
        FileUploadModule,
    ],
    exports: [
        BsDropdownModule,
        BsDropdownModule,
        IconSpriteModule,
        ToastrModule,
        FileUploadModule,
    ],
})
export class SharedModule {}
