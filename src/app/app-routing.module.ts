import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpicorAuthGuardService } from './services/epicor-auth-guard.service';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';

const routes: Routes = [
  {
    path: 'Login',
    component: LoginComponent
  },
  {
    path: '',
    component:HomeComponent,
    canActivate:[EpicorAuthGuardService] //Checks to see whether the user has a valid Epicor token in its current local storage.
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
