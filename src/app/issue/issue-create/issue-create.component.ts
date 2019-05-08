import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent implements OnInit {

  public assigneeArray = [];
  public assignedToArray = [];
  private description: any;
  createForm: FormGroup;
  uploadedFiles: any[] = [];

  constructor(private toolService: ToolService, private router: Router, private toastr: ToastrService, private formBuid: FormBuilder) {

    this.createForm = this.formBuid.group({

      title: ['', Validators.required],
      description: ['', Validators.required],
      assignee: ['', Validators.required],
      status: ['', Validators.required]
    })


    this.fetchNameForReporters();
  }

  private editorTextChanged: any = (event) => {
    this.description = event.htmlValue;
  } // end of editorTextChanged

  private fetchNameForReporters: any = () => {
    this.toolService.getAllIssues().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        for (let i in apiResponse.data) {
          this.assigneeArray.push(apiResponse.data[i].reporter);
        }

        this.setUniqueValuesforAssignedToArray();
      } 
    }, (err) => {

      this.toastr.error('No Internet connection');
    });
  } // end of fetchNameForReporters

  // For Setting unique values in "Assigned to" dropdown box
  private setUniqueValuesforAssignedToArray: any = () => {
    let tempArr = this.assigneeArray.sort();
    let tempVar = '';
    let len = this.assigneeArray.length;
    for (let i = 0; i < len; i++) {
      if (tempArr[i] !== tempVar) {
        this.assignedToArray.push(tempArr[i]);
        tempVar = tempArr[i];
      }
    }
  } // end of setUniqueValuesforAssignedToArray

  ngOnInit() { }

  private addIssue: any = (title, description, assignee, status) => {

    this.createForm.value.description = this.description;
    this.toolService.addIssue(title, description, assignee, status)
      .subscribe((addIssueResponse) => {

        if (addIssueResponse.status === 200) {

          this.toastr.success('Issue Created Successfully!');
          setTimeout(() => this.router.navigate(['/User-Dashboard']), 1000);
        } 
      }, (err) => {

        if (err.status === 500)
          this.toastr.error('Internal Server Error!');
        else if (err.status === 400)
          this.toastr.error('Bad Request!');
        else
          this.toastr.error('Something Went Wrong or Server not responding!');
      });
  } // end of addIssue
}
