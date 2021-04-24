import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { UserEditComponent } from '../users/user-edit/user-edit.component';

@Injectable({
    providedIn: 'root',
})
export class PreventUnsavedChangedGuard implements CanDeactivate<unknown> {
    canDeactivate(component: UserEditComponent): boolean {
        if (component.editForm?.dirty) {
            return confirm(
                'Are you sure you want to continue? Any unsaved changes will be lost'
            );
        }
        return true;
    }
}
