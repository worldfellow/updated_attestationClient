import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShowNotesComponent } from '../dialog/show-notes/show-notes.component';
import { MatDialog } from '@angular/material/dialog';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-wes-applications',
  templateUrl: './wes-applications.component.html',
  styleUrls: ['./wes-applications.component.css'],
  providers: [ ConfirmationService, MessageService]
})
export class WesApplicationsComponent implements OnInit {
  filterText: any;
  wesApplication:any;
  first: number = 0;
  rows: number = 10;
  totalCount:number;

  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  constructor(protected api: ApiService, private confirmationService: ConfirmationService, private router: Router,private dialog: MatDialog,private messageService: MessageService,) {

  }

  ngOnInit(): void {
  this.refresh("","","","",10,0)
  }

/**get Wes application Data through api in refresh function */
  refresh(id:any,name:string,email:any,wesno:any,limit:number,offset:number){
    this.api.getWesApplication(id,name,email,wesno,limit,offset).subscribe((data:any)=>{
      
      if(data){
        this.wesApplication = data['data'];
        this.totalCount = data['count'];
      }

    })
  }
  filterData() {

  }
/**To clear the input search Box and return the Value*/
  clear() {
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
      this.refresh("","","","",10,0)
  }

  /**SearchWes function to get Data based on searched value */
  searchWes(id: any, name: any, email: any,wesno : any) { 
    this.refresh(id,name,email,wesno,10,0)
  }

  /**Pagination function to get Data according to that page */
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first
    let limit = this.rows 
    this.refresh("","","","",limit,offset)
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
}
