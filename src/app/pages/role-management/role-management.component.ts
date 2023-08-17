import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSubAdminComponent } from '../dialog/add-sub-admin/add-sub-admin.component';
import { ViewSubAdminRolesComponent } from '../dialog/view-sub-admin-roles/view-sub-admin-roles.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class RoleManagementComponent {

  filterText: string = "";
  rolesData: any;
  color = 'accent';
  checked: boolean = true;
  disabled: boolean = false;
  rolesLength: any;
  token: any;
  admin_email: any;
  ref: DynamicDialogRef;
  @ViewChild('dt1') dt1: Table;
  @ViewChild('local') local!: ElementRef;
  
  constructor(
    protected api: ApiService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    //get user details from localstorage
    this.token = JSON.parse(localStorage.getItem('user')!);
    this.admin_email = this.token.data.user.user_email;

    this.api.getRolesData().subscribe((data: any) => {
      if (data['status'] == 200) {
        this.rolesData = data['data'];
        this.rolesLength = this.rolesData.length;
      }
    })
  }

  // filterData() {
  //   console.log('filt', this.filterText);

  //   if (this.filterText) {
  //     this.rolesData = this.rolesData.filter((roles: any) =>
  //       roles.srNo.toString().includes(this.filterText.toString()) || roles.name.toLowerCase().includes(this.filterText.toLowerCase()) || roles.email.toLowerCase().includes(this.filterText.toLowerCase())
  //     );
  //     this.rolesLength = this.rolesData.length;
  //   } else {
  //     this.rolesData = this.rolesData;
  //   }
  // }

  handleFilterChange() {
    this.dt1?.filterGlobal(this.filterText, 'contains');

    console.log("this.dt1", this.dt1);
    console.log("this.dt1.filteredValue>>", this.dt1.filteredValue.length)
    // console.log("this.dt1._totalRecords>>", this.dt1._totalRecords)

    this.rolesLength = this.dt1.filteredValue.length;
    // this.rolesLength = this.dt1._totalRecords;

  }

  clear(table: Table) {
    table.clear();
    this.local.nativeElement.value = '';
  }

  addSubAdminComponent(type: any, id: any) {
    this.ref = this.dialogService.open(AddSubAdminComponent, {
      data: {
        function_type: type,
        user_id: id,
      },
      header: 'Add New Sub-Admin',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
    });
  }

  viewMore(roles: any, id: any) {
    const dialogRef = this.dialog.open(ViewSubAdminRolesComponent, {
      data: {
        rolesData: roles,
        user_id: id,
      }
    }).afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  toggleChanged(event: any, data: any) {
    this.confirmationService.confirm({
      message: 'Are you sure want to change status?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',

      accept: () => {
        this.api.activeinactiveStudent(event, data, this.admin_email).subscribe((data: any) => {
          if (data['status'] == 200) {
            console.log('success');
            if (data['data'] == 'active') {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: data.message });
            }
          } else {
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: data.message });
          }
        })
      },

      reject: () => {
        this.confirmationService.close();
        this.ngOnInit();
      }
    })
  }
}
