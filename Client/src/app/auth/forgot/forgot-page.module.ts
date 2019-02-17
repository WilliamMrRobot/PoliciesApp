import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ForgotPageComponent } from './forgot-page.component';

@NgModule({
  imports: [CommonModule, FormsModule, ThemeModule],
  declarations: [ForgotPageComponent],
  exports: [ForgotPageComponent],
})
export class ForgotPageModule {}
