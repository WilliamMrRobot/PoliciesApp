import { UtilitiesService } from './../../services/utilities.service';
import { Component, ViewContainerRef } from '@angular/core';
import { CONST } from '../../utils/globalUtils';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

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
      delete: true,
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
      name: { title: 'Name', type: 'string', width: '22%' },
      startValidity: { title: 'Start Validity', type: 'string', width: '22%' },
      coverageName: { title: 'Coverage', type: 'string', width: '22%' },
      riskName: { title: 'Risk', type: 'string', width: '22%' },
    },
  };

  constructor(
    private customer: CustomerService,
    private _dashboardService: DashboardService,
    private route: ActivatedRoute,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {
    this.source = new LocalDataSource();
    this.sourceUserPolicies = new LocalDataSource();
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUser();
  }

  ngOnInit() {
    this.loadPolicies();
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

  loadPolicies() {
    this._dashboardService
      .getObjectsList('policies', this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.source.load(result);
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

  onDeleteConfirmPolicy(event) {
    const policyId = event.data.id;
    this._dashboardService
      .desAssociatePolicyApplication(
        'userpolicies/' + policyId,
        this.customer.getToken(),
      )
      .subscribe(
        result => {
          if (result) {
            this.utilities.openSimpleModal(
              'Attention',
              'User Policy deleted',
              this.viewContainer,
            );
            this.loadUserPolicies();
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        },
      );
  }

  onSaveData(event) {
    let policiesIdToAssociate: String[];
    policiesIdToAssociate = [];
    for (let obj in this.policiesToAdmin) {
      let policyId = this.policiesToAdmin[obj].id;
      policiesIdToAssociate.push(policyId);
    }

    const applicationData = {
      PolicyIds: policiesIdToAssociate,
      UserId: this.userId,
    };

    this._dashboardService
      .associatePoliciesApplication(
        'UserPolicies',
        this.customer.getToken(),
        applicationData,
      )
      .subscribe(
        result => {
          if (result) {
            this.utilities.openSimpleModal(
              'Attention',
              'User Policy saved',
              this.viewContainer,
            );
            this.ngOnInit();
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        },
      );

    console.log('onSaveData' + this.policiesToAdmin.length);
  }
}
