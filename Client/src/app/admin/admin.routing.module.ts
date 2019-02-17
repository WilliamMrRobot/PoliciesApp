import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { NeedAuthGuard } from '../auth.guard';
import { PoliciesComponent } from './policies/policies.component';
import { PolicyComponent } from './policy/policy.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'policies',
        component: PoliciesComponent,
        canActivate: [NeedAuthGuard],
      },
      {
        path: 'new',
        component: PolicyComponent,
        canActivate: [NeedAuthGuard],
      },
      {
        path: 'clients',
        component: ClientsComponent,
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
export class AdminRoutingModule {}
