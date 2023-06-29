import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';

export interface DialogData {
  data: any,
}

@Component({
  selector: 'app-add-document-by-admin',
  template: `
    <div>
      <mat-card>
        <mat-card-header>
          <mat-card-title>Add Documents</mat-card-title>
        </mat-card-header>
        <p-divider></p-divider>
        <mat-card-content>
          <div class="row">
            <div class="col-md-4">Document Type :</div>
            <div class="col-md-8">
              <mat-form-field>
                <mat-select placeholder="Select Document Type"
                    (selectionChange)="selectDocument($event.value)">
                    <mat-option value="Marklist">Marklist</mat-option>
                    <mat-option value="Transcript">Transcript</mat-option>
                    <mat-option value="Curriculum">Curriculum</mat-option>
                    <mat-option value="Grade to Percentage">Grade to Percentage</mat-option>
                    <mat-option value="OUTSIDE">Competency</mat-option>
                    <mat-option value="OUTSIDE">Name Change Proof</mat-option>
                    <mat-option value="OUTSIDE">Name Change Letter</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">Degree Type :</div>
            <div class="col-md-8">
              <mat-form-field>
                <mat-select placeholder="Select Degree Type"
                    (selectionChange)="selectDegree($event.value)">
                    <mat-option value="Bachelors">Bachelors</mat-option>
                    <mat-option value="Masters">Masters</mat-option>
                    <mat-option value="Phd">Phd</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">Document Name :</div>
            <div class="col-md-8">
              <input type="text" id="documentname" name="documentname" placeholder="Document Name" class="form-control" pattern="[a-zA-Z ]*" #documentname>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
  ]
})
export class AddDocumentByAdminComponent {

  //declaration of data get from purpose component 
  studentData: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    //get data from purpose component stores in another variables
    this.studentData = this.data.data;
    console.log('this.studentData***********',this.studentData);
    
  }

  selectDocument(value: any) { }

  selectDegree(value: any) { }



}
