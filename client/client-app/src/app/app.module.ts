import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from './nav/side-nav/side-nav.component';
import { TopNavComponent } from './nav/top-nav/top-nav.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { MessagesComponent } from './messages/messages.component';
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
import { ImageListComponent } from './medical-img/image-list/image-list.component';

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
        MessagesComponent,
        TestErrorsComponent,
        NotFoundComponent,
        ServerErrorComponent,
        UsersListComponent,
        AdminMainComponent,
        UserCardComponent,
        UserEditComponent,
        PatientListComponent,
        PhotoEditorComponent,
        ImageListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        SharedModule,
        NgxSpinnerModule,
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
