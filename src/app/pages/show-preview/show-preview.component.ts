import { Component , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from "ngx-image-cropper";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CollegeDetailsComponent } from '../dailogComponents/college-details.component';
import { ApiService } from 'src/app/api.service';

export interface DialogData {
  type: any;
  image: any;
  imageChangedEvent : any
  user_id : any
  app_id : any,
  collegeid : any,
  education_type : any,
  pattern : any,
  faculty : any,
}

@Component({
  selector: 'show-preview-dialog',
  template: `  
  <div class="text-center col-md-6">
  <div class="right" (click)="dismiss()">
  <i title="Close" class="fas fa-times fa-pull-right fa-border"></i>
</div>
  <h4 class="cropPreview">Crop</h4>
  <div class="row" style="margin-top: 15px;">
    <div class="text-center col-md-8" *ngIf="imageChangedEvent">
      <image-cropper [imageChangedEvent]="imageChangedEvent" [maintainAspectRatio]="false"
      format="png" (imageCropped)="imageCropped($event)">
      </image-cropper>
    </div>
  </div>
  <p-button label="Upload" (click)="saveimage()" styleClass="p-button-raised p-button-success"></p-button>
</div>`,
providers: [DialogService]
})
export class ShowPreviewComponent {
  croppedImage: string | null | undefined;
  height: number;
  width: number;
  imageChangedEvent: any;
  type: any;
  ref: DynamicDialogRef;
  file: File;
  user_id: any;
  app_id: any;
  education_type: any;
  collegeid: any;
  pattern: any;
  faculty: any;
  constructor(
    public dialogRef: MatDialogRef<ShowPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogService: DialogService,
    protected api: ApiService
  ) {
        this.imageChangedEvent = data.imageChangedEvent;
        this.type = data.type;
        this.user_id = data.user_id;
        this.app_id = data.app_id;
        this.collegeid = data.collegeid
        this.education_type = data.education_type,
        this.pattern = data.pattern,
        this.faculty = data.faculty
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
  saveimage() {
    // event: any ,type: any ,coursename : any ,collegename : any , collegeid : any,faculty : any,education_type: any,patteren:any
    const fileUrl = this.dataurl(this.croppedImage, "11.jpeg")
    if(this.type == 'marklist'){
      this.ref = this.dialogService.open(CollegeDetailsComponent, {
        data: {
          fileInput: fileUrl,
          type:  this.type
        },
        header: 'College Details',
        width: '70%',
        height: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true
      });
      this.ref.onClose.subscribe(() => {
          this.dismiss()
      });
    }else{
      this.file = fileUrl
      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('user_id', this.user_id);
      var data=[];
      this.api.ScanData(this.collegeid,this.education_type,this.pattern,this.faculty,this.app_id,this.type,formData).subscribe( (data: any) => {
        if (data['status'] == 200) {
          this.dialogRef.close(data['data'][3])
        }else{
        }
      })
    }
  }
  dismiss(){
    this.dialogRef.close();
  }
}
