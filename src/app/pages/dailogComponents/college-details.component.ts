import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


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
  [options]="collegeList"  [virtualScroll]="true" formControlName="collegeNameCtrl" [(ngModel)]="collegeName"
  [virtualScrollItemSize]="30" optionLabel="name" [editable] = true [filter]="true" filterBy="name" [showClear]="true"
  placeholder="Select a CollegeName">
  </p-dropdown>
  </div>
  <div class="col-md-6">
  <p-dropdown  [style]="{'width':'25rem'}"
  [options]="collegeCourse"  [virtualScroll]="true" formControlName="courseNameCtrl" [(ngModel)]="courseName"
  [virtualScrollItemSize]="30" optionLabel="full_name" [editable] = true [filter]="true" filterBy="full_name" [showClear]="true"
  placeholder="Select a CollegeName">
  </p-dropdown>
  </div>
  </div>
  <br><br>
  <div class="row">
  <div class="col-md-3">
  <p-dropdown [style]="{'width':'15rem'}" [options]="semYear" class="p-inputtext-sm" [virtualScroll]="true" [(ngModel)]="patteren"
  [virtualScrollItemSize]="38" optionLabel="name" [editable] = true formControlName="semYearCtrl"
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
  CollegeDetails: FormGroup
  file: any;
  collegeId: number;
  courseId: number;
  collegeName: any ='';
  courseName: any= '';
  patteren: any;
  app_id: any;
  documentId: any;
  type: any;

  constructor(protected api: ApiService, public ref: DynamicDialogRef, private fb: FormBuilder, public config: DynamicDialogConfig,private messageService: MessageService,private route : ActivatedRoute) {
    this.data = config.data;
    this.CollegeDetails = this.fb.group({ 
      courseNameCtrl: ['', Validators.required],
      semYearCtrl: ['', Validators.required],
      collegeNameCtrl: ['', Validators.required]
    });

  }
  ngOnInit() { 
    this.app_id = this.route.snapshot.queryParamMap.get('app_id');
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.type = this.data.type;
    this.getData_CollegeList();

    this.getData_CourseList();

    this.getData_SemYear();

    this.ScanData();
    
  }

  getData_CollegeList(){
    this.api.getCollegeLists().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        console.log('inside offff')
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });
  }     
  ScanData(){
    this.file = this.data.fileInput
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('user_id', this.user_id);
    console.log('sssssssssssss' ,formData)
    this.api.ScanData('','','','',this.app_id,this.user_id,this.type,formData).subscribe((data: any) => {
      
      if (data['status'] == 200) {
        this.collegeName = data['data'][0];
        this.courseName = data['data'][1];
        this.patteren = data['data'][2];
        this.documentId = data['data'][3];
        this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Uploaded Successfully!' });
         this.CollegeDetails.patchValue({
          collegeNameCtrl: this.collegeName[0],
          semYearCtrl : this.patteren[0],
          courseNameCtrl : this.courseName[0]
         })
      }else if(data['status'] == 401){
        // this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Change your delivery Type' });
        this.ref.close(401)
      }else{
        this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Kindly Upload Proper Documents which are visible' });
      }
    })
  }
  getData_CourseList(){
    this.api.getFacultyLists().subscribe((data: any) => {
      if ((data) as any['data'] != undefined) {
        const datacourse: any[] = data.data
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

  saveCollegeDetails() {
    console.log('eeeeeeeeeeee')
    console.log('this.CollegeDetails' ,this.CollegeDetails.value)
    var data=[];
    data.push({'collegeId' : this.CollegeDetails.controls['collegeNameCtrl'].value['id'] , 'faculty' :this.CollegeDetails.controls['courseNameCtrl'].value['faculty']
    , 'degree' : this.CollegeDetails.controls['courseNameCtrl'].value['degree'],'patteren' : this.CollegeDetails.controls['semYearCtrl'].value,'user_id' : this.user_id})

    this.api.saveUserMarkList(this.documentId,this.app_id,this.user_id,this.type,data).subscribe( (data: any) => {
      if (data['status'] == 200) {
        this.ref.close();
      }else if(data['status'] == 401){
        this.ref.close(401)

      }else{
        this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Details Not Updated!' });
      }
    })
  }


}
