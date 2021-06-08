import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { SharedModule } from './_modules/shared.module';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { UsersListComponent } from './admin/lists/users-list/users-list.component';
import { AdminMainComponent } from './admin/admin-main/admin-main.component';
import { RegisterPasientComponent } from './admin/register-pasient/register-pasient.component';
import { RegisterComponent } from './admin/register/register.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { UserCardComponent } from './home/user-card/user-card.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { PatientListComponent } from './patients/patient-list/patient-list.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PhotoEditorComponent } from './users/photo-editor/photo-editor.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { HoldableDirective } from './_directives/holdable.directive';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { PatientComponent } from './patients/patient/patient.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { SingleImageComponent } from './images/single-image/single-image.component';
import { HarRoleDirective } from './_directives/har-role.directive';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ImageTextModalComponent } from './modals/image-text-modal/image-text-modal.component';
import { ImageTestComponent } from './image-test/image-test.component';
import { ImageDirective } from './_directives/image.directive';

@NgModule({
    declarations: [
        AppComponent,
        SideNavComponent,
        TopNavComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        RegisterPasientComponent,
        UserListComponent,
        UserDetailComponent,
        TestErrorsComponent,
        NotFoundComponent,
        ServerErrorComponent,
        UsersListComponent,
        AdminMainComponent,
        UserCardComponent,
        UserEditComponent,
        PatientListComponent,
        PhotoEditorComponent,
        ImageComponent,
        ImageListComponent,
        HoldableDirective,
        PatientComponent,
        TextInputComponent,
        SingleImageComponent,
        HarRoleDirective,
        RolesModalComponent,
        ImageTextModalComponent,
        ImageTestComponent,
        ImageDirective,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxSpinnerModule,
        Ng2SearchPipeModule,
        OrderModule,
        NgxPaginationModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
