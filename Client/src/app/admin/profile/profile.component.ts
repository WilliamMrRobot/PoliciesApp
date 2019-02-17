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
  providers: [UtilitiesService, CustomerService, DashboardService],
})
export class ProfileComponent {
  public userId: String;
  public hotelsToAdmin: any[];
  public username: String;
  public email: String;

  public source: LocalDataSource;
  public sourceMyHotels: LocalDataSource;

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
      hotel: { title: 'Name', type: 'string', width: '35%' },
      country: { title: 'Country', type: 'string', width: '25%' },
      city: { title: 'City', type: 'string', width: '25%' },
      brand: { title: 'Brand', type: 'string', width: '5%' },
      marsha: { title: 'Marsha', type: 'string', width: '10%' },
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
      hotel: { title: 'Name', type: 'string', width: '35%' },
      country: { title: 'Country', type: 'string', width: '25%' },
      city: { title: 'City', type: 'string', width: '25%' },
      brand: { title: 'Brand', type: 'string', width: '5%' },
      marsha: { title: 'Marsha', type: 'string', width: '10%' },
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
    this.sourceMyHotels = new LocalDataSource();
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
            this.username = result.name;
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
      .getObjectsList('hotels/' + this.userId, this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.sourceMyHotels = result;
          } else {
            this.showError();
          }
        },
        error => {
          this.showError();
        },
      );
  }

  loadHotels() {
    this._dashboardService
      .getObjectsList('hotels/application', this.customer.getToken())
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
    this.hotelsToAdmin = event.selected;
  }

  onDeleteConfirmMyHotel(event) {
    const idHotel = event.data._id;
    this._dashboardService
      .desAssociateHotelsApplication(
        'des-associate-hotel/' + idHotel,
        this.customer.getToken(),
      )
      .subscribe(
        result => {
          console.log('onSaveData OKKKKKK');
          if (result) {
            this.utilities.openSimpleModal(
              'Attention',
              'Hotel deleted',
              this.viewContainer,
            );
            this.loadMyHotels();
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
    let hotelsIdToAssociate: String[];
    hotelsIdToAssociate = [];
    for (let obj in this.hotelsToAdmin) {
      let hotelId = this.hotelsToAdmin[obj]._id;
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
          if (result) {
            this.utilities.openSimpleModal(
              'Attention',
              'Hotel saved',
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

    console.log('onSaveData' + this.hotelsToAdmin.length);
  }
}
