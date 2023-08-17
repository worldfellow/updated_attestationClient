import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageViewComponent } from '../dailogComponents/image-view.component';

@Component({
  selector: 'app-preview-application',
  templateUrl: './preview-application.component.html',
  styleUrls: ['./preview-application.component.css'],
  providers: [DialogService]
})
export class PreviewApplicationComponent {
  token: any;
  user_id: any;
  user_mobile_number: any;
  user_name: any;
  user_mobile_country_code: any;
  user_email: any;
  user_surname: any;
  preViewApplication: any;
  education_details: any = '';
  college_data: any;
  marksheets_data: any = '';
  transcripts_data: any = '';
  curriculum_data: any = '';
  gradtoper_data: any = '';
  affiliation_data: any = '';
  competency_data: any = '';
  letterfornamechange_data: any = '';
  instructional_data: any = '';
  preViewData: any;
  allTabsOpen: boolean;
  allTabsIndices: number[];
  ref: DynamicDialogRef;

  constructor(
    private router: Router,
    protected api: ApiService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_name = this.token.data.user.user_name;
    this.user_surname = this.token.data.user.user_surname;
    this.user_email = this.token.data.user.user_email;
    this.user_mobile_number = this.token.data.user.user_mobile;
    this.user_mobile_country_code = this.token.data.user.mobile_country_code;
    console.log(this.user_id);

    this.api.preViewApplication().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.education_details = data['data'][0].educationalDetails[0];
        this.college_data = data['data'][0].collegeData;
        this.marksheets_data = data['data'][0].marksheetsData;
        this.transcripts_data = data['data'][0].transcriptsData;
        this.instructional_data = data['data'][0].instructionalData;
        this.curriculum_data = data['data'][0].curriculumData;
        this.gradtoper_data = data['data'][0].gradtoperData;
        this.affiliation_data = data['data'][0].affiliationData;
        this.competency_data = data['data'][0].competencyData;
        this.letterfornamechange_data = data['data'][0].letterfornamechangeData;

        console.log("######################", data['data'].length);

        //p accordian bydefault visible
        this.allTabsOpen = true;

        // Set the array of all tab indices based on the number of tabs you have
        this.allTabsIndices = Array.from({ length: data['data'].length }, (_, index) => index);
      } else {
        console.log('Data not found!');
      }
    })

    //get all institute purpose data to display on page
    this.api.getCartDetails(this.user_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.preViewData = data['data'];
        console.log('this.preViewData---------->', this.preViewData);
      } else {
        console.log('Data not found!');
      }
    })
  }

  dismiss() {
    this.router.navigate(['pages/purpose']);
  }

  openImgPdf(filepath: any, extension: any, filename: any) {
    this.ref = this.dialogService.open(ImageViewComponent, {
      data: {
        imgType: extension,
        imgName: filepath,
      },
      header: filename,
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  viewCart() {
    this.router.navigate(['pages/cart']);
  }

  viewPurpose(){
    this.router.navigate(['pages/attestation_page']);
  }
}
