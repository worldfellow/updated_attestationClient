import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSubAdminComponent } from '../dialog/add-sub-admin/add-sub-admin.component';
import { ViewSubAdminRolesComponent } from '../dialog/view-sub-admin-roles/view-sub-admin-roles.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
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
        console.log('================>', this.rolesData);
        this.rolesLength = this.rolesData.length;
      }
    })
  }

  filterData() {
    console.log('filt', this.filterText);

    if (this.filterText) {
      this.rolesData = this.rolesData.filter((roles: any) =>
        roles.srNo.toString().includes(this.filterText.toString()) || roles.name.toLowerCase().includes(this.filterText.toLowerCase()) || roles.email.toLowerCase().includes(this.filterText.toLowerCase())
      );
      this.rolesLength = this.rolesData.length;
    } else {
      this.rolesData = this.rolesData;
    }
  }

  addSubAdminComponent(type: any, id: any) {
    this.ref = this.dialogService.open(AddSubAdminComponent, {
      data: {
        function_type: type,
        user_id: id,
      },
      header: 'Verify OTP',
      width: '40%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
    });
    // const dialogRef = this.dialog.open(AddSubAdminComponent, {
    //   data: {
    //     function_type: type,
    //     user_id: id,
    //   }
    // }).afterClosed().subscribe(result => {
    //   this.ngOnInit();
    // });
  }

  // filterData() { }

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
