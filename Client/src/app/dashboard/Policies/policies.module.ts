import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PoliciesComponent } from './policies.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2CompleterModule } from 'ng2-completer';

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule, Ng2CompleterModule],
  declarations: [PoliciesComponent],
})
export class PoliciesModule {}
