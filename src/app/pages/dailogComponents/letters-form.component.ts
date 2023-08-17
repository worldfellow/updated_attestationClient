import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-letters-form',
  template: `
  <form [formGroup]="addForm"  >
  <div class="form">
    <div class="row pt-4">
      <div class="col-md-3">
        <label>Name</label><br>
        <input pInputText class="p-inputtext-sm" placeholder="First Name"  
        formControlName="name" />
      </div>
      <div class="col-md-4">
        <label>Select College</label><br>
        <p-dropdown [options]="collegeList" class="p-inputtext-sm"
          (onChange)="onCollegeChange($event)" formControlName="college"
          [virtualScroll]="true" [virtualScrollItemSize]="38" optionLabel="name" [filter]="true"
          filterBy="name"   placeholder="Select a CollegeName" [editable]="true">
        </p-dropdown>
      </div>

      <div class="col-md-4" style="padding-left: 70px;">
        <label>Course</label><br>
        <p-dropdown [style]="{'width':'15rem'}" [options]="collegeCourse" class="p-inputtext-sm"
         (onChange)="onCollegeChange($event)"  formControlName="courses"
          [virtualScroll]="true" [virtualScrollItemSize]="38" optionLabel="full_name"  
            placeholder="Select a Course" [editable]="true">
        </p-dropdown>
      </div>
    </div> 
    <div class="row pt-4">
      <div class="col-md-3">
        <label>Specialization</label><br>
        <input pInputText class="p-inputtext-sm" placeholder="Specialization"  
        formControlName="specialization" />
      </div>
      <div class="col-md-4">
        <label>Division/class</label><br>
        <p-dropdown [style]="{'width':'15rem'}" [options]="division" class="p-inputtext-sm"
         [virtualScroll]="true" formControlName="division"
          [virtualScrollItemSize]="30" optionLabel="name"   [editable]="true"  
          placeholder="Select a Division">
        </p-dropdown>
      </div>

      <div class="col-md-4" style="padding-left: 70px;">
        <label>Duration of Course</label><br>
        <input pInputText class="p-inputtext-sm" placeholder="Duration of Course" type="number"  
        formControlName="duration" />
      </div>
    </div> 
    <div class="row pt-4">
      <div class="col-md-4">
        <label>Year of Passing</label><br>
        <input pInputText placeholder="Year" class="p-inputtext-sm"  
        formControlName="yearOfPassing"  />
      </div> 
    </div> 
    <div class="row pt-4">
    <div class="col-md-4">
    <p-button label="Save" (click)="saveFormData()" styleClass="p-button-raised p-button-success"></p-button>
      </div>
      </div>
  </div>
</form>
<p-toast></p-toast>
  `,
  styles: [
  ],
  providers: [
    MessageService,
  ]
})
export class LettersFormComponent {

  collegeList: any[] = [];
  collegeCourse: any[] = [];
  division: any[] = [];
  selectedCollege: any;
  validateUploadOne: boolean = true;
  addForm: FormGroup;
  data: any;
  formData: any;

  @Output() notesSaved = new EventEmitter<any>();
  constructor(
    protected api: ApiService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.data = config.data;
  }

  ngOnInit() {

    /**get college list */
    this.api.getCollegeLists().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });
    /**get courselist */
    this.api.getFacultyLists().subscribe((data: any) => {
      if ((data) as any['data'] != undefined) {
        const datacourse: any[] = data['data']
        datacourse.forEach((element: any) => {
          this.collegeCourse.push(element)
        })
      }
    })
    /**class or division */
    this.division = [
      { name: 'Distinction' },
      { name: 'First Class' },
      { name: 'Second Class' },
      { name: 'Third Class' }
    ];

    this.initForm();
    this.formData = this.data.insData;
    if (this.formData != undefined) {
      /**Patch the value of form */
      this.addForm.patchValue({
        name: this.formData.studentName,
        college: this.formData.collegeName,
        courses: this.formData.courseName,
        specialization: this.formData.specialization,
        division: this.formData.division,
        duration: this.formData.duration,
        yearOfPassing: this.formData.yearofpassing,
      })
    }
  }


  private initForm() {
    this.addForm = this.fb.group({
      idCtrl: [],
      name: ['', Validators.required],
      college: ['', Validators.required],
      courses: ['', Validators.required],
      specialization: ['', Validators.required],
      division: ['', Validators.required],
      duration: ['', Validators.required],
      yearOfPassing: ['', Validators.required],
    });
  }

  /**onCollegeChange function to get data of selected college */
  onCollegeChange(event: any) {
    this.selectedCollege = event.value.id;
    if (this.selectedCollege != null || this.selectedCollege != undefined || this.selectedCollege != '' || this.selectedCollege != 'undefined') {
      this.validateUploadOne = false
    }
  }

  /**saveFormData function to save the data of instructional and affiliation form */
  saveFormData() {
    if (this.addForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Fill All Details Properly!' });
    } else {
      const formData = {
        idCtrl: this?.formData?.id,
        name: this.addForm.controls['name'].value,
        college: this.addForm.controls['college'].value['name'] || this.addForm.controls['college'].value,
        course: this.addForm.controls['courses'].value['full_name'] || this.addForm.controls['courses'].value,
        specialization: this.addForm.controls['specialization'].value,
        division: this.addForm.controls['division'].value['name'] || this.addForm.controls['division'].value,
        duration: this.addForm.controls['duration'].value,
        yearOfPassing: this.addForm.controls['yearOfPassing'].value,
        type: this.data.type,
        education: this.addForm.controls['courses'].value['degree']
      };
      this.api.saveInstructionalData(formData).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.notesSaved.emit(data['message']);
          this.ref.close(data['message']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Details Not Updated!' });
        }
      });
    }
  }
}
