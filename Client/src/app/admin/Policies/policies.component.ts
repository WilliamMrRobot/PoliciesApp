import { UtilitiesService } from '../../services/utilities.service';
import { Component, ViewContainerRef } from '@angular/core';
import { CONST } from '../../utils/globalUtils';
import { LocalDataSource } from 'ng2-smart-table';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
  providers: [UtilitiesService, DashboardService, CustomerService],
})
export class PoliciesComponent {
  private idApplication: String;
  private policiesToAdmin: any[];
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
          title: `<i  class="nb-edit"></i>`,
          width: '10%',
        },
      ],
      columnTitle: 'Options',
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

  constructor(
    private customer: CustomerService,
    private _dashboardService: DashboardService,
    private router: Router,
    private utilities: UtilitiesService,
    private viewContainer: ViewContainerRef,
  ) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this._dashboardService
      .getObjectsList('Policies', this.customer.getToken())
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

  onCreateUpdateConfirm(event) {}

  onCustom(event) {
    const policyId = event.data.id;
    const urlDest = '/admin/edit/' + policyId;
    this.router.navigateByUrl(urlDest);
  }

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.onDeleteConfirmClient(event);
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirmClient(event) {
    const policyId = event.data.id;
    this._dashboardService
      .deleteClient('Policies/' + policyId, this.customer.getToken())
      .subscribe(
        result => {
          console.log('onSaveData OKKKKKK');
          if (result === 'ok') {
            this.utilities.openSimpleModal(
              'Attention',
              'Policy deleted',
              this.viewContainer,
            );
            this.loadPolicies();
          } else {
            this.utilities.openSimpleModal('Error', result, this.viewContainer);
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
}
