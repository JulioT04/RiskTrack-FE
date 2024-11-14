import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ProvidersTableComponent } from './components/providers-table/providers-table.component';
import { EditProviderDialogComponent } from './components/edit-provider-dialog/edit-provider-dialog.component';
import { CreateProviderDialogComponent } from './components/create-provider-dialog/create-provider-dialog.component';
import { ProviderScreeningDialogComponent } from './components/provider-screening-dialog/provider-screening-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProvidersTableComponent,
    EditProviderDialogComponent,
    CreateProviderDialogComponent,
    ProviderScreeningDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
