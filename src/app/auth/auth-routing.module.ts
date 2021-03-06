import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetpasswordComponent } from "./components/resetpassword/resetpassword.component";
import { ChangePasswordComponent } from "./components/change-password/change-password.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { ValidationGuard } from '../validation/validation.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {ZinbucksComponent} from "./components/zinbucks/zinbucks.component";


const routes: Routes = [
  {
    path: '', canActivate: [ValidationGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'reset-password', component: ResetpasswordComponent, canActivate: [ValidationGuard] },
      { path: 'reset-password/:user_id/:verification_code', component: ChangePasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
      { path: 'zinbucks', component: ZinbucksComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
