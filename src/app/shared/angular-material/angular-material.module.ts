import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
    declarations: [],
    imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatToolbarModule, MatIconModule,MatSortModule,
              MatPaginatorModule,BrowserAnimationsModule, MatDialogModule, FormsModule, MatSelectModule, MatOptionModule,
              MatProgressSpinnerModule,ReactiveFormsModule, MatSnackBarModule],
    exports: [MatTableModule, MatFormFieldModule,MatInputModule, MatButtonModule, MatToolbarModule,MatIconModule,MatSortModule,
              MatPaginatorModule,BrowserAnimationsModule, MatDialogModule, FormsModule, MatSelectModule, MatOptionModule,
              MatProgressSpinnerModule,ReactiveFormsModule, MatSnackBarModule],
    providers: [],
    bootstrap: []
})
export class AngularMaterialModule {}