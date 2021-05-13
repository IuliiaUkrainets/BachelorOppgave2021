import { Component, OnInit } from '@angular/core';
import { UserForAdmin } from '../../../_models/user';
import { AdminService } from '../../../_services/admin.service';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../../modals/roles-modal/roles-modal.component';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
    users: UserForAdmin[];
    bsModalRef: BsModalRef;

    constructor(
        private adminService: AdminService,
        private modalService: BsModalService
    ) {}

    ngOnInit(): void {
        this.getUsersWithRoles();
    }

    getUsersWithRoles(): void {
        this.adminService.getUsersWithRoles().subscribe((users) => {
            this.users = users;
        });
    }

    openRolesModal(): void {
        const initialState = {
            list: [
                'Open a modal with component',
                'Pass your data',
                'Do something else',
                '...',
            ],
            title: 'Modal with components',
        };
        this.bsModalRef = this.modalService.show(RolesModalComponent, {
            initialState,
        });
        this.bsModalRef.content.closeBtnName = 'Close';
    }
}
