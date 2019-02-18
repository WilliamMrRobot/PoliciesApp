import { UtilitiesService } from './../../services/utilities.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [UtilitiesService, CustomerService, DashboardService],
})
export class ClientsComponent implements OnInit {
  public source: LocalDataSource;

  public settings = {
    actions: {
      add: false,
      edit: false,
      delete: true,
      editable: false,
      custom: [
        {
          name: 'Details',
          title: `<i  class="nb-paper-plane"></i>`,
          width: '10%',
        },
      ],
      columnTitle: '',
    },
    add: {
      inputClass: '',
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      position: 'right',
      confirmSave: true,
      editButtonContent: '<i class="nb-edit" style="width":"10px"></i>',
      saveButtonContent: '<i class="nb-checkmark" style="width":"10px"></i>',
      cancelButtonContent: '<i class="nb-close" style="width":"10px"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      position: 'right',
      confirmDelete: true,
    },
    pager: {
      display: true,
      perPage: 100,
    },
    columns: {
      email: { title: 'Full Name', type: 'string', width: '45%' },
      userName: { title: 'e-mail', type: 'string', width: '45%' },
    },
  };

  constructor(
    private customer: CustomerService,
    private _dasboardService: DashboardService,
    private router: Router,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this._dasboardService
      .getObjectsList('users', this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.source.load(result);
          } else {
            this.utilities.openSimpleModal(
              'Error',
              'Error, please try later',
              this.viewContainer,
            );
          }
        },
        error => {
          this.utilities.openSimpleModal(
            'Error',
            'Error, please try later',
            this.viewContainer,
          );
        },
      );
  }

  onCustom(event) {
    const userId = event.data.id;
    const urlDest = '/admin/profile/' + userId;
    this.router.navigateByUrl(urlDest);
  }
}
