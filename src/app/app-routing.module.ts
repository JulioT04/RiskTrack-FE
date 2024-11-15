import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersTableComponent } from './components/providers-table/providers-table.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent },
  {path: 'providers', component: ProvidersTableComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
