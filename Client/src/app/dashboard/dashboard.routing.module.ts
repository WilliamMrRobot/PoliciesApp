import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { NeedAuthGuard } from '../auth.guard';
import { PoliciesComponent } from './policies/policies.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'policies',
        component: PoliciesComponent,
        canActivate: [NeedAuthGuard],
      },
      {
        path: '',
        redirectTo: 'policies',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
