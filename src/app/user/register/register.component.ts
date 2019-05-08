import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public inputFullName: any;
  public inputEmail: any;
  public inputPassword: any;
  public confirmPwd: any;

  constructor(public router: Router, public cookieService: CookieService, public toolService: ToolService,
    public toastr: ToastrService) { }

  ngOnInit() {
  }

  public goTologin: any = () => {

    this.router.navigate(['/login']);
  } // end of goTologin

  public signupFunction: any = () => {

    if (this.inputPassword !== this.confirmPwd) {

      this.toastr.error("Password not matched");
    } else {

      const data = {
        fullName: this.inputFullName,
        email: this.inputEmail,
        password: this.inputPassword,
      };
      
      this.toolService.signUpService(data).subscribe((singUpApiResponse) => {

        if (singUpApiResponse.status === 200) {

          this.toastr.success('Signup Successfull');

          setTimeout(() => this.router.navigate(['/login']), 1000);
        }
      }, (err) => {

        if (err.status === 403)
          this.toastr.error('Email is already registered!');
        else if (err.status === 500)
          this.toastr.error('Internal Server Error!');
        else if (err.status === 400)
          this.toastr.error('Bad Request!');
        else
          this.toastr.error('Something Went Wrong or Server not responding!');
      });
    }
  } // end of Signup fucntion
}
