import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { AppUser } from '../../_models/appuser';
import { AccountService } from '../../_services/account.service';
import { UsersService } from '../../_services/users.service';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
    @ViewChild('editForm') editForm: NgForm | undefined;
    // @ts-ignore
    uploader: FileUploader;

    hasBaseDropZoneOver = false;

    baseUrl = environment.apiUrl;

    // @ts-ignore
    user: User;

    // @ts-ignore
    appUser: AppUser;

    // tslint:disable-next-line:typedef
    @HostListener('window:beforeunload', ['$event']) unloadNotification(
        $event: any
    ) {
        if (this.editForm?.dirty) {
            $event.returnValue = true;
        }
    }

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
        this.loadUser();
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    loadUser(): void {
        // @ts-ignore
        this.userService.getUser(this.appUser.username).subscribe((user) => {
            this.user = user;
        });
    }

    updateUser(): void {
        this.userService.updateUser(this.user).subscribe(() => {
            console.log(this.user);
            this.toastr.success('Brukerinfo ble oppdatert');
            this.editForm?.reset(this.user);
        });
    }
}
