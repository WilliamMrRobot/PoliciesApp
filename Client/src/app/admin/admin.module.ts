import { ClientsModule } from './clients/clients.module';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { PoliciesModule } from './policies/policies.module';
import { PolicyModule } from './policy/policy.module';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NbDatepickerModule } from '@nebular/theme';

const ADMIN_COMPONENTS = [AdminComponent];

@NgModule({
  imports: [
    AdminRoutingModule,
    PoliciesModule,
    PolicyModule,
    ClientsModule,
    ThemeModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {}
