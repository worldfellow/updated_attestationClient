import { Component, Output, EventEmitter } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-payment-notes',
  template: `
  <div>
    <textarea rows="10" cols="50" pInputTextarea [(ngModel)]="notes_data" [disabled]="isDisabled" style="font-size: 25px; font-weight: bold;" [autoResize]="true" #notes></textarea>
    <br>
    <br>
    <div class="row" *ngIf="readOnly != true">
      <div class="col-md-12">
        <p-button label="ADD" *ngIf="notes_data == null" (click)="updateNotes()" styleClass="p-button-rounded p-button-success"></p-button>
        <p-button label="EDIT" *ngIf="notes_data != null" (click)="updateNotes()" styleClass="p-button-rounded p-button-success"></p-button>
        <p-button label="SAVE" *ngIf="showSave" (click)="saveNotes(notes.value)" styleClass="p-button-rounded p-button-success"></p-button>
      </div>
    </div>
  </div>
  <p-toast></p-toast>
  `,
  styles: [
  ],
})
export class PaymentNotesComponent {
  isDisabled: boolean = true;
  showSave: boolean = false;
  notes_data: any;
  tracker: any;
  user_id: any;
  issue_id: any;
  @Output() notesSaved = new EventEmitter<any>();
  readOnly: any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, 
    protected api: ApiService,
  ){}

  ngOnInit(): void{
    this.notes_data = this.config.data.notesData;
    this.readOnly = this.config.data.readOnly;
    
    this.tracker = this.config.data.tracker;
    this.user_id = this.config.data.user_id;
    this.issue_id = this.config.data.issue_id;
  }

  updateNotes(){
    this.isDisabled = false;
    this.showSave = true;
  }

  saveNotes(value: any){  
    this.api.updatePaymentNotes(value, this.user_id, this.tracker, this.issue_id).subscribe((data: any)=>{  
      this.notesSaved.emit(data);
      this.ref.close(data);
    })
  }
}
