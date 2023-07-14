import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowNotesComponent } from '../dialog/show-notes/show-notes.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-emailed-applications',
  templateUrl: './emailed-applications.component.html',
  styleUrls: ['./emailed-applications.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class EmailedApplicationsComponent implements OnInit {

  filterText: any;
  emailedApplication: any;
  totalCount: any;
  first: number = 0;
  rows: number = 10; 


  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('globalSearch') globalSearch!: ElementRef;

  constructor(protected api: ApiService, private dialog: MatDialog, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService,) {

  }

  ngOnInit(): void {
    this.refresh("", "", "","", 10, 0);
  }

  refresh(id: any, name: any, email: any,globalSearch:any,limit: number, offset: number) {
    this.api.getEmailedApplication(id, name, email,globalSearch, limit, offset).subscribe((data: any) => {
      console.log("data", data['data']);
      if (data) {
        this.emailedApplication = data['data'];
        this.totalCount = data['count'][0].email_count; 
      }
    })
  }

  /** Filter Data to search globally */
  filterData() {
    this.refresh("","","",this.filterText,10,0)
  }

  /** Clear function to clear the input search box value */
  clear() {
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.globalSearch.nativeElement.value = '';
    this.refresh("", "", "","", 10, 0)
  }

  /**Search function to search the application data based on name,email and application ID */
  search(id: any, name: any, email: any) {
    this.refresh(id, name, email,"", 10, 0)
  }

  /**pagination to load Application Data based on the current page */
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first;
    let limit = this.rows;

    this.refresh("", "", ""," ",limit, offset);
  }

  /** viewMore function to navigate to viewMore page*/
  viewMore(user_id: any, app_id: any) {
    this.router.navigate(['pages/adminemailed/viewMore'], { queryParams: { userId: user_id, app_id: app_id, viewFrom: 'done' } });
  }

  /**sendEmail Function to send the email to particular application */
  sendEmail() {
    this.confirmationService.confirm({
      message: 'Are you sure want to email this Application ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {

      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  /**View and edit notes */
  showNotes(notes: any, app_id: any, user_id: any, collegeConfirmation: any) {
    const dialogRef = this.dialog.open(ShowNotesComponent, {
      data: {
        notes_data: notes,
        app_id: app_id,
        user_id: user_id,
        collegeConfirmation: collegeConfirmation,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  /**resendApplication Function to resend the application to verified Tab */
  resendApplication(user_id: any, app_id: any, user_name: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to resend this Application to Verified?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        // this.api.resendApplication(user_id, app_id, user_name, 'verified', this.admin_email).subscribe((data: any) => {
        //   if (data['status'] == 200) {
        //     this.ngOnInit();
        //     this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
        //   } else {
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
        //   }
        // })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }


  mergeFile() {
    console.log("karthik");

  }
}
