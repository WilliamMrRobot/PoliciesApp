import { UtilitiesService } from './../../services/utilities.service';
import { Component, ViewContainerRef } from '@angular/core';
import { CONST } from '../../utils/globalUtils';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [DashboardService, UtilitiesService, CustomerService],
})
export class ProfileComponent {
  public userId: String;
  public policiesToAdmin: any[];
  public username: String;
  public email: String;

  public source: LocalDataSource;
  public sourceUserPolicies: LocalDataSource;

  public settings = {
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      delete: false,
      editable: false,
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
      name: { title: 'NAME', type: 'string', width: '14%' },
      description: { title: 'DESCRIPTION', type: 'string', width: '14%' },
      startValidity: { title: 'START VALIDITY', type: 'string', width: '14%' },
      coverPeriod: { title: 'COVER PERIOD', type: 'string', width: '14%' },
      price: { title: 'PRICE', type: 'string', width: '14%' },
      coverageName: { title: 'COVERAGE', type: 'string', width: '14%' },
      riskName: { title: 'RISK', type: 'string', width: '14%' },
    },
  };

  public settingsUserPolicies = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      editable: false,

      columnTitle: '',
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
      name: { title: 'NAME', type: 'string', width: '14%' },
      description: { title: 'DESCRIPTION', type: 'string', width: '14%' },
      startValidity: { title: 'START VALIDITY', type: 'string', width: '14%' },
      coverPeriod: { title: 'COVER PERIOD', type: 'string', width: '14%' },
      price: { title: 'PRICE', type: 'string', width: '14%' },
      coverageName: { title: 'COVERAGE', type: 'string', width: '14%' },
      riskName: { title: 'RISK', type: 'string', width: '14%' },
    },
  };

  constructor(
    private customer: CustomerService,
    private _dashboardService: DashboardService,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {
    this.source = new LocalDataSource();
    this.sourceUserPolicies = new LocalDataSource();
    this.userId = this.customer.getId();
    this.loadUser();
  }

  ngOnInit() {
    this.loadUserPolicies();
  }

  showError() {
    this.utilities.openSimpleModal(
      'Error',
      'Error, please try later',
      this.viewContainer,
    );
  }

  loadUser() {
    this._dashboardService
      .getObjectsList('users/' + this.userId, this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.username = result.userName;
            this.email = result.email;
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        },
      );
  }

  loadUserPolicies() {
    this._dashboardService
      .getObjectsList('userpolicies/' + this.userId, this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.sourceUserPolicies = result;
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        },
      );
  }

  onUserRowSelect(event) {
    this.policiesToAdmin = event.selected;
  }
}
