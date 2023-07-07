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
  name: string = "";
  email: string = "";
  studentsData: any;
  appliedData: any;
  combinedData: any[] = [];
  color = 'accent';
  checked: boolean = true;
  disabled: boolean = false;
  token: any;
  user_id: any;
  user_name: string;
  studentsLength: any;

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
        this.studentsLength = this.studentsData.length;
      }
    })

    console.log('filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',this.filterText);

  }

  search(name: any, email: any) {
    this.name = name;
    this.email = email;

    if (this.name != null) {
      this.studentsData = this.studentsData.filter((students: any) =>
        students.name.toLowerCase().includes(this.name.toLowerCase()) || students.surname.toLowerCase().includes(this.name.toLowerCase())
      );
      this.studentsLength = this.studentsData.length;
    } else {
      this.studentsData = this.studentsData;
    }

    if (this.email != null) {
      this.studentsData = this.studentsData.filter((students: any) =>
        students.email.toLowerCase().includes(this.email.toLowerCase())
      );
      this.studentsLength = this.studentsData.length;
    } else {
      this.studentsData = this.studentsData;
    }

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

  filterTable() {
    console.log('filt',this.filterText);
    
    if (this.filterText) {
      this.studentsData = this.studentsData.filter((students: any) =>
        students.name.toLowerCase().includes(this.filterText.toLowerCase()) || students.surname.toLowerCase().includes(this.filterText.toLowerCase()) || students.email.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.studentsLength = this.studentsData.length;
    } else {
      this.studentsData = this.studentsData;
    }
  }

  viewMore(user_id: any, app_id: any) {
    this.router.navigate(['pages/studentManagement/viewMore'], { queryParams: {user_id : user_id, app_id : app_id, viewFrom : 'student'} })
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
