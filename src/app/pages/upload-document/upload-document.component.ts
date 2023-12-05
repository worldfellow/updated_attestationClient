import { Component, OnInit, VERSION, Input, ViewChild ,Output,ChangeDetectorRef} from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageViewComponent } from '../dailogComponents/image-view.component';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/auth.service';
import { Token } from '@angular/compiler';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { createWorker } from 'tesseract.js';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { CollegeDetailsComponent } from '../dailogComponents/college-details.component';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { TranscriptDailogComponent } from '../dailogComponents/transcript-dailog.component';
import { CompetencyDailogComponent } from '../dailogComponents/competency-dailog.component';
import { ShowPreviewComponent } from '../show-preview/show-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { LettersFormComponent } from '../dailogComponents/letters-form.component';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class UploadDocumentComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup: any;
  @Output() selectedTabChange: EventEmitter<number>;

  selectedTab: string = 'educationalDetails_marksheet'; // Initialize to the default tab
  selectedTab_educationalDetails: string = 'educationalDetails';
  selectedTab_instructionalField: string = 'instructionalField';
  selectedTab_affiliation: string = 'affiliation';
  selectedTab_curriculum: string = 'curriculum';
  selectedTab_gradToPer: string = 'CompetencyLetter';
  selectedTab_CompetencyLetter: string = 'LetterforNameChange';
  selectedTab_LetterforNameChange: string = 'NameChangeProof'; // Initialize to the default tab

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  ref: DynamicDialogRef;
  position: string;
  status: string;
  user_id: any;
  transcriptdata: any;
  user_name: any;
  token: any;
  readonly: boolean = false;
  updateButton: boolean = false;
  file_name = [];
  curr_college: any;
  curr_filename: any;
  collegeList: any[] = [];
  collegeCourse: any[] = [];
  validateUploadOne: boolean = true;
  markListUploadUrl = environment.markListUploadUrl;
  transUploadUrl = environment.transUploadUrl;
  curriculumUploadUrl = environment.curriculumUploadUrl;
  NameChangeLetterUrl = environment.NameChangeLetterUrl;
  CompetencyletterUploadUrl = environment.CompetencyletterUploadUrl;
  namechangeletterdetails: any;
  selectedCollege: any;
  app_id_namechange: any;
  division: any[] = [];
  name = 'Angular ' + VERSION.major;
  isReady: boolean;
  imageChangedEvent: any;
  base64Image: any;
  ocrResult: string;
  croppedImage: any = '';
  isScanning: boolean;
  // file : any;
  croppedFile: any;
  fileNmae: any;
  fileUploaded: File;
  fgdfg: any;
  uploadForm: FormGroup;
  file: File;
  myfile: File;
  croppedresult: any;
  height: number;
  width: number;
  marksheets: any = [];
  transcripts: any = [];
  competencyData: any = [];

  LetterforNameChangeform: FormGroup = new FormGroup({
    firstNameMarksheetCtrl: new FormControl('', Validators.required),
    fatherNameMarksheetCtrl: new FormControl('', Validators.required),
    motherNameMarksheetCtrl: new FormControl('', Validators.required),
    lastNameMarksheetCtrl: new FormControl('', Validators.required),
    firstNamePassportCtrl: new FormControl('', Validators.required),
    fatherNamePassportCtrl: new FormControl('', Validators.required),
    lastNamePassportCtrl: new FormControl('', Validators.required),
    fileInputCtrl: new FormControl('', Validators.required),
  });
  app_id: any;
  collegeData: any = [];
  collegeDatad: any;
  collegeCount: any;
  transcriptDisplay: any;
  uniqueCollegeName: any;
  extraData: any;
  gradtoper: any;
  instructionalField: any;
  affiliation: any;
  educationalDetails: any;
  CompetencyLetter: any;
  curriculum: any;
  gradToPer: any;
  LetterforNameChange: any;
  curriculumData: any = [];
  tabcheck1: any;
  tabcheck2: any;
  tabcheck3: any;
  tabcheck4: any;
  tabcheck5: any;
  tabcheck6: any;
  tabcheck7: any;
  tabcheck8: any;
  stepper: any;
  id: any;
  letterDetails: any;
  insDegree: any;
  affDegree: any;
  bachelorsIns: any;
  mastersIns: any;
  phdIns: any;
  selectedDegree: string = '';
  insData: any;
  bachelorsAff: any;
  mastersAff: any;
  phdAff: any;
  thesisPhd: any;
  topicChangePhd: any;
  phd: any;
  convocationDisplay: any;
  convocationData: any;

  constructor(
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    protected api: ApiService,
    private messageService: MessageService,
    private dialogService: DialogService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.initialize();

    this.api.getAppliedUserDetail().subscribe((data: any) => {
      if (data['status'] == 200) {
        const userApplied = (data as any)['data'];
        this.instructionalField = userApplied.instructionalField;
        this.affiliation = userApplied.affiliation;
        this.educationalDetails = userApplied.educationalDetails;
        this.CompetencyLetter = userApplied.CompetencyLetter;
        this.curriculum = userApplied.curriculum;
        this.gradToPer = userApplied.gradToPer;
        this.LetterforNameChange = userApplied.LetterforNameChange;
        this.phd = userApplied.isphd;
        this.cdr.detectChanges(); // Manually trigger change detection after updating properties
      }
    });
  }

  ngOnInit() {
    this.app_id = this.route.snapshot.queryParamMap.get('app_id');
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.uploadForm = this.fb.group({
      fileInputCtrl: ['', Validators.required],
      collegeId: [''],
    });

    this.api.getAppliedUserDetail().subscribe((data: any) => {
      const userApplied = (data as any)['data'];
      this.instructionalField = userApplied?.instructionalField;
      this.affiliation = userApplied?.affiliation;
      this.educationalDetails = userApplied?.educationalDetails;
      this.CompetencyLetter = userApplied?.CompetencyLetter;
      this.curriculum = userApplied?.curriculum;
      this.gradToPer = userApplied?.gradToPer;
      this.LetterforNameChange = userApplied?.LetterforNameChange;
      this.phd = userApplied?.isphd;
      this.cdr.detectChanges(); // Manually trigger change detection after updating properties
    });

    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_id = this.token.data.user.user_id;
    this.getNameChangeData();
    // this.api.getNameChangeData().subscribe((data) => {
    //     console.log( "aaaaaaaaaaaaaaa");
    //   this.namechangeletterdetails = (data as any)['data'];
    //   if (this.namechangeletterdetails) {
    //             console.log('bbbbbbbbbbbbbbbbb');
    //     this.file_name = (data as any)['filename'];
    //     console.log("*ngf=file_name",this.file_name);
    //     this.app_id_namechange = this.namechangeletterdetails
    //       ? this.namechangeletterdetails.app_id
    //       : null;
    //     this.LetterforNameChangeform.patchValue({
    //       firstNameMarksheetCtrl:
    //         this.namechangeletterdetails.firstnameaspermarksheet,
    //       fatherNameMarksheetCtrl:
    //         this.namechangeletterdetails.fathersnameaspermarksheet,
    //       motherNameMarksheetCtrl:
    //         this.namechangeletterdetails.mothersnameaspermarksheet,
    //       lastNameMarksheetCtrl:
    //         this.namechangeletterdetails.lastnameaspermarksheet,
    //       firstNamePassportCtrl:
    //         this.namechangeletterdetails.firstnameasperpassport,
    //       fatherNamePassportCtrl:
    //         this.namechangeletterdetails.fathersnameasperpassport,
    //       lastNamePassportCtrl:
    //         this.namechangeletterdetails.lastnameasperpassport,
    //     });
    //   }
    // });
    this.api.getFacultyLists().subscribe((data: any) => {
      if ((data as any['data']) != undefined) {
        const datacourse: any[] = data['data'];
        datacourse.forEach((element: any) => {
          this.collegeCourse.push(element);
        });
      }
    });

    this.division = [
      { name: 'Distinction' },
      { name: 'First Class' },
      { name: 'Second Class' },
      { name: 'Third Class' },
    ];

    this.api.getCollegeLists().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });
    this.getLettersDetails();
    this.refresh();
    this.checkStepper();
  }

  /** Get Data of Instructional and Affiliation letter forms through Api */
  getLettersDetails() {
    this.api.getletterDetails().subscribe((data: any) => {
      this.letterDetails = data;
      this.insDegree = Object.keys(data?.dataInstructional).filter(
        (key) => Object.keys(data?.dataInstructional[key]).length > 0
      );
      this.affDegree = Object.keys(data?.dataAffiliation).filter(
        (key) => Object.keys(data?.dataAffiliation[key]).length > 0
      );
      this.bachelorsIns =
        data?.dataInstructional?.bachelors[0]?.instructionalDetails;
      this.mastersIns =
        data?.dataInstructional?.masters[0]?.instructionalDetails;
      this.phdIns = data?.dataInstructional?.phd[0]?.instructionalDetails;
      this.bachelorsAff =
        data?.dataAffiliation?.bachelors[0]?.affiliationDetails;
      this.mastersAff = data?.dataAffiliation?.masters[0]?.affiliationDetails;
      this.phdAff = data?.dataAffiliation?.phd[0]?.affiliationDetails;

      this.cdr.detectChanges(); // Manually trigger change detection after updating properties
    });
  }

  getNameChangeData() {
    this.api.getNameChangeData().subscribe((data) => {
      this.namechangeletterdetails = (data as any)['data'];
      if (this.namechangeletterdetails?.firstnameaspermarksheet) {
        this.file_name = (data as any)['filename'];
        this.app_id_namechange = this.namechangeletterdetails
          ? this.namechangeletterdetails.app_id
          : null;
        this.LetterforNameChangeform.patchValue({
          firstNameMarksheetCtrl:
            this.namechangeletterdetails.firstnameaspermarksheet,
          fatherNameMarksheetCtrl:
            this.namechangeletterdetails.fathersnameaspermarksheet,
          motherNameMarksheetCtrl:
            this.namechangeletterdetails.mothersnameaspermarksheet,
          lastNameMarksheetCtrl:
            this.namechangeletterdetails.lastnameaspermarksheet,
          firstNamePassportCtrl:
            this.namechangeletterdetails.firstnameasperpassport,
          fatherNamePassportCtrl:
            this.namechangeletterdetails.fathersnameasperpassport,
          lastNamePassportCtrl:
            this.namechangeletterdetails.lastnameasperpassport,
        });
      }
    });
  }

  uploadfun(event: any) {
    if (event.files && event.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.croppedImage = event.files[0];
      this.base64Image = event.files[0];
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {};
    }

    this.base64Image = event.files[0];
    this.imageChangedEvent = event;
  }
  async initialize(): Promise<void> {}

  handleFileInput(
    event: any,
    type: any,
    course_name: any,
    college: any,
    collegeid: any,
    faculty: any,
    education_type: any,
    pattern: any
  ): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.fileUploaded = event.target.files[0];
      this.base64Image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {};
    }
    console.log(
      'datatatattatatta',
      type,
      course_name,
      college,
      collegeid,
      faculty,
      education_type,
      pattern
    );

    this.showEditPreview(
      type,
      course_name,
      college,
      collegeid,
      faculty,
      education_type,
      pattern
    );
  }

  showEditPreview(
    type: any,
    course_name: any,
    college: any,
    collegeid: any,
    faculty: any,
    education_type: any,
    pattern: any
  ) {
    const dialogRef = this.dialog
      .open(ShowPreviewComponent, {
        data: {
          user_id: this.user_id,
          base64Image: this.base64Image,
          imageChangedEvent: this.imageChangedEvent,
          type: type,
          course_name: course_name,
          college: college,
          collegeid: collegeid,
          faculty: faculty,
          education_type: education_type,
          pattern: pattern,
        },
      })
      .afterClosed()
      .subscribe((result) => {
        this.refresh();
        this.getNameChangeData();
        this.id = result;
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.height = event.height;
    this.width = event.width;
  }
  dataurl(croppedFile: any, name: any) {
    const base64String = croppedFile.split(',')[1]; // Extract the base64 string from the data URI

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
    const blob = new Blob(byteArrays, { type: 'image/jpeg' });
    return new File([blob], name, { type: blob.type });
  }

  uploadDetails(
    event: any,
    type: any,
    coursename: any,
    collegename: any,
    collegeid: any,
    faculty: any,
    education_type: any,
    patteren: any
  ) {
    console.log('uploadDetails');
    const fileUrl = this.dataurl(this.croppedImage, '11.jpeg');
    if (type == 'marklist') {
      this.ref = this.dialogService.open(CollegeDetailsComponent, {
        data: {
          fileInput: fileUrl,
          type: type,
        },
        header: 'College Details',
        width: '70%',
        height: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
      });
      this.ref.onClose.subscribe(() => {
        this.refresh();
        this.messageService.add({
          severity: 'info',
          summary: 'Error',
          detail: 'Details Saved Successfully!',
        });
      });
    } else {
      this.file = fileUrl;
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user_id', this.user_id);
      var data = [];
      this.api
        .ScanData(this.app_id, type, null, null, null, null, formData)
        .subscribe((data: any) => {
          if (data['status'] == 200) {
            this.base64Image = false;
            this.refresh();
            // this.ref.close();
          } else {
            this.refresh();
          }
        });
    }
  }

  onBasicUploadAuto(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }
  onUpload(event: any) {
    const reader = new FileReader();
    this.position = 'top-right';
    this.status = 'success';
    if (event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);
      var yourStatus = event.originalEvent.status;
      if (yourStatus == 200) {
        this.status = 'success';
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: 'File Uploaded Successfully !',
        });
      } else if (yourStatus == 401) {
        this.status = 'error';
      } else if (yourStatus == 400) {
        this.status = 'error';
      }
    }
  }

  deleteDocument(id: any, type: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this document?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api
          .deleteDocument(id, type, this.user_id)
          .subscribe((data: any) => {
            if (data['status'] == 200) {
              this.messageService.add({
                severity: 'info',
                summary: 'Error',
                detail: 'Data Deleted !',
              });
              this.refresh();
              this.getNameChangeData();
            } else {
            }
          });
      },
    });
  }

  /**imageView function to view the uploaded document by user itself */
  imageView(filepath: any, extension: any) {
    console.log('filepath: ', filepath);
    console.log('extension: ', extension);

    this.ref = this.dialogService.open(ImageViewComponent, {
      data: {
        imgType: extension,
        imgName: filepath,
      },
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
  }

  /**deleteInfo function to delete the form of instructional,affiliation and letterfor namechange*/
  deleteInfo(type: any, doc_id: any) {
    console.log('type', type);
    console.log('doc_id', doc_id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this Data?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteInfo(type, doc_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.messageService.add({
              severity: 'info',
              summary: 'Error',
              detail: 'Data Deleted !',
            });
            this.readonly = false;
            this.getLettersDetails();
            this.getNameChangeData();
            // this.ngOnInit();
          } else {
          }
        });
      },
    });
  }
  editLetter() {
    this.readonly = false;
    this.updateButton = true;
  }
  saveLetter(id: string) {
    var data: any = {
      firstNameMarksheetCtrl:
        this.LetterforNameChangeform.controls['firstNameMarksheetCtrl'].value,
      fatherNameMarksheetCtrl:
        this.LetterforNameChangeform.controls['fatherNameMarksheetCtrl'].value,
      motherNameMarksheetCtrl:
        this.LetterforNameChangeform.controls['motherNameMarksheetCtrl'].value,
      lastNameMarksheetCtrl:
        this.LetterforNameChangeform.controls['lastNameMarksheetCtrl'].value,
      firstNamePassportCtrl:
        this.LetterforNameChangeform.controls['firstNamePassportCtrl'].value,
      fatherNamePassportCtrl:
        this.LetterforNameChangeform.controls['fatherNamePassportCtrl'].value,
      lastNamePassportCtrl:
        this.LetterforNameChangeform.controls['lastNamePassportCtrl'].value,
      id: id,
    };
    console.log('gdfhfdh', this.LetterforNameChangeform);
    if (this.LetterforNameChangeform.valid) {
      console.log('aaaaaaaaaaaaa', data);
      this.api.saveNameChangedata(data).subscribe((data: any) => {
        if (data['status'] == 200) {
          console.log('status', data['status']);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Letter Data Saved Successfully!!!',
          });
          this.getNameChangeData();
          this.readonly = true;
          this.updateButton = false;
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid Form Fields',
      });
      console.log('kkkkkkkkkkkkkkkkkkkk', data);
    }
  }

  // upload curriculum selected college
  onCollegeChange(event: any) {
    this.selectedCollege = event.value.id;
    console.log('aaaaaa', this.selectedCollege);
    if (
      this.selectedCollege != null ||
      this.selectedCollege != undefined ||
      this.selectedCollege != '' ||
      this.selectedCollege != 'undefined'
    ) {
      this.validateUploadOne = false;
    }
  }

  refresh() {
    this.api.getUploadedDocuments(this.app_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.marksheets = data['data'][0];
        this.transcripts = data['data'][1];
        this.transcriptDisplay = data['data'][2];
        this.uniqueCollegeName = data['data'][3];
        this.extraData = data['data'][4];
        this.curriculumData = data['data'][5];
        this.gradtoper = data['data'][6];
        this.thesisPhd = data['data'][7];
        this.topicChangePhd = data['data'][8];
        this.convocationDisplay = data['data'][9];
        this.convocationData = data['data'][10];
        this.competencyData = data['data'][11]; 

        this.cdr.detectChanges(); // Manually trigger change detection after updating properties
      }
    });
  }

  checkStepper() {
    this.api.checkStepperInner(this.app_id).subscribe((response: any) => {
      this.selectedTab = response['data'];
      this.tabcheck1 = response['step'].tab1;
      this.tabcheck2 = response['step'].tab2;
      this.tabcheck3 = response['step'].tab3;
      this.tabcheck4 = response['step'].tab4;
      this.tabcheck5 = response['step'].tab5;
      this.tabcheck6 = response['step'].tab6;
      this.tabcheck7 = response['step'].tab7;
      this.tabcheck8 = response['step'].tab8;


      // If all the values are true it will redirect to Name Change Tab
      let tabs = ['tab1', 'tab2', 'tab3' , 'tab4', 'tab5', 'tab6', 'tab7', 'tab8'];
      let allTrue = false;
      for (let i = 0; i < tabs.length; i++) {
        if (response['step'][tabs[i]] === false) {
            allTrue = true
        }
      }
      if(allTrue == false){
        this.selectedTab = 'tab9'
      }
    });
  }

  myTabSelectedIndexChange(index: any) {}
  /**
   * Competency Letter
   */

  uploadMoreCompetency() {
    this.ref = this.dialogService.open(CompetencyDailogComponent, {
      header: 'Add More Document',
      width: '50%',
      height: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Document Uploaded Succesfully !',
        });
      } else {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Document Not Uploaded !',
        });
      }
    });
  }

  /**
   * Transcripts Letter
   */
  uploadMoreTranscript() {
    this.ref = this.dialogService.open(TranscriptDailogComponent, {
      header: 'Add More Document',
      width: '50%',
      height: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Document Uploaded Succesfully !',
        });
      } else {
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Document Not Uploaded !',
        });
      }
    });
  }

  /**Add Instructional and Affiliation Details */

  addForm(type: string) {
    console.log('type', type);

    const formName =
      type === 'instructional' ? 'Instructional Form' : 'Affiliation Form';

    this.ref = this.dialogService.open(LettersFormComponent, {
      data: {
        type: type,
      },
      header: formName,
      width: '50%',
      height: '49%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: data,
        });
        this.getLettersDetails();
      }
    });
  }

  /**Edit Instructional and Affiliation Details  */

  editForm(type: string, data: any) {
    console.log('type', type);
    console.log('data', data);

    const formName =
      type === 'instructional' ? 'Instructional Form' : 'Affiliation Form';

    this.ref = this.dialogService.open(LettersFormComponent, {
      data: {
        type: type,
        insData: data,
      },
      header: formName,
      width: '50%',
      height: '49%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false,
    });
    this.ref.onClose.subscribe((data: any) => {
      if (data !== undefined) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: data,
        });
        this.getLettersDetails();
      }
    });
  }
}
