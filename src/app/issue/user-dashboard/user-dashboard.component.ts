import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatPaginator, MatTableDataSource, MatSort, MatList, MatListItem } from '@angular/material';
import { Issue } from './../../issue.model';
import { CookieService } from 'ngx-cookie-service';
import { ToolService } from '../../tool.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit {

  issues: Issue[];
  issuesData: any;
  watcherHidden: any = false;
  watcherOpenFor: any;
  startWatchTxt: any = false;
  openWaterDrpDwn: any = true;
  displayedColumns = ['id', 'title', 'status', 'reporter', 'dateCreated', 'action', 'watchers'];
  dataSource;

  watchersArray: any = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router, private toastr: ToastrService, private toolService: ToolService,
    private cookieService: CookieService) {
  }

  ngOnInit() {
    this.fetchIssues();
  }


  fetchIssues() {
    this.toolService.getAllIssues().subscribe((apiResponseData) => {

      if (apiResponseData.status === 200) {
        this.issuesData = apiResponseData.data;
        let userName = this.cookieService.get('User_LoggedIn');

        this.issuesData = this.issuesData.filter((issue) => {
          return issue.assignee === userName;
        });

        // Dummy data for implementing watcher functionality
        this.issuesData.forEach((issue, i) => {
          if (i < 2) {
            this.issuesData[i].watchers = [
              { userId: '0gKnjt7Xq', fullName: 'Akash', email: 'a7872mok@kol.com' },
              { userId: '9crm--AYn', fullName: 'Akash Keshari', email: 'akash.keshari009@gmail.com' },
              { userId: "JgkNcOslt", fullName: 'Akanchha Keshari', email: 'akanchha.510@gmail.com' }
            ];
          } else {
            this.issuesData[i].watchers = [
              { userId: '9crm--AYn', fullName: 'Akash Keshari', email: 'akash.keshari009@gmail.com' },
              { userId: 'JgkNcOslt', fullName: 'Akanchha Keshari', email: 'akanchha.510@gmail.com' }
            ];
          }
        });

        this.dataSource = new MatTableDataSource(this.issuesData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else if (apiResponseData.status === 511)
        this.toastr.error('Not authorixed')
    });
  } // end of fetchIssues

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  } // end of applyFilter

  getWatchers(issueId) {
    let issues = this.issuesData.filter(issue => {
      return issue.issueId === issueId;
    });
    let watchers = issues[0].watchers;
    return watchers;
  } // end of getWatchers


  editIssue(id) {
    this.router.navigate([`/edit-issue/${id}`]);
  } // end of editIssue

  watchIcon(id) {
    if (id === this.watcherOpenFor) {
      this.watcherOpenFor = "";
      return;
    }
    this.watcherOpenFor = id;
  } // end of watchIcon

  startStopWatch(element) {
    let userId = this.cookieService.get('UserId_LoggedIn');
    let userEmail = this.cookieService.get('email_LoggedIn');
    let userName = this.cookieService.get('User_LoggedIn');

    let issueIndex = this.issuesData.findIndex(issue => {
      return issue.issueId == element.issueId;
    });

    if (this.isWatching(element.watchers)) {
      this.issuesData[issueIndex].watchers = this.issuesData[issueIndex].watchers.filter(watcher => {
        return watcher.fullName !== userName;
      })
    } else {
      this.issuesData[issueIndex].watchers.push({ userId: userId, userEmail: userEmail, fullName: userName });
    }
    this.dataSource = new MatTableDataSource(this.issuesData);
  } // end of startStopWatch

  isOpen(issueId) {
    if (issueId === this.watcherOpenFor)
      return true;
    return false;
  } // end of isOpen

  isWatching(watchers) {
    let userName = this.cookieService.get('User_LoggedIn');
    watchers = watchers.filter(watcher => {
      return watcher.fullName === userName;
    });
    return watchers.length;
  } // end of isWatching


  public getRecord: any = (row) => {
    this.router.navigate([`/view-issue/${row.issueId}`]);
  } // end of getRecord

  public logout: any = () => {
    this.toolService.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        this.cookieService.delete('authToken');
        this.cookieService.delete('User_LoggedIn');
        this.cookieService.delete('UserId_LoggedIn');
        this.cookieService.delete('email_LoggedIn');

        this.router.navigate(['/']);
        this.toastr.success('You are Logged Out')
      }
    }, (err) => {
      if (err.status === 511) {
        this.toastr.error('Session Expired');
        this.cookieService.delete('authToken');
        this.cookieService.delete('User_LoggedIn');
        this.cookieService.delete('UserId_LoggedIn');
        this.cookieService.delete('email_LoggedIn');
        this.router.navigate(['/']);
      }
      else
        this.toastr.error('Some error occurred');
    });
  } // end of logout
}

