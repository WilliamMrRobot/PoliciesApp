import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { LogoutPageComponent } from './logout-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
  ],
  declarations: [LogoutPageComponent],
  exports: [
    LogoutPageComponent,
  ],
})
export class LogoutPageModule { }
