import { NgModule } from '@angular/core';

import { ClientComponent } from './client.component';
import { ThemeModule } from '../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';
import { NbDatepickerModule } from '@nebular/theme';
import { ProfileModule } from './profile/profile.module';
import { ClientRoutingModule } from './client.routing.module';

const CLIENT_COMPONENTS = [ClientComponent];

@NgModule({
  imports: [
    ClientRoutingModule,
    ProfileModule,
    ThemeModule,
    Ng2SmartTableModule,
    Ng2CompleterModule,
    NbDatepickerModule.forRoot(),
  ],
  declarations: [...CLIENT_COMPONENTS],
})
export class ClientModule {}
