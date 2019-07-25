import { MatCardModule } from '@angular/material/card';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//import { AppRoutingModule, routingComponents } from './app-routing.module';
import { MaterialModule } from './translator/material/material.module';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { DialectListComponent } from './translator/registered/dialect-list/dialect-list.component';
import { DialectService } from './translator/shared/dialect.service';
import { DialectComponent } from './translator/registered/dialect/dialect.component';
import { CreateDialectEntryComponent } from './translator/registered/dialect/create-dialect-entry/create-dialect-entry.component';
import { AddSynonymComponent } from './translator/registered/dialect/add-synonym/add-synonym.component';
import { AddGermanReferenceComponent } from './translator/registered/dialect/add-german-reference/add-german-reference.component';
import { DeleteSynonymComponent } from './translator/registered/dialect/delete-synonym/delete-synonym.component';
import { CreateDialectLanguageComponent } from './translator/registered/dialect/create-dialect-language/create-dialect-language.component';
import { GermanListComponent } from './translator/registered/german-list/german-list.component';
import { NewGermanEntryComponent } from './translator/registered/german-list/new-german-entry/new-german-entry.component';
import { EditGermanEntryComponent } from './translator/registered/german-list/edit-german-entry/edit-german-entry.component';
import { UnregisteredSearchComponent } from './translator/unregistered-search/unregistered-search.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './jwt-authentification/login/login.component';
import { UserComponent } from './jwt-authentification/user/user.component';
import { RegisterComponent } from './jwt-authentification/register/register.component';
import { HomeComponent } from './jwt-authentification/home/home.component';
import { AdminComponent } from './jwt-authentification/admin/admin.component';
import { FHEmployeeComponent } from './jwt-authentification/fhemp/fhemp.component';


import { RegisteredComponent } from './translator/registered/registered.component';
import { httpInterceptorProviders } from './jwt-authentification/auth/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
   // routingComponents,
  // AppRoutingModule,
    DialectListComponent,
    DialectComponent,
    CreateDialectEntryComponent,
    AddSynonymComponent,
    AddGermanReferenceComponent,
    DeleteSynonymComponent,
    CreateDialectLanguageComponent,
    GermanListComponent,
    NewGermanEntryComponent,
    EditGermanEntryComponent,
    UnregisteredSearchComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    RegisteredComponent,
    HomeComponent,
    AdminComponent,
    FHEmployeeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,


    ReactiveFormsModule,
    BrowserAnimationsModule,
    //AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    HttpClientModule,
    MatCardModule
    //Ng2SearchPipeModule

  ],
  providers: [DatePipe, DialectService, httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents:
    [
      DialectComponent,
      CreateDialectEntryComponent,
      AddSynonymComponent,
      AddGermanReferenceComponent,
      DeleteSynonymComponent,
      CreateDialectLanguageComponent,
      NewGermanEntryComponent,
      EditGermanEntryComponent,
    ]
})
export class AppModule { }
