import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-view',
  template: ` 
  <div *ngIf="imgType !== 'pdf'" style="height: 650px; width: 100%;">
  <img [src]="photoURL" style="height: 100%; width: 100%;">
</div>
<div *ngIf="imgType === 'pdf'" style="height: 650px; width: 100%;">
  <embed [src]="photoURL" type="application/pdf" style="height: 100%; width: 100%;">
</div>
  
  `,
  styles: [
  ]
})
export class ImageViewComponent implements OnInit{
  data: any;
  imgType : string ;
  imgName : any;
  photoURL: SafeResourceUrl;

  constructor(public config: DynamicDialogConfig, private sanitizer:DomSanitizer){
    this.data = config.data
  }
ngOnInit(){
  console.log("data",this.data.imgName);
   this.imgType = this.data.imgType;
   this.imgName = this.data.imgName; 
   console.log("this.imgType",this.imgType); 
   this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl("http://"+this.imgName);
   
} 
}
