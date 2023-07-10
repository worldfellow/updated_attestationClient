import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-wes-applications',
  templateUrl: './wes-applications.component.html',
  styleUrls: ['./wes-applications.component.css']
})
export class WesApplicationsComponent implements OnInit {
  filterText: any;
  wesApplication:any;
  first: number = 0;
  rows: number = 10;
  totalCount:number;

  @ViewChild('id') id!: ElementRef;
  @ViewChild('name') name!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  constructor(protected api: ApiService, private router: Router) {

  }

  ngOnInit(): void {
  this.refresh("","","","",10,0)
  }

/**get Wes application Data through api in refresh function */
  refresh(id:any,name:string,email:any,wesno:any,limit:number,offset:number){
    this.api.getWesApplication(id,name,email,wesno,limit,offset).subscribe((data:any)=>{
      
      if(data){
        this.wesApplication = data['data'];
        this.totalCount = data['count'];
      }

    })
  }
  filterData() {

  }
/**To clear the input search Box and return the Value*/
  clear() {
    this.id.nativeElement.value = '';
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
      this.refresh("","","","",10,0)
  }

  /**SearchWes function to get Data based on searched value */
  searchWes(id: any, name: any, email: any,wesno : any) { 
    this.refresh(id,name,email,wesno,10,0)
  }

  /**Pagination function to get Data according to that page */
  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    let offset = this.first
    let limit = this.rows 
    this.refresh("","","","",limit,offset)
  }
}
