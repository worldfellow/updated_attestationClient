import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-attestation',
  templateUrl: './new-attestation.component.html',
  styleUrls: ['./new-attestation.component.css']
})
export class NewAttestationComponent implements OnInit {
  @ViewChild(MatStepper) stepper: MatStepper
  firstForm: FormGroup;

  educationalDetails: any;
  instructionalDetails: any;
  curriculumDetails: any;
  gradToPer: any;
  affiliation: any;
  CompetencyLetter: any;
  LetterforNameChange: any;
  token: any;
  phd: any;
  user_id: any;
  formdata: any;
  showButton: boolean;
  firstComplete: boolean = false;
  message: any;
  appliedData: any;
  degree: any[] = [];
  degreeselected: any;
  tabcheck1: any;
  tabcheck2: any;
  tabcheck3: any;
  app_id: string | null;
  tabcheck_inner1: any;
  tabcheck_inner2: any;
  tabcheck_inner3: any;
  instructionalField: any;
  curriculum: any;
  affiliationletter: any;

  disableStepper() {
    this.stepper.linear = false; // Disables linear navigation
    this.stepper.steps.forEach(step => step.completed = true); // Marks all steps as completed
  }

  enableStepper() {
    this.stepper.linear = true; // Enables linear navigation
    this.stepper.reset(); // Resets the stepper to the initial state
  }


  constructor(
    private router: Router,
    protected api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.token = JSON.parse(localStorage.getItem('user')!);
    this.app_id = this.route.snapshot.queryParamMap.get('app_id');
    this.user_id = this.token.data.user.user_id;

    this.firstForm = this.fb.group({
      educationalDetails: [],
      instructionalDetails: [],
      curriculumDetails: [],
      gradToPer: [],
      affiliation: [],
      CompetencyLetter: [],
      LetterforNameChange: [],
      phd: [Validators.required]
    })

    this.getUserEducation();
    if (this.firstForm.valid) {
      this.showButton = true;
    }
    this.checkStepper();
  }

  onChange(event: any) {
    this.formdata = this.firstForm.value;
    if ((this.formdata.educationalDetails == true)) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }
  getUserEducation() {

    this.api.getAppliedUserDetail().subscribe((data: any) => {
      if(data['status'] == 200){
        this.educationalDetails = data['data'].educationalDetails;
        this.instructionalDetails = data['data'].instructionalField;
        this.curriculumDetails = data['data'].curriculum;
        this.gradToPer = data['data'].gradToPer;
        this.affiliation = data['data'].affiliation;
        this.CompetencyLetter = data['data'].CompetencyLetter;
        this.LetterforNameChange = data['data'].LetterforNameChange;
        this.phd = data['data'].isphd
      }
      

    })
  }
  checkTabs(event: any) {
  }

  checkStepper() {
    this.api.checkStepper(this.app_id).subscribe((response: any) => {      
      this.tabcheck1 = response['data'].tab1
      this.tabcheck2 = response['data'].tab2
      this.tabcheck3 = response['data'].tab3

      if (this.tabcheck1 == true) {
        this.stepper.selectedIndex = 1;  
  }
    if (this.tabcheck2 == true) {
        this.stepper.selectedIndex = 2;

      }
    if (this.tabcheck3 == true) {
        this.stepper.selectedIndex = 3
      }
    })

  }
  eduDetails() {
    this.firstComplete = true;
    this.formdata = this.firstForm.value;
    this.api.addUserEducationalDetails(this.formdata, this.degreeselected).subscribe((response: any) => {
      if (response['status'] == 200) {
        this.message = response.message;
      }
    });
  }
  nextStep() {
    this.checkStepper();
    this.stepper.next();
        this.router.navigateByUrl('/UploadDocumentComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['pages/attestation_page']);
    });

  }

}
