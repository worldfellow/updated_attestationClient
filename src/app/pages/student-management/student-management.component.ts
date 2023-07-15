import { Component } from '@angular/core';
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

    this.search(null, null, null, 0, 10);
  }



  // filterTable() {
  //   console.log('filt',this.filterText);

  //   if (this.filterText) {
  //     this.studentsData = this.studentsData.filter((students: any) =>
  //       students.name.toLowerCase().includes(this.filterText.toLowerCase()) || students.surname.toLowerCase().includes(this.filterText.toLowerCase()) || students.email.toLowerCase().includes(this.filterText.toLowerCase())
  //     );
  //     this.studentsLength = this.studentsData.length;
  //   } else {
  //     this.studentsData = this.studentsData;
  //   }
  // }

  filterData() {
    console.log("filterText", this.filterText);
    this.search(null, null, this.filterText, 0, 10)
  }

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first;
    let limit = this.rows;

    // this.filterData();
    let filterData;
    if (!this.filterText) {
      filterData = "null";
    } else {
      filterData = this.filterText;
    }
    console.log('llllllllllllllllllllllll',limit);
    console.log('oooooooooooooooooooooooo',offset);
    this.search(null, null, filterData, offset, limit);
  }

  search(name: any, email: any, globalSearch: any, offset: any, limit: any) {
    console.log('LLLLLLLLLLLLLLLLLLLLLLLLL',limit);
    console.log('OOOOOOOOOOOOOOOOOOOOOOOOO',offset);
    this.api.getStudentList(null, 'student', name, email, globalSearch, offset, limit).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.studentsData = data['data'];
        console.log('students------------->', this.studentsData);
        this.studentsLength = this.studentsData.length;
      }
    })

    // if (this.name != null) {
    //   this.studentsData = this.studentsData.filter((students: any) =>
    //     students.name.toLowerCase().includes(this.name.toLowerCase()) || students.surname.toLowerCase().includes(this.name.toLowerCase())
    //   );
    //   this.studentsLength = this.studentsData.length;
    // } else {
    //   this.studentsData = this.studentsData;
    // }

    // if (this.email != null) {
    //   this.studentsData = this.studentsData.filter((students: any) =>
    //     students.email.toLowerCase().includes(this.email.toLowerCase())
    //   );
    //   this.studentsLength = this.studentsData.length;
    // } else {
    //   this.studentsData = this.studentsData;
    // }

    // if ((this.name != null && this.email != null) || (this.name != null && this.email == null) || (this.name == null && this.email != null)) {
    //   console.log('++++++++++++++');
    //   console.log('name--****---', this.name);
    //   console.log('email****-----', this.email);

    //   this.studentsData = this.studentsData.filter((students: any) =>
    //     students.name.toLowerCase().includes(this.name.toLowerCase()) || students.surname.toLowerCase().includes(this.name.toLowerCase()) || students.email.toLowerCase().includes(this.email.toLowerCase())
    //   );
    //   this.studentsLength = this.studentsData.length;
    // } else {
    //   this.studentsData = this.studentsData;
    // }
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
}
