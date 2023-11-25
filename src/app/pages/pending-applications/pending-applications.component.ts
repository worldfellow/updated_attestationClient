import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotesComponent } from '../dailogComponents/notes.component';
import { Router } from '@angular/router';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-pending-applications',
  templateUrl: './pending-applications.component.html',
  styleUrls: ['./pending-applications.component.css'],
  providers: [ConfirmationService, MessageService,DialogService]
})
export class PendingApplicationsComponent implements OnInit {
  
  ref:DynamicDialogRef;
  loading: boolean = false;
  tracker: any;
  status: any;
  newApplication: any;
  requestedApplication: any;
  changedApplication: any;
  first: number = 0; 
  rows: number = 10;
  token:any;
  admin_email: any;
  filterText: any;
  filterTextRequested: any;
  totalCount:any;


  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('globalSearch') globalSearch!: ElementRef;
  @ViewChild('idR') idR!: ElementRef;
  @ViewChild('nameR') nameR!: ElementRef;
  @ViewChild('emailR') emailR!: ElementRef;
  @ViewChild('globalSearchR') globalSearchR!: ElementRef; 


    constructor(protected api: ApiService,private router: Router,private confirmationService: ConfirmationService,private dialogService: DialogService, private messageService: MessageService) {

  }
  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.admin_email = this.token.data.user.user_email;
    this.refresh();
  }
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }
  refresh() {
    this.handleTabChange(0,10,0,'','','','');
  }
  /** handleTabChange Function to load the data based on tracker and status*/
  handleTabChange(event: number,limit:number,offset:number,id:any,name:any,email:any,globalSearch:any) {
    this.tracker = "apply";
    this.status = "new"; 
    const selectedIndex = event;
    console.log('Selected Tab Index:', selectedIndex);
    switch (selectedIndex) {
      case 0:
        this.tracker = "apply";
        this.status = "new";
        break;
      case 1:
        this.tracker = "apply";
        this.status = "requested";
        break;
      case 2:
        this.tracker = "apply";
        this.status = "changed";
        break;
      default:
        break;
    } 

/**get pending application Data from api */
    this.api.getUserApplication(this.tracker, this.status,id,offset,limit,name,email,globalSearch,"").subscribe((data: any) => { 
      
      if (data && selectedIndex == 0) {
        this.newApplication = data['data'];
        this.totalCount = data['count'];
      }
      if (data && selectedIndex == 1) {
        this.requestedApplication = data['data'];
        this.totalCount = data['count'];
      }
      if (data && selectedIndex == 2) {
        this.changedApplication = data['data'];
        this.totalCount = data['count'];
      }

    })
  }


/**Reject Application function from pending TAb */
  rejectApplication(studentUserId: number, studentAppId: number, type: string) { 
    this.confirmationService.confirm({
      message: 'Are you sure that you want to reject this Application?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ref = this.dialogService.open(NotesComponent, {
          data: {
            type: 'rejected',
            app_id: studentAppId
          },
          header: 'Notes Details',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          closable: false
        });
        this.ref.onClose.subscribe(() => {
          this.api.rejectApplications(studentUserId, studentAppId, this.admin_email, type).subscribe((data: any) => {
            if (data['status'] == 200) {
              this.refresh();
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data['message'] });
            }
          })
        });
      }
    })

  }

/**verify Application function from pending TAb */
verifyApplication(userId:number,appId:number){
  this.confirmationService.confirm({
    message: 'Are you sure that you want to Verify this Application?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.api.verifiedApplication(userId ,appId,this.admin_email).subscribe((data : any)=>{
        if(data['status'] == 200){
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: data['message'] });
          this.refresh();
        }
      }) 
    }
})

}

/**View Errata Function it navigate to Errata process */
viewErrata(user_id:number,app_id:number){
 this.router.navigate(['pages/adminVerified/viewMore'], { queryParams: { user_id: user_id, app_id: app_id, viewFrom: 'pending' } })
}


/**pagination of new application */
onPageChange(event: PageEvent) {
  this.first = event.first;
  this.rows = event.rows;
  let offset =this.first
  let limit=this.rows
  this.filterData();
  let filterData;
  if(!this.filterText){
    filterData="";
 }else{
   filterData = this.filterText
 }
  this.handleTabChange(0,limit,offset," "," "," ",filterData)
}

/**Search new Application Function to search individual */
searchNewApplication(id: any, name: any, email: any) { 
  this.handleTabChange(0,10,0,id,name,email," ")
}

/**Search Requested Application Function to search individual */
searchRequestedApplication(id: any, name: any, email: any) { 
  this.handleTabChange(1,10,0,id,name,email,"")
}

/**Pagination of Requested Application */
onPageChangeRequested(event: PageEvent) {

this.first = event.first;
this.rows = event.rows;
let offset =this.first;
let limit=this.rows;
this.filterDataRequested();
let filterDataRequested;
if(!this.filterText){
  filterDataRequested="";
}else{
  filterDataRequested = this.filterText
}
this.handleTabChange(1,limit,offset,'', '','',filterDataRequested)
}
 
/**Clear the search input value based on type */
clear(type:string) { 

  if(type === "new"){ 
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.globalSearch.nativeElement.value = '';
    this.handleTabChange(0,10,0," "," "," "," ") 
  }
  if(type === "requested"){
    this.idR.nativeElement.value = '';
    this.nameR.nativeElement.value = '';
    this.emailR.nativeElement.value = '';
    this.globalSearchR.nativeElement.value = '';  
    this.handleTabChange(1,10,0," "," "," "," ") 
  }
}

/**Global Search Function in new Application*/
filterData() {
 
this.handleTabChange(0,10,0," "," "," ",this.filterText)
}
/**Global Search Function in Requested Application*/
filterDataRequested(){ 
  
  this.handleTabChange(1,10,0," "," "," ",this.filterText)
}

}
