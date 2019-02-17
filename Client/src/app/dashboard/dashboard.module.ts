import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { PoliciesModule } from './policies/policies.module';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

const DASHBOARD_COMPONENTS = [DashboardComponent];

@NgModule({
  imports: [
    DashboardRoutingModule,
    PoliciesModule,
    ThemeModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
  ],
  declarations: [...DASHBOARD_COMPONENTS],
})
export class DashboardModule {}
