import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';

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
                canActivate: [AuthGuard],
            },
            { path: 'users/:id', component: UserDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
            { path: 'register', component: RegisterComponent },
        ],
    },
    { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
