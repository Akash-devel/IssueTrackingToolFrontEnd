import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToolService } from './tool.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { ButtonModule } from 'primeng/button';
import { CookieService } from 'ngx-cookie-service';
import { IssueModule } from './issue/issue.module';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    IssueModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: '*', component: NotFoundComponent },
      { path: '**', component: NotFoundComponent }
    ]),
    ButtonModule
  ],
  providers: [ToolService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
