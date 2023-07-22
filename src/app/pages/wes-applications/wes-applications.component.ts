import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api'; 
import { MatDialog } from '@angular/material/dialog';
import { NotesComponent } from '../dailogComponents/notes.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

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
  providers: [ ConfirmationService, MessageService,DialogService]
})
export class WesApplicationsComponent implements OnInit {
  filterText: any;
  wesApplication:any;
  first: number = 0;
  rows: number = 10;
  totalCount:number;
  token:any;
  admin_email:any;
  ref:DynamicDialogRef;

  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('wesno') wesno!: ElementRef;

  constructor(protected api: ApiService, private confirmationService: ConfirmationService,private dialogService: DialogService, private router: Router,private dialog: MatDialog,private messageService: MessageService,) {

  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;
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
    this.wesno.nativeElement.value = '';
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
  this.ref = this.dialogService.open(NotesComponent, {
    data: {
      notes_data: notes,
      app_id: app_id,
      user_id: user_id,
      collegeConfirmation: collegeConfirmation,
    },
    header: 'Notes Details',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,
    maximizable: true,
    closable: true
  });
  this.ref.onClose.subscribe((data: any) => {  
    if (data) {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Details Saved Successfullyaaaaaaaaa!' });
      this.refresh("", "", "","", 10, 0);
    }
  });
}

  

    /**resendApplication Function to resend the application to verified Tab */
    resendApplication(user_id: any, app_id: any) {
      this.confirmationService.confirm({
        message: 'Are you sure want to resend this Application to Verified?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
  
        accept: () => {

          this.api.resendWesApplication(user_id, app_id,this.admin_email).subscribe((data: any) => {
            if (data['status'] == 200) {
              this.ngOnInit();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data['message'] });
            }
          })
        },
  
        reject: () => {
          this.confirmationService.close();
        }
      })
    }
}
