import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [MessageService],
})
export class PaymentsComponent {
  filterText: string = "";
  paymentData: any;
  paymentLength: any;
  originalEvent: Event;
  files: File[];

  constructor(){}

  ngOnInit(): void{}

  filterTable(){}

  onBasicUploadAuto(event: any){}
}
