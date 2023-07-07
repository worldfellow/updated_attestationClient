import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { ApiService } from 'src/app/api.service';
import { MessageService } from 'primeng/api';

export interface DialogData {
  notes_data: any;
  app_id: any;
  user_id: any;
  collegeConfirmation: any;
}

@Component({
  selector: 'app-show-notes',
  template: `
    <div>
      <p-card header="Notes">
          <textarea rows="10" cols="50" pInputTextarea [(ngModel)]="notes_data" [disabled]="isDisabled" style="font-size: 25px; font-weight: bold;" [autoResize]="true" #notes></textarea>
          <br>
          <br>
          <div class="row">
            <div class="col-md-12">
              <p-button label="ADD" *ngIf="notes_data == null" (click)="updateNotes()" styleClass="p-button-rounded p-button-success"></p-button>
              <p-button label="EDIT" *ngIf="notes_data != null" (click)="updateNotes()" styleClass="p-button-rounded p-button-success"></p-button>
              <p-button mat-dialog-close label="SAVE" *ngIf="showSave" (click)="saveNotes(notes.value)" styleClass="p-button-rounded p-button-success"></p-button>
            </div>
          </div>
      </p-card>
    </div>
    <p-toast></p-toast>
  `,
  styles: [
  ],
  providers: [
    MessageService,
  ]
})
export class ShowNotesComponent {
  //declaration of variables for data get from signed component
  notes_data: any;
  app_id: any;
  user_id: any;
  collegeConfirmation: any;

  showSave: boolean = false;
  isDisabled: boolean = true;
  token: any;
  admin_email: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    protected api: ApiService,
    private messageService: MessageService,
  ){}

  ngOnInit(): void{
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    this.notes_data = this.data.notes_data;
    this.app_id = this.data.app_id;
    this.user_id = this.data.user_id;
    this.collegeConfirmation = this.data.collegeConfirmation;
    console.log('dddddddddddd',this.notes_data);
    
  }

  updateNotes(){
    this.isDisabled = false;
    this.showSave = true;
  }

  saveNotes(value: any){
    this.api.updateNotes(value, this.app_id, this.user_id, this.admin_email).subscribe((data: any)=>{
      if(data['status'] == 200){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
      }
    })
  }
}
