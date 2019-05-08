import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { IssueEditComponent } from './issue-edit/issue-edit.component';
import { IssueCreateComponent } from './issue-create/issue-create.component';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule, MatPaginatorModule, MatSortModule, MatListModule } from '@angular/material';
import {EditorModule} from 'primeng/editor';
import {FileUploadModule} from 'primeng/fileupload';
import { IssueViewComponent } from './issue-view/issue-view.component';
import { IssueRouteGuardService } from './issue-route-guard.service';

@NgModule({
  declarations: [UserDashboardComponent, IssueEditComponent, IssueCreateComponent, IssueViewComponent],
  providers: [IssueRouteGuardService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    FileUploadModule,
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    RouterModule.forChild([
      { path: 'User-Dashboard', component: UserDashboardComponent, pathMatch: 'full' , canActivate: [IssueRouteGuardService]},
      { path: 'create-issue', component: IssueCreateComponent , canActivate: [IssueRouteGuardService]},
      { path: 'edit-issue/:id', component: IssueEditComponent , canActivate: [IssueRouteGuardService]},
      { path: 'view-issue/:id', component: IssueViewComponent , canActivate: [IssueRouteGuardService]}
    ])
  ]
})
export class IssueModule { }
