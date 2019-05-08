import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public inputNewPwd: any;
  public confirmPwd: any;
  public resetToken: any;

  constructor(private route: ActivatedRoute, public router: Router, public toastr: ToastrService,
    public toolService: ToolService) { }

  ngOnInit() {
    this.resetToken = this.route.snapshot.paramMap.get('randomToken');
  }


  public submitPwdFunction: any = () => {

    const pwdData = {
      newPassword: this.inputNewPwd,
      confrimPassword: this.confirmPwd
    };

    if (pwdData.newPassword !== pwdData.confrimPassword) {
      this.toastr.error('Password not matched');
    } else {

      this.toolService.changePassword(pwdData, this.resetToken).subscribe((apiResponse) => {

        if (apiResponse.status === 200) {

          this.toastr.info('Password Changed successfully');

          setTimeout(() => this.router.navigate(['/login']), 1000);
        }
        else {
          if (apiResponse.status === 403)
            this.toastr.error('Invalid Reset token!');
          else
            this.toastr.error('Something Went Wrong or Server not responding!');
        }
      }, (err) => {

        this.toastr.error('Something Went Wrong or Server not responding!');
      });
    }
  } // end of submitPwdFunction
}
