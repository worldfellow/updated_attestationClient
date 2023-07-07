import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

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
  providers: [ConfirmationService, MessageService]
})
export class PendingApplicationsComponent implements OnInit {

  loading: boolean = false;
  tracker: any;
  status: any;
  newApplication: any;
  requestedApplication: any;
  changedApplication: any;
  first: number = 0; 
  rows: number = 10;
  token:any;
  user_email: any;
  filterText: any;
  filterTextRequested: any;


  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('globalSearch') globalSearch!: ElementRef;
  @ViewChild('idR') idR!: ElementRef;
  @ViewChild('nameR') nameR!: ElementRef;
  @ViewChild('emailR') emailR!: ElementRef;
  @ViewChild('globalSearchR') globalSearchR!: ElementRef; 


  constructor(protected api: ApiService,private confirmationService: ConfirmationService, private messageService: MessageService) {

  }
  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_email = this.token.data.user.user_email;
    this.refresh();
  }
  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);
  }
  refresh() {
    this.handleTabChange(0,10,0,"null","","null","null");
  }
  /** handleTabChange Function to load the data based on tracker and status*/
  handleTabChange(event: number,limit:number,offset:number,id:any,name:any,email:any,globalSearch:any) {
    this.tracker = "AND tracker='apply'";
    this.status = "AND status='new'";
    console.log("limit1111111111111",limit);
    console.log("offset1111111111111",offset);
    const selectedIndex = event;
    console.log('Selected Tab Index:', selectedIndex);
    switch (selectedIndex) {
      case 0:
        this.tracker = "AND tracker='apply'";
        this.status = "AND status='new'";
        break;
      case 1:
        this.tracker = "AND tracker='apply'";
        this.status = "AND status='requested'";
        break;
      case 2:
        this.tracker = "AND tracker='apply'";
        this.status = "AND status='changed'";
        break;
      default:
        break;
    }
    console.log("tracker", this.tracker);
    console.log("status", this.status);
    console.log("id", id);
    console.log("name", name);
    console.log("email", email);
    console.log("globalSearch", globalSearch);

/**get pending application Data from api */
    this.api.getUserApplication(this.tracker, this.status,id,offset,limit,name,email,globalSearch,"").subscribe((data: any) => { 
      
      if (data && selectedIndex == 0) {
        this.newApplication = data['data'];
      }
      if (data && selectedIndex == 1) {
        this.requestedApplication = data['data'];
      }
      if (data && selectedIndex == 2) {
        this.changedApplication = data['data'];
      }

    })
  }


/**Reject Application function from pending TAb */
rejectApplication(studentUserId:number,studentAppId:number){
   console.log("studentUserId",studentUserId);
   console.log("studentAppId",studentAppId); 
    this.confirmationService.confirm({
        message: 'Are you sure that you want to reject this Application?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.api.rejectApplications(studentUserId ,studentAppId,this.user_email).subscribe((data : any)=>{
            if(data['status'] == 200){
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
              this.refresh();
            }
          })
           
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
      this.api.verifiedApplication(userId ,appId,this.user_email).subscribe((data : any)=>{
        if(data['status'] == 200){
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          this.refresh();
        }
      }) 
    }
})

}

/**View Errata Function it navigate to Errata process */
viewErrata(userId:number,appId:number){

}


/**pagination of new application */
onPageChange(event: PageEvent) {
  this.first = event.first;
  this.rows = event.rows;
  let offset =this.first
  let limit=this.rows
  this.filterData();
  let filterData;
  if (!this.filterText) {
    filterData = "null"
  } else {
    filterData = this.filterText
  } 
  this.handleTabChange(0,limit,offset,"null","","null",filterData)
}

/**Search new Application Function to search individual */
searchNewApplication(id: any, name: any, email: any) {
  if (!id) {
    id = null;
  } 
  if (!email) {
    email = null;
  } 
  console.log("name", id, name, email); 
  this.handleTabChange(0,10,0,id,name,email,"null")
}

/**Search Requested Application Function to search individual */
searchRequestedApplication(id: any, name: any, email: any) {
  if (!id) {
    id = null;
  } 
  if (!email) {
    email = null;
  } 
  console.log("name", id, name, email); 
  this.handleTabChange(1,10,0,id,name,email,"null")
}

/**Pagination of Requested Application */
onPageChangeRequested(event: PageEvent) {

this.first = event.first;
this.rows = event.rows;
let offset =this.first;
let limit=this.rows;
this.filterDataRequested();
let filterDataRequested;
if (!this.filterText) {
  filterDataRequested = "null"
} else {
  filterDataRequested = this.filterText
} 
this.handleTabChange(1,limit,offset,"null"," ","null",filterDataRequested)
}

/**Clear the search input value based on type */
clear(type:string) {
  console.log("type",type);


  if(type === "new"){
    console.log("type",type);
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.globalSearch.nativeElement.value = '';
    this.handleTabChange(0,10,0,"null","","null","null") 
  }
  if(type === "requested"){
    this.idR.nativeElement.value = '';
    this.nameR.nativeElement.value = '';
    this.emailR.nativeElement.value = '';
    this.globalSearchR.nativeElement.value = ''; 
    console.log("type",type);
    this.handleTabChange(1,10,0,"null","","null","null") 
  }
}

/**Global Search Function in new Application*/
filterData() {
this.handleTabChange(0,10,0,"null"," ","null",this.filterText)
}
/**Global Search Function in Requested Application*/
filterDataRequested(){
  console.log("this.filterText",this.filterText);
  
  this.handleTabChange(1,10,0,"null"," ","null",this.filterText)
}

}
