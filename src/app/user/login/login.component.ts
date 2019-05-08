import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  public inputEmail: any;
  public inputPassword: any;
  public boolSocialSignIn = false;

  constructor(public router: Router, public cookieService: CookieService, public toolService: ToolService,
    public toastr: ToastrService, private socialAuthService: AuthService) { }

  ngOnInit() {
  }

  public goToRegister: any = () => {

    this.router.navigate(['/register']);
  } // end of goToRegister 

  public loginFunction: any = () => {

    this.boolSocialSignIn = false;

    const data = {
      email: this.inputEmail,
      password: this.inputPassword
    };

    this.toolService.loginService(data, this.boolSocialSignIn).subscribe((apiResponse) => {

      if (apiResponse.status === 200) {

        this.cookieService.set('authToken', apiResponse.data.authToken);
        this.cookieService.set('User_LoggedIn', apiResponse.data.userDetails.fullName);
        this.cookieService.set('UserId_LoggedIn', apiResponse.data.userDetails.issueId);
        this.cookieService.set('email_LoggedIn', apiResponse.data.userDetails.email);

        this.toastr.success('Login Successfull');

        setTimeout(() => this.router.navigate(['/User-Dashboard']), 1000);

      }
    }, (err) => {
      if (err.status === 403)
        this.toastr.error('Wrong Email Id!');
      else if (err.status === 401)
        this.toastr.error('Wrong Password provided!');
      else if (err.status === 500)
        this.toastr.error('Internal Server Error!');
      else if (err.status === 400)
        this.toastr.error('Bad Request!');
      else
        this.toastr.error('Something Went Wrong or Server not responding!');
    });
  } // end loginFunction

  public socialSignIn(socialPlatform: string) {

    let socialPlatformProvider;
    this.boolSocialSignIn = true;

    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {

        const socialUserData = {
          email: userData.email,
          fullName: userData.name
        }

        this.toolService.loginService(socialUserData, this.boolSocialSignIn).subscribe((apiResponse) => {

          if (apiResponse.status === 200) {

            this.cookieService.set('authToken', apiResponse.data.authToken);
            this.cookieService.set('User_LoggedIn', apiResponse.data.userDetails.fullName);
            this.cookieService.set('UserId_LoggedIn', apiResponse.data.userDetails.issueId);
            this.cookieService.set('email_LoggedIn', apiResponse.data.userDetails.email);

            this.toastr.success('Login Successfull');

            setTimeout(() => this.router.navigate(['/User-Dashboard']), 1000);
          }
        }, (err) => {
          this.toastr.error('Server not responding!');
        });
      }
    );
  } // end of socialSignIn
}
