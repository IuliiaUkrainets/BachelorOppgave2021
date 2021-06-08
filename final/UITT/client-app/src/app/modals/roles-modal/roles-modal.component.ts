import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserForAdmin } from '../../_models/user';

@Component({
    selector: 'app-roles-modal',
    templateUrl: './roles-modal.component.html',
    styleUrls: ['./roles-modal.component.scss'],
})
export class RolesModalComponent implements OnInit {
    @Input() updateSelectedRoles = new EventEmitter();
    user: UserForAdmin;
    roles: any[];

    constructor(public bsModalRef: BsModalRef) {}

    ngOnInit(): void {}

    updateRoles(): void {
        this.updateSelectedRoles.emit(this.roles);
        this.bsModalRef.hide();
    }
}
