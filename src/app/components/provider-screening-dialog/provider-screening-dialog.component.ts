import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ScraperService } from '../../services/scraper.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { finalize } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-provider-screening-dialog',
  templateUrl: './provider-screening-dialog.component.html',
  styleUrl: './provider-screening-dialog.component.scss'
})
export class ProviderScreeningDialogComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  databases = [
    { value: 0, name: 'World Bank' },
    { value: 1, name: 'OFAC' },
    { value: 2, name: 'Offshore Leaks' },
  ];

  searchResults: any[] = [];  
  searchCompleted = false;    
  
  entityName: string ;
  databaseName: number = 0;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  results: any[] = [];
  verificationMessage: string | null = null;
  loading: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ProviderScreeningDialogComponent>,
    private scraperService: ScraperService,
  ) {
    console.log('Datos recibidos en el diálogo:', data);
    this.entityName = data.entityName; 
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5; // O el tamaño que prefieras
      this.paginator.pageSizeOptions = [5, 10, 25, 100];
    }
  }

  search() {
    this.searchCompleted = false;  // Reinicia la visibilidad del mensaje
    this.searchResults = [];
    console.log(this.entityName);
    console.log(this.databaseName);
    this.loading = true; // Activar indicador de carga
    this.scraperService
      .scrapeProviders(this.entityName, this.databaseName)
      .pipe(finalize(() => (this.loading = false))) // Desactivar indicador al finalizar
      .subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.displayedColumns = Object.keys(data[0]);
            this.dataSource = new MatTableDataSource(data);
            setTimeout(() => {
              if (this.paginator) {
                this.dataSource.paginator = this.paginator;
                console.log('DataSource actualizado:', this.dataSource.data); // Para debug
              }
            });
            this.searchCompleted = true;
          } else {
            this.dataSource.data = [];
            this.displayedColumns = [];
            this.searchCompleted = true; 
            this.snackBar.open('No se encontraron resultados', 'Cerrar', {
              duration: 3000,
            });
          }
        },
        (error) => {
          console.error(error);
          this.loading = false;
          this.snackBar.open('Ocurrió un error en la búsqueda.', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
      });
        }
      );
  }


  closeDialog() {
    this.dialogRef.close();
  }
}
