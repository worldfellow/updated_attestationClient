import { Component, EventEmitter, Output  } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/api.service';
import { DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';


@Component({
  selector: 'app-notes',
  template: `
  <div>
      <textarea rows="10" cols="50" pInputTextarea [(ngModel)]="notes_data" [disabled]="isDisabled" style="font-size: 25px; font-weight: bold;" [autoResize]="true" #notes></textarea>
      <br>
      <br>
      <div class="row">
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
  providers: [
    MessageService,
  ]
})
export class NotesComponent {
  notes_data: any;
  app_id: any;
  user_id: any;
  collegeConfirmation: any;

  showSave: boolean = false;
  isDisabled: boolean = true;
  token: any;
  admin_email: any;
  data: any;
  type:string;

  @Output() notesSaved = new EventEmitter<any>();
  constructor( 
    protected api: ApiService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig, 
  ){
    this.data = config.data;
  }
  ngOnInit(): void{
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    this.notes_data = this.data.notes_data;
    this.app_id = this.data.app_id;
    this.user_id = this.data.user_id;
    this.collegeConfirmation = this.data.collegeConfirmation;
    this.type = this.data.type;  
  }

  updateNotes(){
    this.isDisabled = false;
    this.showSave = true;
  }

  saveNotes(value: any){  
    this.api.updateNotes(value, this.app_id, this.user_id, this.admin_email,this.type).subscribe((data: any)=>{  
      if (data['status'] == 200) {
        this.notesSaved.emit(data['status']);
        this.ref.close(data['status']);
      }else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Details Not Updated!' });
      }
    })
  }
}
