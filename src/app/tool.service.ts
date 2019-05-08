import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  
  private url = 'http://captainapp.xyz';

  constructor(public http: HttpClient, public cookieService: CookieService) { }

  public loginService(data, boolSocialSignIn): Observable<any> {

    let params: any;
    if (boolSocialSignIn === true) {

       params = new HttpParams()
        .set('email', data.email)
        .set('fullName', data.fullName)
        .set('boolSocialSignIn', boolSocialSignIn);
    } else {
      
       params = new HttpParams()
        .set('email', data.email)
        .set('password', data.password)
        .set('boolSocialSignIn', boolSocialSignIn);
    }

    return this.http.post(`${this.url}/api/v1/users/login`, params);
  } // end of loginFunction

  public signUpService(data): Observable<any> {

    const params = new HttpParams()
    .set('fullName', data.fullName)
    .set('email', data.email)
    .set('password', data.password);

    return this.http.post(`${this.url}/api/v1/users/register`, params);
  } // end of signUpFunction 

  public forgotpwd(emailData): Observable<any> {

    const params = new HttpParams()
      .set('email', emailData.email);

    return this.http.post(`${this.url}/api/v1/users/forgotPwd`, params);
  } //  end of forgotpwd function

  public changePassword(pwdData, resetToken): Observable<any> {

    const params = new HttpParams()
      .set('newPassword', pwdData.newPassword);

    return this.http.post(`${this.url}/api/v1/users/change-password/${resetToken}`, params);
  } //  end of changePassword function

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.cookieService.get('authToken'));

    return this.http.post(`${this.url}/api/v1/users/logout`, params);
  } //  end of logout function

  public addIssue(title, description, assignee, status): Observable<any> {

    const params = new HttpParams()
      .set('title', title)
      .set('description', description)
      .set('assignee', assignee)
      .set('status', status)
      .set('authToken', this.cookieService.get('authToken'));
      
    return this.http.post(`${this.url}/api/v1/users/addIssue`, params);
  } //  end of addIssue function

  public getAllIssues(): Observable<any> {

    return this.http.get(`${this.url}/api/v1/users/getAllIssues`);
  } //  end of getAllIssues function

  public getIssueById(id): Observable<any> {

    return this.http.get(`${this.url}/api/v1/users/getIssueById/${id}`);
  } //  end of getIssueById function

  public editIssue(id, issueData): Observable<any> {

    return this.http.put(`${this.url}/api/v1/users/editIssue/${id}`, issueData);
  } //  end of getIssueById function

  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';

    if (err.error instanceof Error) {

      errorMessage = `An error occurred: ${err.error.message}`;

    } else {

      errorMessage = `Server returned code: ${err.status}, Error Message is: ${err.message}`;

    } // end condition if

    console.error(errorMessage);

    return Observable.throw(errorMessage);

  } // End HandleError
}
