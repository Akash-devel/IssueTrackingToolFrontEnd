import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("2235943409957175")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("392750858066-g04vl2ik7lamamk33847avss69j2pufl.apps.googleusercontent.com")
        } 
      ]
  );
  return config;
}

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ChangePasswordComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent, pathMatch: 'full' },
      { path: 'change-password/:randomToken', component: ChangePasswordComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ])
  ],
  providers: [ {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }],
})
export class UserModule { }
