import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

export interface DialogData {
  fileName: any,
  extension: any,
}

@Component({
  selector: 'app-open-img-pdf-dialog',
  template: `
  <mat-card>
    <mat-card-header>
      <div class="right" (click)="dismiss()">
        <i title="Close" class="fas fa-times fa-pull-right fa-border"></i>
      </div>
    </mat-card-header>
    <mat-card-content>
      <div *ngIf="extension != 'pdf'" style="height: 700px; width: 700px;">
        <iframe [src]="photoURL" height="100%" width="100%"></iframe>
      </div>
      <div *ngIf="extension == 'pdf'" style="height: 700px; width: 700px;">
        <embed [src]="photoURL" type="application/pdf" style="height: 100%; width: 100%;">
      </div>
    </mat-card-content>
  </mat-card>
  `,
})
export class OpenImgPdfDialogComponent{
  file_name: any;
  extension: any;
  photoURL: any;

  constructor(
    public dialogRef: MatDialogRef<OpenImgPdfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer:DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.file_name = this.data.fileName;
    this.extension = this.data.extension;

    this.photoURL = this.sanitizer.bypassSecurityTrustResourceUrl("http://"+this.file_name);
  }

  //close dialog box
  dismiss() {
    this.dialogRef.close();
  }
}
