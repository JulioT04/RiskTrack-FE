import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvidersTableComponent } from './components/providers-table/providers-table.component';

const routes: Routes = [
  {path: 'providers', component: ProvidersTableComponent},
  {path: '**', redirectTo: 'providers'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
