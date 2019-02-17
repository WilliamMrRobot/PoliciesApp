import { NbDatepickerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { PolicyComponent } from './policy.component';

@NgModule({
  imports: [ThemeModule, FormsModule, NbDatepickerModule],
  declarations: [PolicyComponent],
  providers: [],
})
export class PolicyModule {}
