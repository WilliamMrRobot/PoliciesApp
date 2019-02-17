import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin.routing.module';
import { PoliciesModule } from './policies/policies.module';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

const ADMIN_COMPONENTS = [AdminComponent];

@NgModule({
  imports: [
    AdminRoutingModule,
    PoliciesModule,
    ThemeModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
  ],
  declarations: [...ADMIN_COMPONENTS],
})
export class AdminModule {}
