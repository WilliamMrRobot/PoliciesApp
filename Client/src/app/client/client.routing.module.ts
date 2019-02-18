import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';
import { NeedAuthGuard } from '../auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [NeedAuthGuard],
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
