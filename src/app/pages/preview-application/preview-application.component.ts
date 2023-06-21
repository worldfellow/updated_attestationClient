import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { OpenImgPdfDialogComponent } from '../dialog/open-img-pdf-dialog/open-img-pdf-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-application',
  templateUrl: './preview-application.component.html',
  styleUrls: ['./preview-application.component.css']
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
  education_details: any='';
  college_data: any;
  marksheets_data: any='';
  transcripts_data: any='';
  curriculum_data: any='';
  gradtoper_data: any='';
  affiliation_data: any='';
  competency_data: any='';
  letterfornamechange_data: any='';
  instructional_data: any='';
  preViewData: any;
  constructor(
    private router: Router,
    protected api: ApiService,
    public dialog: MatDialog,
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

    this.api.preViewApplication(this.user_id).subscribe((data: any) => {
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
        console.log("letterfornamechange_data",data['data'][0].letterfornamechangeData);
        
      }else{
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
    this.router.navigate(['pages/dashboard/cart']);
  }

  openImgPdf(fileName:any, extension:any){
    console.log('fileName',fileName);
    console.log('extention',extension);

    const dialogRef = this.dialog.open(OpenImgPdfDialogComponent, {
      data: {
        fileName: fileName,
        extension: extension,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
