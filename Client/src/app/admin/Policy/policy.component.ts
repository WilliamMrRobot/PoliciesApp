import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from './../../services/dashboard.service';
import { Policy } from './policy';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'policy',
  styleUrls: ['./policy.component.scss'],
  templateUrl: './policy.component.html',
  providers: [DashboardService, UtilitiesService],
})
export class PolicyComponent implements OnInit {
  constructor(
    private dashboard: DashboardService,
    private customer: CustomerService,
    private viewContainer: ViewContainerRef,
    private utilities: UtilitiesService,
  ) {}

  policy = new Policy(0, '', '', '', '', '', '', '');
  coverages: any[];
  allcoverages: any[];
  risks: any[];
  closeResult: string;
  alertRisk: boolean;

  ngOnInit() {
    this.loadCoverages();
    this.loadRisks();
    this.alertRisk = false;
  }

  loadCoverages() {
    this.dashboard
      .getObjectsList('Coverages', this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.coverages = result;
            this.allcoverages = result;
          } else {
            this.utilities.openSimpleModal(
              'Error',
              'Error, please try later',
              this.viewContainer,
            );
          }
        },
        error => {},
      );
  }

  loadRisks() {
    this.dashboard.getObjectsList('Risks', this.customer.getToken()).subscribe(
      result => {
        if (result) {
          this.risks = result;
        } else {
          this.utilities.openSimpleModal(
            'Error',
            'Error, please try later',
            this.viewContainer,
          );
        }
      },
      error => {},
    );
  }

  onSubmit(form: NgForm) {
    this.dashboard
      .savePolicy('Policies', this.customer.getToken(), this.policy)
      .subscribe(
        result => {
          if (result === 'ok') {
            form.reset();
            this.utilities.openSimpleModal(
              'Attention',
              'Policy was saved',
              this.viewContainer,
            );
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

  onChangeRisk(risk: string) {
    this.alertRisk = risk === '4' ? true : false;
  }
}
