import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { DashboardService } from './../../services/dashboard.service';
import { Policy } from './policy';
import { NgForm } from '@angular/forms';
import { UtilitiesService } from '../../services/utilities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'policy',
  styleUrls: ['./policy.component.scss'],
  templateUrl: './policy.component.html',
  providers: [DashboardService, UtilitiesService],
})
export class PolicyComponent implements OnInit {
  public policyId: String;
  policy = new Policy(0, '', '', '', '', '', '', '');
  coverages: any[];
  allcoverages: any[];
  risks: any[];
  closeResult: string;
  alertRisk: boolean;

  constructor(
    private dashboard: DashboardService,
    private customer: CustomerService,
    private viewContainer: ViewContainerRef,
    private utilities: UtilitiesService,
    private route: ActivatedRoute,
  ) {
    this.policyId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadCoverages();
    this.loadRisks();
    this.alertRisk = false;
    if (this.policyId) this.loadPolicy();
  }

  loadPolicy() {
    this.dashboard
      .getObjectsList('Policies/' + this.policyId, this.customer.getToken())
      .subscribe(
        result => {
          if (result) {
            this.policy = result;
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
    if (this.policyId) {
      this.editPolicy(form);
    } else {
      this.savePolicy(form);
    }
  }

  savePolicy(form: NgForm) {
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

  editPolicy(form: NgForm) {
    this.dashboard
      .updatePolicy(
        'Policies/' + this.policyId,
        this.customer.getToken(),
        this.policy,
      )
      .subscribe(
        result => {
          if (result === 'ok') {
            this.utilities.openSimpleModal(
              'Attention',
              'Policy was updated',
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
