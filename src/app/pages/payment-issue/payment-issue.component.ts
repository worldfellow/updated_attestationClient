import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from '../../../../config';
import { ApiService } from 'src/app/api.service';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { ImageViewComponent } from '../dailogComponents/image-view.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentNotesComponent } from '../dialog/payment-notes/payment-notes.component';
import { ShowPreviewComponent } from '../show-preview/show-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-payment-issue',
  templateUrl: './payment-issue.component.html',
  styleUrls: ['./payment-issue.component.css'],
  providers: [DialogService, MessageService, ConfirmationService]
})
export class PaymentIssueComponent {
  registerForm: FormGroup;
  NameChangeLetterUrl = config.NameChangeLetterUrl;
  fileUploaded: File;
  imageChangedEvent: any;
  base64Image: any;
  token: any;
  user_id: any;
  croppedImage: any = "";
  height: number;
  width: number;
  file: File;
  inProcessData: any[] = [];
  resolvedData: any[] = [];
  rejectData: any[] = [];
  issuedata: any[] = [];
  issuseCount: number = 0;
  ref: DynamicDialogRef;
  user_type: any;
  paymentIssueData: any;
  filterText: string = "";
  filename: any;
  minDate: any;
  maxDate: any;
  start_date: any;
  @ViewChild('dt1') dt1: Table;
  @ViewChild('dt2') dt2: Table;
  @ViewChild('dt3') dt3: Table;
  @ViewChild('local') local!: ElementRef;
  issuselength: number;

  constructor(
    private formBuilder: FormBuilder,
    protected api: ApiService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.user_type = this.token.data.user.user_type;

    let today = new Date();
    this.maxDate = new Date(today);

    this.api.getpaymentissuedata(this.user_type, '').subscribe((data: any) => {
      if (data['status'] == 200) {
        this.issuedata = data['data'];
      } else {
        console.log('Data not found!');
      }
    })

    this.registerForm = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      bankrefCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      transactionCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      paymentdateCtrl: ['', Validators.required,],
      amountCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      ordeidCtrl: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      noteCtrl: ['', Validators.required],
      fileInputCtrl: ['', Validators.required],
    });
    this.token = JSON.parse(localStorage.getItem('user')!)
    this.user_id = this.token.data.user.user_id;
    this.onTabChange(0);
  }

  handleFileInput(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      this.imageChangedEvent = event;
      this.fileUploaded = event.target.files[0];
      this.base64Image = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
      };
    }
    this.showEditPreview();
  }

  handleFilterChange(type: any) {
    if(type == 'inprocess'){
      this.dt1?.filterGlobal(this.filterText, 'contains');
      console.log("this.dt1", this.dt1);
      console.log("this.dt1._totalRecords>>", this.dt1._totalRecords)
      this.issuselength = this.dt1._totalRecords;
    }else if(type == 'resolved'){
      this.dt2?.filterGlobal(this.filterText, 'contains');
      console.log("this.dt2", this.dt2);
      console.log("this.dt2._totalRecords>>", this.dt2._totalRecords)
      this.issuselength = this.dt2._totalRecords;
    }else{
      this.dt3?.filterGlobal(this.filterText, 'contains');
      console.log("this.dt3", this.dt3);
      console.log("this.dt3._totalRecords>>", this.dt3._totalRecords)
      this.issuselength = this.dt3._totalRecords;
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
    // const fileUrl = this.dataurl(this.croppedImage, "11.jpeg", this.height, this.width)

    // this.file = fileUrl
    // const formData = new FormData();
    // formData.append('file', this.file);
    // console.log("this.file", this.file);

    // formData.append('user_id', this.user_id);
    var data: any = {
      "emailCtrl": this.registerForm.controls['emailCtrl'].value,
      "bankrefCtrl": this.registerForm.controls['bankrefCtrl'].value,
      "transactionCtrl": this.registerForm.controls['transactionCtrl'].value,
      "paymentdateCtrl": this.registerForm.controls['paymentdateCtrl'].value,
      "amountCtrl": this.registerForm.controls['amountCtrl'].value,
      "ordeidCtrl": this.registerForm.controls['ordeidCtrl'].value,
      "noteCtrl": this.registerForm.controls['noteCtrl'].value,
      "filename": this.filename
    };

    if (this.registerForm.valid) {
      this.api.savepaymentissuedata(data).subscribe((data: any) => {

        if (data['status'] == 200) {
          // this.registerForm.reset();
          this.onTabChange('');
        }
      })
    }
  }

  onTabChange(event: any) {
    var tracker: any;
    switch (event) {
      case 0:
        tracker = 'Inprocess';
        break;
      case 1:
        tracker = 'Resolved';
        break;
      case 2:
        tracker = 'Reject';
        break;
      default:
    }

    this.api.getpaymentissuedata(this.user_type, tracker).subscribe((data: any) => {
      if (data['status'] == 200) {
        if (data['data'] && event == 0) {
          this.inProcessData = data['data'];
          this.issuseCount = this.inProcessData.length;
        } else if (data['data'] && event == 1) {
          this.resolvedData = data['data'];
          this.issuseCount = this.resolvedData.length;
        } else if (data['data'] && event == 2) {
          this.rejectData = data['data'];
          this.issuseCount = this.rejectData.length;
        } else {
          console.log('Something went wrong!');
        }
      } else {
        console.log('Data not found!');
      }
    })

  }

  imageView(filepath: any, extension: any) {
    this.ref = this.dialogService.open(ImageViewComponent, {
      data: {
        imgType: extension,
        imgName: filepath,
      },
      header: 'Your Payment Recipt',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }

  notesData(notes: any, readOnly: any) {
    this.ref = this.dialogService.open(PaymentNotesComponent, {
      data: {
        notesData: notes,
        readOnly: readOnly,
      },
      header: 'Notes Details',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      closable: true
    });
  }

  clear(table: Table, event: any) {
    table.clear();
    this.local.nativeElement.value = '';
    this.onTabChange(event);
  }

  onChange(event: any, notes: any, user_id: any, id: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to change status?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.ref = this.dialogService.open(PaymentNotesComponent, {
          data: {
            tracker: event,
            notesData: notes,
            user_id: user_id,
            issue_id: id,
          },
          header: 'Notes Details',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true,
          closable: true
        });
        this.ref.onClose.subscribe((data: any) => {
          if (data?.status == 200) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
            this.ngOnInit();
          } else if (data?.status == 400) {
            this.messageService.add({ severity: 'danger', summary: 'Error', detail: data.message });
          } else {
          }
        });
      },

      reject: () => {
        this.confirmationService.close();
      }
    })
  }

  showEditPreview() {
    const dialogRef = this.dialog.open(ShowPreviewComponent, {
      data: {
        user_id: this.user_id,
        base64Image: this.base64Image,
        imageChangedEvent: this.imageChangedEvent,
        type: 'paymentIssue'

      }
    }).afterClosed().subscribe(result => {
      this.filename = result
      this.onTabChange('')

    });
  }
}