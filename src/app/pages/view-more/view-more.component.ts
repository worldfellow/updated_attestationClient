import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { AddDocumentByAdminComponent } from '../dialog/add-document-by-admin/add-document-by-admin.component';
import { OpenImgPdfDialogComponent } from '../dialog/open-img-pdf-dialog/open-img-pdf-dialog.component';
import { UpdateInstructionalAffiliationComponent } from '../dialog/update-instructional-affiliation/update-instructional-affiliation.component';
import { AddInstitutionDialogComponent } from '../dialog/add-institution-dialog/add-institution-dialog.component';
import { AddHrdDialogComponent } from '../dialog/add-hrd-dialog/add-hrd-dialog.component';
import { config } from 'config';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class ViewMoreComponent {
  uploadForm: FormGroup;
  studentData: any;
  student_id: void;
  token: any;
  user_id: any;
  user_name: string;
  displayName: boolean;
  displayLocation: boolean;
  panelOpenState: boolean = false;
  student_app_id: any;
  marksheetsData: any[] = [];
  transcriptsData: any[] = [];
  curriculumData: any[] = [];
  gradtoperData: any[] = [];
  competencyData: any[] = [];
  letterfornamechangeData: any[] = [];
  instructionalData: any[] = [];
  affiliationData: any[] = [];
  namechangeproofData: any[] = [];
  trackerData: any[] = [];
  trackerLength: any;
  filterText: string = "";
  instituteData: any[] = [];
  hrdData: any[] = [];
  serverUrl = config.serverUrl;
  imageChangedEvent: any;
  base64Image: any;
  fileUploaded: any;
  croppedImage: any = "";
  fgdfg: any;
  fileInputCtrl: FormControl;
  height: number;
  width: number;

  constructor(
    protected api: ApiService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialog: MatDialog,
    private fb: FormBuilder,
  ) {
    // this.fileInputCtrl = new FormControl
  }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.user_name = this.token.data.user.user_name + ' ' + this.token.data.user.user_surname;

    this.route.queryParams.subscribe(params => {
      this.student_id = params['user_id'];
      this.student_app_id = params['app_id'];
      console.log('ID:', this.student_id);
      console.log('ID:', this.student_app_id);
    });


    this.api.getStudentList(this.student_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.studentData = data['data'][0];
        console.log('students------------->', this.studentData);
      }
    })

    this.api.getDocumentsData(this.student_id, this.student_app_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.marksheetsData = data['data'][0].marksheetsData;
        this.transcriptsData = data['data'][0].transcriptsData;
        this.curriculumData = data['data'][0].curriculumData;
        this.gradtoperData = data['data'][0].gradtoperData;
        this.competencyData = data['data'][0].competencyData;
        this.letterfornamechangeData = data['data'][0].letterfornamechangeData;
        this.instructionalData = data['data'][0].instructionalData;
        this.affiliationData = data['data'][0].affiliationData;
        this.namechangeproofData = data['data'][0].namechangeproofData;
        console.log('^^^^^^^^^^^^^^^^^^^^^', this.marksheetsData);

      }
    })

    //get all institute purpose data to display on page
    this.api.getInstituteData(this.student_app_id, '', this.student_id, '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.instituteData = data['data'];
      } else if (data['status'] == 400) {
      }
    });

    //get all hrd purpose data to display on page
    this.api.getHrdData(this.student_id, '', '', this.student_app_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.hrdData = data['data'];
        console.log('************************+++++++++++++++++++++', this.hrdData);
      }
    })

    this.api.getActivityTrackerList(this.student_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.trackerData = data['data'];
        console.log('this.trackerData***********', this.trackerData.length);
        this.trackerLength = this.trackerData.length;
      } else {
        console.log('Failed to load data!');
      }
    })

    this.uploadForm = this.fb.group({
      fileInputCtrl: ['', Validators.required],
    });
  }

  //profile tab functions
  resetPassByAdmin() {
    this.confirmationService.confirm({
      message: 'Are you sure want to reset password?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.resetPasswordByAdmin(this.studentData, this.user_id, this.user_name).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  resetDocByAdmin() {
    this.confirmationService.confirm({
      message: 'Are you sure want to reset documents?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.resetDocumentByAdmin(this.studentData, this.user_id, this.user_name).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.ngOnInit();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  namelocationChange(event: any) {
    console.log(';;;;;;;', event);
    if (event == 'name') {
      this.confirmationService.confirm({
        message: 'Are you sure want to change name?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',

        accept: () => {
          this.displayName = true;
        },

        reject: () => {
          this.confirmationService.close();
        }
      })
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure want to change location?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',

        accept: () => {
          this.displayLocation = true;
        },

        reject: () => {
          this.confirmationService.close();
        }
      })
    }
  }

  changeName(firstname: any, lastname: any, student_id: any, student_app_id: any) {
    this.displayName = false;

    this.api.changeNameByAdmin(firstname, lastname, student_id, student_app_id, this.user_id, this.user_name).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }

  selectLocation(event: any) {
    this.displayLocation = false;
    this.api.changeLocationByAdmin(this.studentData, event, this.user_id, this.user_name).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }

  //Marksheet, Transcript, Curriculum, Grade & Percentage Letter tab functions
  addDocuments() {
    const dialogRef = this.dialog.open(AddDocumentByAdminComponent, {
      data: {
        data: this.studentData,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  documentsData() {
    console.log('ssssss*******************sssssss')
    console.log('sssssssssssss', this.studentData);
  }

  openImgPdf(fileName: any, extension: any) {
    console.log('fileName', fileName);
    console.log('extention', extension);

    const dialogRef = this.dialog.open(OpenImgPdfDialogComponent, {
      data: {
        fileName: fileName,
        extension: extension,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  handleFileInput(event: any) {
    console.log('event^^^^^^^^', event);

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      console.log('reader^^^^^^^^', reader);
      this.imageChangedEvent = event;
      console.log('imageChangedEvent^^^^^^^^', this.imageChangedEvent);
      this.fileUploaded = event.target.files[0];
      console.log('fileUploaded^^^^^^^^', this.fileUploaded);
      this.base64Image = event.target.files[0];
      console.log('base64Image^^^^^^^^', this.base64Image);
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
      };
    }
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.height = event.height
    this.width = event.width
  }

  dataurl(croppedFile: any, name: any, height: number, width: number) {
    const base64String = croppedFile.split(",")[1]; // Extract the base64 string from the data URI
    const byteCharacters = atob(base64String);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: "image/jpeg" });
    return new File([blob], name, { type: blob.type });
  }

  uploadDetails() {
    const fileUrl = this.dataurl(this.croppedImage, "11.jpeg",this.height,this.width)
    // this.ref = this.dialogService.open(CollegeDetailsComponent, {
    //   data: {
    //     fileInput: this.myfile,
    //   },
    //   header: 'College Details',
    //   width: '70%',
    //   height: '50%',
    //   contentStyle: { overflow: 'auto' },
    //   baseZIndex: 10000,
    //   maximizable: true
    // });
  }

  onSelect(event: any) {
    var maxFileSize = 5000000;
  }

  onUpload(event: any) { }

  deleteDocument(data: any, type: any) {
    console.log('data----', data);

    this.confirmationService.confirm({
      message: 'Are you sure want to delete document?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.deleteDocumentByAdmin(data, this.user_id, this.user_name, this.studentData.app_id, type).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.ngOnInit();
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
          } else {
            this.ngOnInit();
            this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  //instructional & affiliation details
  updateInstructionalAffiliation(purpose: any, type: any, data: any) {
    const dialogRef = this.dialog.open(UpdateInstructionalAffiliationComponent, {
      data: {
        purpose: purpose,
        type: type,
        data: data,
        studentData: this.studentData,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //purpose

  //using this we can open AddInstitutionDialogComponent dialog box and send data using his type edit & display form
  changePurpose(institute: any, id: any, name: any, type: any) {

    const dialogRef = this.dialog.open(AddInstitutionDialogComponent, {
      data: {
        institute: institute,
        institute_id: id,
        purpose_name: name,
        function_type: type,
        student_id: this.student_id,
        student_app_id: this.student_app_id,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //using this we can open AddHrdDialogComponent dialog box and send data using his type edit & display form
  changeHrd(type: any, purpose: any, degree: any, faculty: any, hrd_id: any) {
    const dialogRef = this.dialog.open(AddHrdDialogComponent, {
      data: {
        function_type: type,
        purpose_name: purpose,
        degree_type: degree,
        faculty_type: faculty,
        hrd_id: hrd_id,
        student_id: this.student_id,
        student_app_id: this.student_app_id,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  //letter for name change
  updateLetterForNameChange() { }

  //activity tracker
  filterTable() {
    if (this.filterText) {
      this.trackerData = this.trackerData.filter((tracker: any) =>
        tracker.activity.toLowerCase().includes(this.filterText.toLowerCase()) || tracker.data.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.trackerLength = this.trackerData.length;
    } else {
      this.trackerData = this.trackerData;
    }
  }

}
