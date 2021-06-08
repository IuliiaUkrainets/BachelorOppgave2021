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

    openRolesModal(user: UserForAdmin): void {
        const config = {
            class: 'modal-dialog-centered',
            initialState: {
                user,
                roles: this.getRolesArray(user),
            },
        };
        this.bsModalRef = this.modalService.show(RolesModalComponent, config);
        this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
            const rolesToUpdate = {
                roles: [
                    ...values
                        .filter((el) => el.checked === true)
                        .map((el) => el.name),
                ],
            };
            if (rolesToUpdate) {
                this.adminService
                    .updateUserRoles(user.username, rolesToUpdate.roles)
                    .subscribe(() => {
                        user.roles = [...rolesToUpdate.roles];
                    });
            }
        });
    }

    // tslint:disable-next-line:typedef
    private getRolesArray(user) {
        const roles = [];
        const userRoles = user.roles;
        const availableRoles: any[] = [
            { name: 'Admin', value: 'Admin' },
            { name: 'User', value: 'User' },
        ];

        availableRoles.forEach((role) => {
            let isMatch = false;
            for (const userRole of userRoles) {
                if (role.name === userRole) {
                    isMatch = true;
                    role.checked = true;
                    roles.push(role);
                    break;
                }
            }
            if (!isMatch) {
                role.checked = false;
                roles.push(role);
            }
        });
        return roles;
    }
}
