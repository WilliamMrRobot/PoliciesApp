import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { ClientsComponent } from './clients.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule, Ng2CompleterModule],
  declarations: [ClientsComponent],
})
export class ClientsModule {}
