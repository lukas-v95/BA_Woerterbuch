import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './jwt-authentification/register/register.component';
import { LoginComponent } from './jwt-authentification/login/login.component';
import { HomeComponent } from './jwt-authentification/home/home.component';
import { UserComponent } from './jwt-authentification/user/user.component';

import { FHEmployeeComponent } from './jwt-authentification/fhemp/fhemp.component';
import { AdminComponent } from './jwt-authentification/admin/admin.component';




const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'fhEmp',
        component: FHEmployeeComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, UserComponent, FHEmployeeComponent, AdminComponent, LoginComponent, RegisterComponent];

