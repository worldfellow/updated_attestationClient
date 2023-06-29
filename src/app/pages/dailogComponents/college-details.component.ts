import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder,FormControl } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-college-details',
  template: `
  <p-toast></p-toast>
  <p-card header="Title">
  <div class="m-0">
  <form [formGroup]="CollegeDetails">
  <div class="row">
  <div class="col-md-6">
  <p-dropdown  [style]="{'width':'25rem'}"
  [options]="collegeList"  [virtualScroll]="true" formControlName="collegeNameCtrl" [editable]="true"
  [virtualScrollItemSize]="30" optionLabel="name" [filter]="true" filterBy="name" [showClear]="true"
  placeholder="Select a CollegeName">
  </p-dropdown>
  </div>
  <div class="col-md-6">
  <p-dropdown [style]="{'width':'20rem'}" [options]="collegeCourse" class="p-inputtext-sm"    [virtualScroll]="true"
  [virtualScrollItemSize]="38" optionLabel="name" formControlName="courseNameCtrl" [editable]="true"
  [showClear]="true" placeholder="Select a Course">
  </p-dropdown>
  </div>
  </div>
  <br><br>
  <div class="row">
  <div class="col-md-3">
  <p-dropdown [style]="{'width':'15rem'}" [options]="semYear" class="p-inputtext-sm" [virtualScroll]="true"
  [virtualScrollItemSize]="38" optionLabel="name"  formControlName="semYearCtrl" [editable]="true"
  [showClear]="true" placeholder="Select Semester/Year">
  </p-dropdown> 
  </div>
  </div>
  <br>
  <br>
  <div class="row">
  <div class="col-md-6">
  <button pButton pRipple label="Save" (click)="saveCollegeDetails()" class="p-button-success"></button>
  </div>
  </div>  
  </form>
  </div>
  </p-card>
  `,
  styles: [
  ],
  providers: [MessageService]
})
export class CollegeDetailsComponent implements OnInit {
  collegeList: any[] = [];
  collegeCourse: any[] = [];
  semYear: any[] = [];
  user_id: any;
  token: any;
  data: any;
  // CollegeDetails: FormGroup
  file: File;
  selectedCollege: any;

  CollegeDetails: FormGroup = new FormGroup({
    courseNameCtrl: new FormControl(''),
    semYearCtrl: new FormControl(''),
    collegeNameCtrl: new FormControl(''), 
  }) 

  constructor(protected api: ApiService, public ref: DynamicDialogRef, private fb: FormBuilder, public config: DynamicDialogConfig,private messageService: MessageService) {
    
    this.data = config.data;

    // this.CollegeDetails = this.fb.group({ 
    //   courseNameCtrl: ['', Validators.required],
    //   semYearCtrl: ['', Validators.required],
    //   collegeNameCtrl: ['', Validators.required]
    // }); 
    

  }
  ngOnInit() {
     
    // this.CollegeDetails.setValue({
    //   collegeNameCtrl:"Vivek College of Commerce, Goregaon",
    //   semYearCtrl:"hgfhfd",
    //   courseNameCtrl:"jhgjkhwekjhfe"

    // })

    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;

    this.getData_CollegeList();

    this.getData_CourseList();

    this.getData_SemYear();
    
  }

  
            
  getData_CollegeList(){
    this.api.getCollegeLists().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });
  }     
                                         
  getData_CourseList(){
    this.api.getFacultyLists().subscribe((data: any) => {
      if ((data) as any['data'] != undefined) {
        const datacourse: any[] = data['data']
        datacourse.forEach((element: any) => {
          this.collegeCourse.push(element)
        })
      }
    })
  }

  getData_SemYear(){
    this.semYear = [
      { name: 'Semester 1', value: 'Semester' },
      { name: 'Semester 2', value: 'Semester' },
      { name: 'Semester 3', value: 'Semester' },
      { name: 'Semester 4', value: 'Semester' },
      { name: 'Semester 5', value: 'Semester' },
      { name: 'Semester 6', value: 'Semester' },
      { name: '1st Year', value: 'Annual' },
      { name: '2nd Year', value: 'Annual' },
      { name: '3rd Year', value: 'Annual' },
    ]
  }

/**
 * 
 */
                          
                                                         
  saveCollegeDetails() {

    this.file = this.data.fileInput
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('college', this.CollegeDetails.controls['collegeNameCtrl'].value['id'])
    formData.append('faculty', this.CollegeDetails.controls['courseNameCtrl'].value['faculty']);
    formData.append('degree', this.CollegeDetails.controls['courseNameCtrl'].value['degree']);
    formData.append('semYear', this.CollegeDetails.controls['semYearCtrl'].value['name']);
    formData.append('semYearValue', this.CollegeDetails.controls['semYearCtrl'].value['value']);
    formData.append('user_id', this.user_id)

    this.api.saveUserMarkList(formData).subscribe((data: any) => { 

      if (data['status'] == 200) {
        console.log("status", data['status']);
        this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Uploaded Successfully!' }); 
      }
    })
  }
}
