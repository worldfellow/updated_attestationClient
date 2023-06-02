import { Component, OnInit, VERSION, Input, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageViewComponent } from '../dailog/image-view/image-view.component';
import { config } from '../../../../config';
import { AuthService } from 'src/app/auth.service';
import { Token } from '@angular/compiler';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { createWorker } from 'tesseract.js';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { CollegeDetailsComponent } from '../college-details/college-details.component'; 



@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class UploadDocumentComponent implements OnInit {



  ref: DynamicDialogRef;
  position: string;
  status: string;
  user_id: any;
  user_name: any;
  token: any;
  readonly: boolean = true;
  updateButton: boolean = false;
  file_name = [];
  curr_college: any;
  curr_filename: any;
  collegeList: any[] = [];
  collegeCourse: any[] = [];
  validateUploadOne: boolean = true;
  markListUploadUrl = config.markListUploadUrl;
  transUploadUrl = config.transUploadUrl;
  curriculumUploadUrl = config.curriculumUploadUrl;
  NameChangeLetterUrl = config.NameChangeLetterUrl;
  namechangeletterdetails: any;
  activeTab1: boolean = true;
  activeTab2: boolean = true;
  activeTab3: boolean = true;
  activeTab4: boolean = true;
  selectedCollege: any;
  app_id_namechange: any;
  division: any[] = [];
  Instructional: FormGroup;
  Affiliation: FormGroup;
  dynamicValue: number = 1; // Example initial value

  name = "Angular " + VERSION.major;
  isReady: boolean;
  imageChangedEvent: any;
  base64Image: any;
  ocrResult: string;
  croppedImage: any = "";
  isScanning: boolean;
  // file : any;
  croppedFile: any;
  fileNmae: any;
  fileUploaded: any;
  fgdfg: any;
  uploadForm: FormGroup;
  file: File;
  myfile: File;
  croppedresult: any;


  LetterforNameChangeform: FormGroup = new FormGroup({
    firstNameMarksheetCtrl: new FormControl(''),
    fatherNameMarksheetCtrl: new FormControl(''),
    motherNameMarksheetCtrl: new FormControl(''),
    lastNameMarksheetCtrl: new FormControl(''),
    firstNamePassportCtrl: new FormControl(''),
    fatherNamePassportCtrl: new FormControl(''),
    lastNamePassportCtrl: new FormControl(''),
  })


  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder, protected api: ApiService, private messageService: MessageService, private dialogService: DialogService, private authService: AuthService) {
    this.initialize();

    this.Instructional = this.fb.group({
      formsInstructional: this.fb.array([])
    });

    this.Affiliation = this.fb.group({
      formsAffiliation: this.fb.array([])
    })


  }

  ngOnInit() {

    this.uploadForm = this.fb.group({
      fileInputCtrl: ['', Validators.required]
    });

    this.generateFormsInstructional();
    this.generateFormsAffiliation();
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.api.getNameChangeData(this.user_id).subscribe(data => {
      this.namechangeletterdetails = (data as any)['data'];
      this.file_name = (data as any)['filename'];
      console.log('this.namechangeletterdetails', JSON.stringify(this.namechangeletterdetails));
      console.log('this.file_name[0]', this.file_name[0]['filename']);
      this.app_id_namechange = this.namechangeletterdetails.app_id;
      console.log("this.app_id_namechange", this.app_id_namechange);
      console.log("this.file_name", this.file_name);


      this.LetterforNameChangeform.patchValue({
        firstNameMarksheetCtrl: this.namechangeletterdetails.firstnameaspermarksheet,
        fatherNameMarksheetCtrl: this.namechangeletterdetails.fathersnameaspermarksheet,
        motherNameMarksheetCtrl: this.namechangeletterdetails.mothersnameaspermarksheet,
        lastNameMarksheetCtrl: this.namechangeletterdetails.lastnameaspermarksheet,
        firstNamePassportCtrl: this.namechangeletterdetails.firstnameasperpassport,
        fatherNamePassportCtrl: this.namechangeletterdetails.fathersnameasperpassport,
        lastNamePassportCtrl: this.namechangeletterdetails.lastnameasperpassport
      })

    })
    this.api.getFacultyLists().subscribe((data: any) => {
      if ((data) as any['data'] != undefined) {
        const datacourse: any[] = data['data']
        datacourse.forEach((element: any) => {
          this.collegeCourse.push(element)
        })
      }
    })

    this.division = [
      { name: 'Distinction' },
      { name: 'First Class' },
      { name: 'Second Class' },
      { name: 'Third Class' }
    ];

    this.api.getCollegeList().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });


    this.api.getuploadedCurriculum(this.user_id).subscribe((data: any) => {
      if (data['status'] == 200) {
        this.curr_filename = data['data'][0];
        console.log("this.curr_filename", this.curr_filename);

      } else {
        this.curr_filename = data['data']
      }
    })

  }
  
  async initialize(): Promise<void> {
  }

  handleFileInput(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.fileUploaded = event.target.files[0];
      this.base64Image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      console.log('event.target.files[0]', event.target.files[0]);
      reader.onload = (event: any) => {
      };
    }



  }
  async scanOCR() {
    this.imageChangedEvent = event;
    const worker = await createWorker({
      logger: m => console.log(m)
    });
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(this.fgdfg);
      console.log(text);
      await worker.terminate();
    })();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    console.log(event);
    //this.doOCR(event.base64);
    this.croppedImage = event.base64;
    console.log('this.croppedImage', this.croppedImage);
    this.base64Image = event.base64;
    this.fgdfg = this.dataurl(event.base64, 'testing.jpg');
  }
  dataurl(croppedFile: any, name: any) {
    const arr = croppedFile.split(",")
    console.log('arr' + arr[0])
    console.log('arr' + arr[1])
    const mime = arr[0].match(/:(.*?);/);
    console.log('mimemime', mime)
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], name, { type: "image/jpeg" });
  }
  async scanOCRtest(base64Image: string) {
    console.log('&&&&&&&&&&&&&&&&&&&&', this.fileUploaded);
    // this.imageChangedEvent = event;
    // const worker = await createWorker({
    //   logger: m => console.log(m)
    // });
    // (async () => {
    //   await worker.load();
    //   await worker.loadLanguage('eng');
    //   await worker.initialize('eng');
    //   const { data: { text } } = await worker.recognize(this.fileUploaded);
    //   console.log(text);
    //   await worker.terminate();
    // })();
  }
  async doOCR(base64Image: string) {
    console.log('OCRRRR')
    this.ocrResult = "Scanning";
    console.log(`Started: ${new Date()}`);
    console.log('this.isReady' + this.isReady)
    if (this.isReady) {
      const worker = await createWorker({
        logger: m => console.log(m)
      });
      console.log('inaideeee')
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(this.file);
      console.log('gdfgdf', text);
      console.log('this.ocrResult', this.ocrResult);
    }
    // await this.worker.terminate();
    console.log(`Stopped: ${new Date()}`);
    this.isScanning = false;
  }
  transform(): string {
    return this.base64Image;
  }


  uploadDetails() {
    this.myfile = this.dataurl(this.croppedImage, "11.jpeg")
    this.ref = this.dialogService.open(CollegeDetailsComponent, {
      data: {
        fileInput: this.myfile,
      },
      header: 'College Details',
      width: '70%',
      height: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }



  onBasicUploadAuto(event: any) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
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
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded Successfully !' });
      } else if (yourStatus == 401) {
        this.status = 'error';

      } else if (yourStatus == 400) {
        this.status = 'error';
      }
    }

  }

  deleteDocument(id: any, type: any) {
    console.log("deletee");
    this.confirmationService.confirm({
      message: 'Do you want to delete this document?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteDocument(id, type, this.user_id).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Data Deleted !' });
          } else {
          }
        })

      },
    });
  }

  imageView() {
    this.ref = this.dialogService.open(ImageViewComponent, {
      header: 'Select a Product',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }



  updateLetter() {

  }

  deleteInfo(id: any, type: any) {
    console.log("id", id)
    console.log("type", type);

    this.confirmationService.confirm({
      message: 'Do you want to delete this Data?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteInfo(id, type).subscribe((data: any) => {
          if (data['status'] == 200) {
            this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Data Deleted !' });
          } else {
          }
        })

      },
    });
  }
  editLetter() {
    this.readonly = false;
    this.updateButton = true;
  }
  saveLetter() {
    console.log("save");

    var data: any = {
      "firstNameMarksheetCtrl": this.LetterforNameChangeform.controls['firstNameMarksheetCtrl'].value,
      "fatherNameMarksheetCtrl": this.LetterforNameChangeform.controls['fatherNameMarksheetCtrl'].value,
      "motherNameMarksheetCtrl": this.LetterforNameChangeform.controls['motherNameMarksheetCtrl'].value,
      "lastNameMarksheetCtrl": this.LetterforNameChangeform.controls['lastNameMarksheetCtrl'].value,
      "firstNamePassportCtrl": this.LetterforNameChangeform.controls['firstNamePassportCtrl'].value,
      "fatherNamePassportCtrl": this.LetterforNameChangeform.controls['fatherNamePassportCtrl'].value,
      "lastNamePassportCtrl": this.LetterforNameChangeform.controls['lastNamePassportCtrl'].value,
    };
    if (this.LetterforNameChangeform.valid) {

      this.api.saveNameChangedata(data, this.user_id).subscribe((data: any) => {
        console.log("id", this.user_id);

        if (data['status'] == 200) {
          console.log("status", data['status']);
          this.ngOnInit()
        }
      })
    }
  }

  // upload curriculum selected college
  onCollegeChange(event: any) {
    this.selectedCollege = event.value.id;
    console.log("aaaaaa", this.selectedCollege);
    if (this.selectedCollege != null || this.selectedCollege != undefined || this.selectedCollege != '' || this.selectedCollege != 'undefined') {
      this.validateUploadOne = false
    }
  }


  // Instructional form

  get instructionalArray(): FormArray {
    return this.Instructional.get('formsInstructional') as FormArray;
  }
  generateFormsInstructional(): void {
    const instructionalArray = this.Instructional.get('formsInstructional') as FormArray;

    for (let i = 0; i < this.dynamicValue; i++) {
      instructionalArray.push(this.createFormInstructional());
    }
  }

  createFormInstructional(): FormGroup {
    return this.fb.group({
      instructionalName: new FormControl('', [Validators.required]),
      instructionalCollege: new FormControl('', [Validators.required]),
      instructionalCourse: new FormControl('', [Validators.required]),
      instructionalSpecialization: new FormControl('', [Validators.required]),
      instructionalDivision: new FormControl('', [Validators.required]),
      instructionalDuration: new FormControl('', [Validators.required]),
      instructionalYearOfPassing: new FormControl('', [Validators.required])
    });
  }



  // Affiliation form

  get affiliationArray(): FormArray {
    return this.Affiliation.get('formsAffiliation') as FormArray;
  }
  generateFormsAffiliation(): void {
    const affiliationArray = this.Affiliation.get('formsAffiliation') as FormArray;

    for (let i = 0; i < this.dynamicValue; i++) {
      affiliationArray.push(this.createFormAffiliation());
    }
  }

  createFormAffiliation(): FormGroup {
    return this.fb.group({
      name: new FormControl('', [Validators.required]),
      college: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      specialization: new FormControl('', [Validators.required]),
      division: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      yearOfPassing: new FormControl('', [Validators.required])
    });
  }

}
