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

@NgModule({
    declarations: [AppComponent, SideNavComponent, TopNavComponent, MainComponent, LoginComponent],
    imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
