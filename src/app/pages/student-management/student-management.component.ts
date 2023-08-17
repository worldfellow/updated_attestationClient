import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class StudentManagementComponent {
  filterText: string = "";
  studentsData: any;
  appliedData: any;
  combinedData: any[] = [];
  color = 'accent';
  checked: boolean = true;
  disabled: boolean = false;
  token: any;
  user_email: any;
  studentsLength: any;
  first: number = 0;
  rows: number = 10;
  totalCount: number;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;
  @ViewChild('local') local!: ElementRef;

  constructor(
    protected api: ApiService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_email = this.token.data.user.user_email;

    this.search('', '', '', 0, 10);
  }

  filterData() {
    console.log("filterText", this.filterText);
    this.search('', '', this.filterText, 0, 10)
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first;
    let limit = this.rows;

    // this.filterData();
    let filterData;
    if (!this.filterText) {
      filterData = '';
    } else {
      filterData = this.filterText;
    }
    console.log('llllllllllllllllllllllll',limit);
    console.log('oooooooooooooooooooooooo',offset);
    this.search('', '', filterData, offset, limit);
  }

  search(name: any, email: any, globalSearch: any, offset: any, limit: any) {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLL',limit);
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOO',offset);
    this.api.getStudentList("", 'student', name, email, globalSearch, offset, limit).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.studentsData = data['data'];
        this.totalCount = data['count'];
        console.log('data------------->', this.studentsData);
        console.log('count------------->', this.totalCount);
        // this.studentsLength = this.studentsData.length;
      }else{
        this.studentsData = data['data'];
        this.totalCount = data['count'];
      }
    })
  }

  viewMore(user_id: any, app_id: any) {
    console.log('########################',user_id);
    console.log(';;;;;;;;;;;;;;;;;;;;;;;;;',app_id);
    
    this.router.navigate(['pages/studentManagement/viewMore'], { queryParams: { user_id: user_id, app_id: app_id, viewFrom: 'student' } })
  }

  toggleChanged(event: any, studentData: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to change status?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.activeinactiveStudent(event, studentData, this.user_email).subscribe((data: any) => {
          if (data['status'] == 200) {
            console.log('success');
            if (data['data'] == 'active') {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            }
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
        this.ngOnInit();
      }
    })
  }

  clear() {
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.local.nativeElement.value = '';
    this.search('', '', '', 0, 10);
  }
}
