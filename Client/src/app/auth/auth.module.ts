import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginPageModule } from './login/login-page.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { LogoutPageModule } from './logout/logout-page.module';
import { ForgotPageModule } from './forgot/forgot-page.module';
import { RegisterPageModule } from './register/register-page.module';

const AUTH_COMPONENTS = [AuthComponent];

@NgModule({
  imports: [
    AuthRoutingModule,
    ThemeModule,
    LoginPageModule,
    LogoutPageModule,
    ForgotPageModule,
    RegisterPageModule,
  ],
  declarations: [...AUTH_COMPONENTS],
})
export class AuthModule {}
