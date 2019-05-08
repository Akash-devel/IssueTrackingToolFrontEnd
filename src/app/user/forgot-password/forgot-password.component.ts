import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public inputEmail: any;

  constructor(public toastr: ToastrService, public toolService: ToolService, public cookieService: CookieService,
    public router: Router) { }

  ngOnInit() {
  }

  public sendLink: any = () => {

    const emailDataObj = {
      email: this.inputEmail
    };

    this.toolService.forgotpwd(emailDataObj).subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        this.toastr.info('Link to your Email sent successfully!!');

        setTimeout(() => this.router.navigate(['/login']), 1000);
      }
    }, (err) => {
      if (err.status === 403)
        this.toastr.error('Not a registered Email Id!');
      else if (err.status === 500)
        this.toastr.error('Internal Server Error!');
      else if (err.status === 400)
        this.toastr.error('Bad Request!');
      else
        this.toastr.error('Something Went Wrong or Server not responding!');
    });
  } // end sendLink function
}
