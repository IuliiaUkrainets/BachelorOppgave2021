import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { RegisterPasientComponent } from './register-pasient/register-pasient.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

@NgModule({
    declarations: [
        AppComponent,
        SideNavComponent,
        TopNavComponent,
        MainComponent,
        LoginComponent,
        HomeComponent,
        RegisterComponent,
        RegisterPasientComponent,
        UserListComponent,
        UserDetailComponent,
        ListsComponent,
        MessagesComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        FormsModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule,
        IconSpriteModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
