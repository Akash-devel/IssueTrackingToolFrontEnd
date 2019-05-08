import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Issue } from './../../issue.model';
import { ToastrService } from 'ngx-toastr';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-issue-view',
  templateUrl: './issue-view.component.html',
  styleUrls: ['./issue-view.component.css']
})
export class IssueViewComponent implements OnInit {

  id: String;
  issue: any = {};
  updateForm: FormGroup;
  public assigneeArray = [];
  public assignedToArray = [];
  public description;

  constructor(private toolService: ToolService, private router: Router, private route: ActivatedRoute,
    private cookieService: CookieService, private fb: FormBuilder, private toastr: ToastrService) {

    this.createForm();
    this.fetchNameForReporters();
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params.id;

      this.toolService.getIssueById(this.id).subscribe((apiResponse) => {

        this.issue = apiResponse.data;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('assignee').setValue(this.issue.assignee);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }


  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignee: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  private fetchNameForReporters: any = () => {
    this.toolService.getAllIssues().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        for (let i in apiResponse.data) {
          this.assigneeArray.push(apiResponse.data[i].reporter);
        }

        this.setUniqueValuesforAssignedToArray();
      }
    }, (err) => {

      this.toastr.error('No Internet Connection');
    });
  } // end of fetchNameForReporters

  // For Setting unique values in Assigned to dropdown box
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

  private updateIssue: any = (title, description, assignee, status) => {

    const issueData = {
      title, description, assignee, status
    };
    issueData.description = this.description;
    this.toolService.editIssue(this.id, issueData).subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        this.toastr.success('Issue Edited Successfully!!');
        setTimeout(() => this.router.navigate(['/User-Dashboard']), 1000);
      }
    }, (err) => {

      this.toastr.error('Some error occured');
    })
  } // end of updateIssue
}

