import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { PreventUnsavedChangedGuard } from './_guards/prevent-unsaved-changed.guard';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { PatientComponent } from './patients/patient/patient.component';
import { AdminGuard } from './_guards/admin.guard';
import { ImageTestComponent } from './image-test/image-test.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'users',
                component: UserListComponent,
            },
            { path: 'users/:username', component: UserDetailComponent },
            {
                path: 'user/edit',
                component: UserEditComponent,
                canDeactivate: [PreventUnsavedChangedGuard],
            },
            { path: 'patients', component: PatientListComponent },
            { path: 'patient/:id', component: PatientComponent },
            {
                path: 'admin',
                component: AdminMainComponent,
                canActivate: [AdminGuard],
            },
            { path: 'images', component: ImageListComponent },
            { path: 'image/:id/:patientId', component: ImageComponent },
            { path: 'image-test', component: ImageTestComponent },
        ],
    },
    {
        path: 'errors',
        component: TestErrorsComponent,
        canActivate: [AdminGuard],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'server-error', component: ServerErrorComponent },
    { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
