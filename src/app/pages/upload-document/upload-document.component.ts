import { Component, OnInit, VERSION, Input, ViewChild ,Output} from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageViewComponent } from '../dailogComponents/image-view.component';
import { config } from '../../../../config';
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


@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.css'],
  providers: [ConfirmationService, MessageService, DialogService]
})
export class UploadDocumentComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup : any;
  @Output() selectedTabChange:EventEmitter<number> 

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
  CompetencyletterUploadUrl = config.CompetencyletterUploadUrl;
  namechangeletterdetails: any;
  selectedCollege: any;
  app_id_namechange: any;
  division: any[] = []; 
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
  Instructional: FormGroup;
  InstructionalMasters: FormGroup;
  InstructionalPhd: FormGroup;
  Affiliation: FormGroup;
  AffiliationMasters:FormGroup;
  AffiliationPhd :FormGroup;
  Bachelorsdegrees:string[] = [];
  Mastersdegrees:string[] = [];
  PhdDegrees:string[] = []; 
  degrees: string[] = []

  LetterforNameChangeform: FormGroup = new FormGroup({
    firstNameMarksheetCtrl: new FormControl('',Validators.required),
    fatherNameMarksheetCtrl: new FormControl('',Validators.required),
    motherNameMarksheetCtrl: new FormControl('',Validators.required),
    lastNameMarksheetCtrl: new FormControl('',Validators.required),
    firstNamePassportCtrl: new FormControl('',Validators.required),
    fatherNamePassportCtrl: new FormControl('',Validators.required),
    lastNamePassportCtrl: new FormControl('',Validators.required),
    fileInputCtrl: new FormControl('',Validators.required),
  })
  app_id: any;
  collegeData: any =[];
  collegeDatad: any;
  collegeCount: any;
  transcriptDisplay: any;
  uniqueCollegeName: any;
  extraData: any; 
  gradtoper: any;
  instructionalField:any;
  affiliation:any;
  educationalDetails:any;
  CompetencyLetter:any;
  curriculum:any
  gradToPer:any;
  LetterforNameChange:any;
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

  constructor(private confirmationService: ConfirmationService, private fb: FormBuilder, protected api: ApiService, private messageService: MessageService, private dialogService: DialogService, private authService: AuthService,private route : ActivatedRoute,public dialog: MatDialog,) {
    this.initialize();

    this.Instructional = this.fb.group({
      formsInstructional: this.fb.array([])
    });
    this.InstructionalMasters = this.fb.group({
      formsInstructionalMaster: this.fb.array([])
    });
    this.InstructionalPhd = this.fb.group({
      formsInstructionalPhd: this.fb.array([])
    });

    this.Affiliation = this.fb.group({
      formsAffiliation: this.fb.array([])
    })
    this.AffiliationMasters = this.fb.group({
      formsAffiliationMaster: this.fb.array([])
    })
    this.AffiliationPhd = this.fb.group({
      formsAffiliationPhd: this.fb.array([])
    })


  }

  ngOnInit() {
    this.app_id = this.route.snapshot.queryParamMap.get('app_id');
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.uploadForm = this.fb.group({
      fileInputCtrl: ['', Validators.required],
      collegeId : ['']
    });

    this.api.getAppliedUserDetail().subscribe((data : any) =>{
      const userApplied = (data as any)['data']; 
      this.instructionalField = userApplied.instructionalField;
      this.affiliation = userApplied.affiliation;
      this.educationalDetails = userApplied.educationalDetails; 
      this.CompetencyLetter = userApplied.CompetencyLetter;
      this.curriculum = userApplied.curriculum;
      this.gradToPer = userApplied.gradToPer;
      this.LetterforNameChange = userApplied.LetterforNameChange;
    }) 

    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.api.getNameChangeData().subscribe(data => {
      this.namechangeletterdetails = (data as any)['data'];
      this.file_name = (data as any)['filename'];
      this.app_id_namechange = this.namechangeletterdetails.app_id;
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

    this.api.getCollegeLists().subscribe((data: any) => {
      if (data && data.data !== undefined) {
        const dataArray: any[] = data.data;
        dataArray.forEach((element: any) => {
          this.collegeList.push(element);
        });
      }
    });

    this.refresh()
    this.checkStepper();
  }

  /** Get Data of Instructional and Affiliation letter forms through Api */
  getLettersDetails(degrees: any) { 
    this.api.getletterDetails(degrees).subscribe((data: any) => {  
      if (data?.dataInstructional?.bachelors[0]) {
        const bachelorsDetailsInstructional = data?.dataInstructional?.bachelors[0].instructionalDetails;
        for(let i = 0; i < bachelorsDetailsInstructional.length; i++){ 
          this.patchValueInstructional(bachelorsDetailsInstructional, this.Instructional.get('formsInstructional') as FormArray, 'Bachelors');
        }
      } 
      if (data?.dataAffiliation?.bachelors[0]) {
        const bachelorsDetailsAffiliation = data?.dataAffiliation?.bachelors[0].affiliationDetails;
        for(let i = 0; i < bachelorsDetailsAffiliation.length; i++){ 
          this.patchValueAffiliation(bachelorsDetailsAffiliation, this.Affiliation.get('formsAffiliation') as FormArray, 'Bachelors');
        }
      }

      if (data?.dataInstructional?.masters[0]) {
        const mastersDetailsInstructional = data.dataInstructional.masters[0].instructionalDetails; 
        for(let i = 0; i < mastersDetailsInstructional.length; i++){
        this.patchValueInstructional(mastersDetailsInstructional, this.InstructionalMasters.get('formsInstructionalMaster') as FormArray, 'Masters');
        }
      }
      if (data?.dataAffiliation?.masters[0]) {
        const mastersDetailsAffiliation = data.dataAffiliation.masters[0].affiliationDetails; 
        for(let i = 0; i < mastersDetailsAffiliation.length; i++){
        this.patchValueAffiliation(mastersDetailsAffiliation, this.AffiliationMasters.get('formsAffiliationMaster') as FormArray, 'Masters');
        }
      }

      if (data?.dataInstructional?.phd[0]) {
        const phdDetailsInstructional = data.dataInstructional.phd[0].instructionalDetails; 
        for(let i = 0; i < phdDetailsInstructional.length; i++){
        this.patchValueInstructional(phdDetailsInstructional, this.InstructionalPhd.get('formsInstructionalPhd') as FormArray, 'Phd');
        }
      }
      if (data?.dataAffiliation?.phd[0]) {
        const phdDetailsAffiliation = data.dataAffiliation.phd[0].instructionalDetails; 
        for(let i = 0; i < phdDetailsAffiliation.length; i++){
        this.patchValueAffiliation(phdDetailsAffiliation, this.AffiliationPhd.get('formsAffiliationPhd') as FormArray, 'Phd');
        }
      }

    });
  }

    /**Patch the value of Instructional Letter */
  patchValueInstructional(details: any[], formArray: FormArray, degreeType: string) {
    for (let i = 0; i < details.length; i++) {
      const detail = details[i]; 
        const formGroup = formArray.at(i) as FormGroup;
        formGroup.patchValue({
          idCtrl: detail.id,
          [`instructionalName${degreeType}`]: detail.studentName,
          [`instructionalCollege${degreeType}`]: detail.collegeName,
          [`instructionalCourse${degreeType}`]: detail.courseName,
          [`instructionalSpecialization${degreeType}`]: detail.specialization,
          [`instructionalDivision${degreeType}`]: detail.division,
          [`instructionalDuration${degreeType}`]: detail.duration,
          [`instructionalYearOfPassing${degreeType}`]: detail.yearofpassing
        });  
    }
  }
    /**Patch the value of Affiliation Letter */
  patchValueAffiliation(details: any[], formArray: FormArray, degreeType: string) {
    for (let i = 0; i < details.length; i++) {
      const detail = details[i];
      const formGroup = formArray.at(i) as FormGroup;
      formGroup.patchValue({
        idCtrl: detail.id,
        [`affiliationName${degreeType}`]: detail.studentName,
        [`affiliationCollege${degreeType}`]: detail.collegeName,
        [`affiliationCourse${degreeType}`]: detail.courseName,
        [`affiliationSpecialization${degreeType}`]: detail.specialization,
        [`affiliationDivision${degreeType}`]: detail.division,
        [`affiliationDuration${degreeType}`]: detail.duration,
        [`affiliationYearOfPassing${degreeType}`]: detail.yearofpassing
      });
    }
  }
  uploadfun(event : any){
    if (event.files && event.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.croppedImage = event.files[0];
      this.base64Image = event.files[0];
      reader.readAsDataURL(event.files[0]);
      reader.onload = (event: any) => {
      };
    }



    this.base64Image = event.files[0];
    this.imageChangedEvent = event;
  
  }
  async initialize(): Promise<void> {
  }

  handleFileInput(event: any , type : any , course_name  : any , college  : any , collegeid : any, faculty : any,education_type : any ,pattern : any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.fileUploaded = event.target.files[0];
      this.base64Image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
      };
    }
    this.showEditPreview(type , course_name , college , collegeid , faculty , education_type , pattern);
  }

  showEditPreview(type : any ,course_name : any, college : any, collegeid : any, faculty : any, education_type : any, pattern: any){
    const dialogRef = this.dialog.open(ShowPreviewComponent, {
      data: {
        user_id  : this.user_id,
        base64Image  : this.base64Image,
        imageChangedEvent : this.imageChangedEvent,
        type : type,
        course_name : course_name,
        college  : college,
        collegeid  : collegeid,
        faculty : faculty,
        education_type : education_type,
        pattern  : pattern

        
      }
    }).afterClosed().subscribe(result => {
        this.refresh()
        this.id = result
    });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    this.height = event.height
    this.width = event.width
  }
  dataurl(croppedFile: any, name: any ) {
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

  uploadDetails(event: any ,type: any ,coursename : any ,collegename : any , collegeid : any,faculty : any,education_type: any,patteren:any) {  
    const fileUrl = this.dataurl(this.croppedImage, "11.jpeg")
    if(type == 'marklist'){
      this.ref = this.dialogService.open(CollegeDetailsComponent, {
        data: {
          fileInput: fileUrl,
          type:  type
        },
        header: 'College Details',
        width: '70%',
        height: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
      });
      this.ref.onClose.subscribe(() => {
          this.refresh();
          this.messageService.add({ severity: 'info', summary: 'Error', detail: 'Details Saved Successfully!' });
      });
    }else{
      this.file = fileUrl
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user_id', this.user_id);
      var data=[];
      this.api.ScanData(this.app_id,type,formData).subscribe( (data: any) => {
        if (data['status'] == 200) {
          this.base64Image = false
          this.refresh();
          // this.ref.close();
        }else{
          this.refresh();
        }
      })
    }
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
 

  deleteInfo(type: any) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this Data?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.api.deleteInfo(type).subscribe((data: any) => {
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

    var data: any = {
      "firstNameMarksheetCtrl": this.LetterforNameChangeform.controls['firstNameMarksheetCtrl'].value,
      "fatherNameMarksheetCtrl": this.LetterforNameChangeform.controls['fatherNameMarksheetCtrl'].value,
      "motherNameMarksheetCtrl": this.LetterforNameChangeform.controls['motherNameMarksheetCtrl'].value,
      "lastNameMarksheetCtrl": this.LetterforNameChangeform.controls['lastNameMarksheetCtrl'].value,
      "firstNamePassportCtrl": this.LetterforNameChangeform.controls['firstNamePassportCtrl'].value,
      "fatherNamePassportCtrl": this.LetterforNameChangeform.controls['fatherNamePassportCtrl'].value,
      "lastNamePassportCtrl": this.LetterforNameChangeform.controls['lastNamePassportCtrl'].value,
      "id": this.id,
    };
    if (this.LetterforNameChangeform.valid) {

      this.api.saveNameChangedata(data).subscribe((data: any) => {
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


   /**
    * Instructional Letter
    */

   get instructionalArray(): FormArray {
    return this.Instructional.get('formsInstructional') as FormArray;
  }

  generateFormsInstructional(Bachelorsdegrees:any): void {
    
    const instructionalArray = this.Instructional.get('formsInstructional') as FormArray;
     for(let i=0 ;i < Bachelorsdegrees ; i++){
  instructionalArray.push(this.createFormInstructional());
     } 
  }

  createFormInstructional(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      instructionalNameBachelors: new FormControl('', [Validators.required]),
      instructionalCollegeBachelors: new FormControl('', [Validators.required]),
      instructionalCourseBachelors: new FormControl('', [Validators.required]),
      instructionalSpecializationBachelors: new FormControl('', [Validators.required]),
      instructionalDivisionBachelors: new FormControl('', [Validators.required]),
      instructionalDurationBachelors: new FormControl('', [Validators.required]),
      instructionalYearOfPassingBachelors: new FormControl('', [Validators.required])
    });
  }

  get instructionalArrayMaster(): FormArray {
    return this.InstructionalMasters.get('formsInstructionalMaster') as FormArray;
  }

  generateFormsInstructionalMaster(Mastersdegrees:any): void {
    const instructionalArrayMaster = this.InstructionalMasters.get('formsInstructionalMaster') as FormArray;
    for(let i=0 ;i < Mastersdegrees ; i++){
    instructionalArrayMaster.push(this.createFormInstructionalMaster());
  }
  }

  createFormInstructionalMaster(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      instructionalNameMasters: new FormControl('', [Validators.required]),
      instructionalCollegeMasters: new FormControl('', [Validators.required]),
      instructionalCourseMasters: new FormControl('', [Validators.required]),
      instructionalSpecializationMasters: new FormControl('', [Validators.required]),
      instructionalDivisionMasters: new FormControl('', [Validators.required]),
      instructionalDurationMasters: new FormControl('', [Validators.required]),
      instructionalYearOfPassingMasters: new FormControl('', [Validators.required])
    });
  }

  get instructionalArrayPhd(): FormArray {
    return this.InstructionalPhd.get('formsInstructionalPhd') as FormArray;
  }

  generateFormsInstructionalPhd(PhdDegrees:any): void {
    const instructionalArrayPhd = this.InstructionalPhd.get('formsInstructionalPhd') as FormArray;
    for(let i=0 ;i < PhdDegrees ; i++){
      instructionalArrayPhd.push(this.createFormInstructionalPhd());
    }
   
  }

  createFormInstructionalPhd(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      instructionalNamePhd: new FormControl('', [Validators.required]),
      instructionalCollegePhd: new FormControl('', [Validators.required]),
      instructionalCoursePhd: new FormControl('', [Validators.required]),
      instructionalSpecializationPhd: new FormControl('', [Validators.required]),
      instructionalDivisionPhd: new FormControl('', [Validators.required]),
      instructionalDurationPhd: new FormControl('', [Validators.required]),
      instructionalYearOfPassingPhd: new FormControl('', [Validators.required])
    });
  }

  saveInstructionalDetails(index: number, degree: string, type: string) { 

    const formArrayKey = degree === "Bachelors" ? "formsInstructional" : degree === "Masters" ? "formsInstructionalMaster" : "formsInstructionalPhd";
    const formArray = degree === "Bachelors" ? this.Instructional.get(formArrayKey) as FormArray : degree === "Masters" ? this.InstructionalMasters.get(formArrayKey) as FormArray : this.InstructionalPhd.get(formArrayKey) as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    if (formGroup.valid) {
      const formData = new FormData();
      formData.append('idCtrl', formGroup.controls["idCtrl"].value);
      formData.append('name', formGroup.controls[`instructionalName${degree}`].value);
      formData.append('college', formGroup.controls[`instructionalCollege${degree}`].value['name'] || formGroup.controls[`instructionalCollege${degree}`].value);
      formData.append('course', formGroup.controls[`instructionalCourse${degree}`].value['name'] || formGroup.controls[`instructionalCourse${degree}`].value);
      formData.append('specialization', formGroup.controls[`instructionalSpecialization${degree}`].value);
      formData.append('division', formGroup.controls[`instructionalDivision${degree}`].value['name'] || formGroup.controls[`instructionalDivision${degree}`].value);
      formData.append('duration', formGroup.controls[`instructionalDuration${degree}`].value);
      formData.append('yearOfpassing', formGroup.controls[`instructionalYearOfPassing${degree}`].value);
      formData.append('user_id', this.user_id);
      formData.append('education', degree);
      formData.append('type', type);

      this.api.saveInstructionalData(formData).subscribe((data: any) => {
        if (data['status'] == 200) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: data['message'] });
          this.getLettersDetails(this.degrees);
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Fields Please Fill all the details !' });
    }
  }
 

  /**
   * Affiliation Letter
   */

  get affiliationArray(): FormArray {
    return this.Affiliation.get('formsAffiliation') as FormArray;
  }
  generateFormsAffiliation(Bachelorsdegrees:any): void {
    const affiliationArray = this.Affiliation.get('formsAffiliation') as FormArray; 
    for(let i=0 ;i < Bachelorsdegrees ; i++){
    affiliationArray.push(this.createFormAffiliation());
    }
  }

  createFormAffiliation(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      affiliationNameBachelors: new FormControl('', [Validators.required]),
      affiliationCollegeBachelors: new FormControl('', [Validators.required]),
      affiliationCourseBachelors: new FormControl('', [Validators.required]),
      affiliationSpecializationBachelors: new FormControl('', [Validators.required]),
      affiliationDivisionBachelors: new FormControl('', [Validators.required]),
      affiliationDurationBachelors: new FormControl('', [Validators.required]),
      affiliationYearOfPassingBachelors: new FormControl('', [Validators.required])
    });
  }

  get affiliationArrayMaster(): FormArray {
    return this.AffiliationMasters.get('formsAffiliationMaster') as FormArray;
  }
  generateFormsAffiliationMaster(Mastersdegrees:any): void {
    const affiliationArrayMaster = this.AffiliationMasters.get('formsAffiliationMaster') as FormArray; 
    for(let i=0 ;i < Mastersdegrees ; i++){
    affiliationArrayMaster.push(this.createFormAffiliationMaster());
    }
  }

  createFormAffiliationMaster(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      affiliationNameMasters: new FormControl('', [Validators.required]),
      affiliationCollegeMasters: new FormControl('', [Validators.required]),
      affiliationCourseMasters: new FormControl('', [Validators.required]),
      affiliationSpecializationMasters: new FormControl('', [Validators.required]),
      affiliationDivisionMasters: new FormControl('', [Validators.required]),
      affiliationDurationMasters: new FormControl('', [Validators.required]),
      affiliationYearOfPassingMasters: new FormControl('', [Validators.required])
    });
  }

  get affiliationArrayPhd(): FormArray {
    return this.AffiliationPhd.get('formsAffiliationPhd') as FormArray;
  }
  generateFormsAffiliationPhd(PhdDegrees:any): void {
    const affiliationArrayPhd = this.AffiliationPhd.get('formsAffiliationPhd') as FormArray; 
    for(let i=0 ;i < PhdDegrees ; i++){
    affiliationArrayPhd.push(this.createFormAffiliationPhd());
    }
  }

  createFormAffiliationPhd(): FormGroup {
    return this.fb.group({
      idCtrl:new FormControl(''),
      affiliationNamePhd: new FormControl('', [Validators.required]),
      affiliationCollegePhd: new FormControl('', [Validators.required]),
      affiliationCoursePhd: new FormControl('', [Validators.required]),
      affiliationSpecializationPhd: new FormControl('', [Validators.required]),
      affiliationDivisionPhd: new FormControl('', [Validators.required]),
      affiliationDurationPhd: new FormControl('', [Validators.required]),
      affiliationYearOfPassingPhd: new FormControl('', [Validators.required])
    });
  }

  saveAffiliationDetails(index: number, degree: string,type: string) {  
   
    const formArrayKey = degree === "Bachelors" ? "formsAffiliation" : degree === "Masters" ? "formsAffiliationMaster" : "formsAffiliationPhd";
    const formArray = degree === "Bachelors" ? this.Affiliation.get(formArrayKey) as FormArray : degree === "Masters" ? this.AffiliationMasters.get(formArrayKey) as FormArray : this.AffiliationPhd.get(formArrayKey) as FormArray;
    const formGroup = formArray.at(index) as FormGroup; 
    if(formGroup.valid){
    const formData = new FormData();
    formData.append('idCtrl',formGroup.controls["idCtrl"].value)
    formData.append('name', formGroup.controls[`affiliationName${degree}`].value);
    formData.append('college', formGroup.controls[`affiliationCollege${degree}`].value['name'] || formGroup.controls[`affiliationCollege${degree}`].value);
    formData.append('course', formGroup.controls[`affiliationCourse${degree}`].value['name'] || formGroup.controls[`affiliationCourse${degree}`].value);
    formData.append('specialization', formGroup.controls[`affiliationSpecialization${degree}`].value);
    formData.append('division', formGroup.controls[`affiliationDivision${degree}`].value['name'] || formGroup.controls[`affiliationDivision${degree}`].value);
    formData.append('duration', formGroup.controls[`affiliationDuration${degree}`].value);
    formData.append('yearOfpassing', formGroup.controls[`affiliationYearOfPassing${degree}`].value);
    formData.append('education', degree);
    formData.append('type',type);
  
    this.api.saveInstructionalData(formData).subscribe((data: any) => {
      if (data['status'] == 200) { 
        this.messageService.add({ severity: 'success', summary: 'Success', detail:  data['message'] });  
      }
    });
      
    }else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Fields Please Fill all the details !' }); 
    }
  }
  refresh(){
    this.api.getUploadedDocuments(this.app_id).subscribe((data:any)=>{
      if(data['status']==200){
        this.marksheets = data['data'][0];
        this.transcripts = data['data'][1];
        this.transcriptDisplay = data['data'][2];
        this.uniqueCollegeName = data['data'][3];
        this.extraData = data['data'][4];
        this.curriculumData = data['data'][5];
        this.gradtoper = data['data'][6];
      }
  })

  this.api.getInstructionalForms().subscribe((data : any)=>{  

    if ((data) as any['data'] != undefined) {   
      
      for(let i = 0; i < data.length; i++) {
        let collegeLength = data[i].formLength
        if(data[i].education_type == "Bachelors"){ 
          this.Bachelorsdegrees.push(collegeLength); 
        }
        if(data[i].education_type == "Masters"){ 
          this.Mastersdegrees.push(collegeLength); 
        }
        if(data[i].education_type == "Masters"){ 
          this.PhdDegrees.push(collegeLength); 
        }
        this.degrees.push(data[i].education_type)  
      } 
      this.generateFormsInstructional(this.Bachelorsdegrees);
      this.generateFormsInstructionalMaster(this.Mastersdegrees);
      this.generateFormsInstructionalPhd(this.PhdDegrees);
      this.generateFormsAffiliation(this.Bachelorsdegrees);
      this.generateFormsAffiliationMaster(this.Mastersdegrees);
      this.generateFormsAffiliationPhd(this.PhdDegrees);
      this.getLettersDetails(this.degrees);  
      
    }
  })
}


checkStepper(){
  this.api.checkstepper_inner(this.app_id).subscribe((response: any) => {
    if(response['data'].tab1 == true){
      this.tabcheck1 = 1
    }
     if(response['data'].tab2 == true){
      this.tabcheck1 = 2
    }
     if(response['data'].tab3 == true){
      this.tabcheck1 = 3
    }
     if(response['data'].tab4 == true){
      this.tabcheck1 = 4
    }
     if(response['data'].tab5 == true){
      this.tabcheck1 = 5
    }
     if(response['data'].tab6 == true){
      this.tabcheck1 = 6
    }
     if(response['data'].tab7 == true){
      this.tabcheck1 = 7
    }
     if(response['data'].tab8 == true){
      this.tabcheck1 = 8
    }
  })
  
}

myTabSelectedIndexChange(index: any) {
}
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
    maximizable: true
  })
  this.ref.onClose
    .subscribe(
      (data: any) => {
        if (data !== undefined) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document Uploaded Succesfully !' });
        } else {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Document Not Uploaded !' });
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
    maximizable: true
  })
  this.ref.onClose
    .subscribe(
      (data: any) => {

        if (data !== undefined) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document Uploaded Succesfully !' });
        } else {
          this.messageService.add({ severity: 'danger', summary: 'Error', detail: 'Document Not Uploaded !' });
        }
      });
}
}
