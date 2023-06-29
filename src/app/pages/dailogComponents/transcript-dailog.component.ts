import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-transcript-dailog',
  template: `
  <span style = "color : red; font-size : 14px;">Please enter document name more then 4 letters, select college and then upload competencyletter</span>
  <br/>
  <span style = "color : red; font-size : 14px;">Do not use special characters</span>
  <br/>
  <br/>
  <div class="row">
  <div class="col-xl-4" style='center;'>
        <b>Select College :</b>  
      </div>
  <div class="col-xl-6" style='center;'>
  <p-dropdown  [style]="{'width':'25rem'}"
  [options]="collegeList"  [virtualScroll]="true" (onChange)="onCollegeChange($event)"
  [virtualScrollItemSize]="30" optionLabel="name" filterBy="name" [showClear]="true" [editable]="true"
  placeholder="Select a CollegeName"></p-dropdown>
  </div>
  </div><br>
  <div class="row">
  <div class="col-xl-4" style='center;'>
        <b>Document Name :</b>
      </div>
  <div class="col-xl-6" style='center;'>
  <input type="text" pInputText   />
  </div>
  </div><br>
  <div class="row">
  <div class="col-xl-4" style='center;'>
        <b>Upload Document:</b>
      </div>
  <div class="col-xl-6" style='center;'>
  <p-fileUpload mode="basic" name="file" (onUpload)="onUpload($event)" [disabled]="validateUploadOne"
  url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" 
   [maxFileSize]="5000000" [auto]="true" 
   chooseLabel="Upload"></p-fileUpload> 
  </div>
  </div>
  `,
  styles: [
  ]
})
export class TranscriptDailogComponent {
  collegeList:any[]
  selectedCollege: any;
  validateUploadOne: boolean = true;
  constructor( 
    protected api : ApiService, public ref: DynamicDialogRef
    ){}
  
  onUpload(event:any){
    const reader = new FileReader();
    if(event.files && event.files.length) {
      const [file] = event.files;
      reader.readAsDataURL(file);  
      this.ref.close(file);
    }
  }

  onCollegeChange(event: any) {
    this.selectedCollege = event.value.id;
    console.log("aaaaaa", this.selectedCollege);
    if (this.selectedCollege != null || this.selectedCollege != undefined || this.selectedCollege != '' || this.selectedCollege != 'undefined') {
      this.validateUploadOne = false
    }
  }
  
}
