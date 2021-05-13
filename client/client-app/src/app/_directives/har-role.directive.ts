import {
    Directive,
    Input,
    OnInit,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs/operators';
import { AppUser } from '../_models/appuser';

@Directive({
    selector: '[appHasRole]',
})
export class HarRoleDirective implements OnInit {
    @Input() appHasRole: string[];
    user: AppUser;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        private accountService: AccountService
    ) {
        this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
            this.user = user;
        });
    }

    ngOnInit(): void {
        if (!this.user?.roles || this.user == null) {
            this.viewContainerRef.clear();
            return;
        }

        if (this.user?.roles.some((r) => this.appHasRole.includes(r))) {
            this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainerRef.clear();
        }
    }
}
