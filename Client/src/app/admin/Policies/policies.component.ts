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
      coverageId: { title: 'COVERAGE', type: 'string', width: '14%' },
      riskId: { title: 'RISK', type: 'string', width: '14%' },
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

  onCreateUpdateConfirm(event) {
    let hotelsIdToAssociate: String[];
    hotelsIdToAssociate = [];
    for (let obj in this.policiesToAdmin) {
      let hotelId = this.policiesToAdmin[obj]._id;
      hotelsIdToAssociate.push(hotelId);
    }

    const applicationData = {
      hotels: hotelsIdToAssociate,
      application: this.idApplication,
    };

    this._dashboardService
      .associateHotelsApplication(
        'application-associate-hotels',
        this.customer.getToken(),
        applicationData,
      )
      .subscribe(
        result => {
          console.log('onSaveData OKKKKKK');
          if (result.message === 'OK') {
            this.utilities.openSimpleModal(
              'Attention',
              'Hotel Saved',
              this.viewContainer,
            );
            const urlDest = '/admin/application';

            this.router.navigateByUrl(urlDest);
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
}
