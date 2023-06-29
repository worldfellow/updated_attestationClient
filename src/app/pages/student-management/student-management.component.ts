import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-management',
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css'],
  providers: [MessageService],
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
  user_id: any;
  user_name: string;

  constructor(
    protected api: ApiService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_name = this.token.data.user.user_name + ' ' + this.token.data.user.user_surname;

    this.api.getStudentList(null).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.studentsData = data['data'];
        console.log('students------------->', this.studentsData);
      }
    })
  }

  filterTableName() { }

  filterTableEmail() { }

  filterTable() { }

  viewMore(studentData: any) {
    this.router.navigate(['pages/studentManagement/viewMore'],{ queryParams: studentData })
  }

  toggleChanged(event: any, studentData: any) {
    console.log('event', event);

    this.api.activeinactiveStudent(event, studentData, this.user_id, this.user_name).subscribe((data: any) => {
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
  }
}
