import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AppUser } from '../../_models/appuser';
import { AccountService } from '../../_services/account.service';
import { UsersService } from '../../_services/users.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-photo-editor',
    templateUrl: './photo-editor.component.html',
    styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
    // @ts-ignore
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    // @ts-ignore
    user: User;
    // @ts-ignore
    appUser: AppUser;

    constructor(
        private accountService: AccountService,
        private userService: UsersService,
        private toastr: ToastrService
    ) {
        this.accountService.currentUser$
            .pipe(take(1))
            .subscribe((appUser) => (this.appUser = appUser));
    }

    ngOnInit(): void {
        this.initializeUploader();
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    initializeUploader(): void {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'users/add-photo',
            authToken: 'Bearer ' + this.appUser.token,
            isHTML5: true,
            allowedFileType: ['image'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024,
        });
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
        };
        this.uploader.onSuccessItem = (item, response, status, headers) => {
            const photo = JSON.parse(response);
            this.user.photos.push(photo);
        };
    }
}
