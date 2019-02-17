import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
  ],
  declarations: [RegisterPageComponent],
  exports: [
    RegisterPageComponent,
  ],
})
export class RegisterPageModule { }
