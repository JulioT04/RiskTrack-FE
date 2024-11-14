import { Component, OnInit, ViewChild } from '@angular/core';
import { Provider } from '../../models/provider';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProvidersService } from '../../services/providers.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProviderDialogComponent } from '../edit-provider-dialog/edit-provider-dialog.component';
import { CreateProviderDialogComponent } from '../create-provider-dialog/create-provider-dialog.component';
import { ProviderScreeningDialogComponent } from '../provider-screening-dialog/provider-screening-dialog.component';

@Component({
  selector: 'app-providers-table',
  templateUrl: './providers-table.component.html',
  styleUrl: './providers-table.component.scss'
})
export class ProvidersTableComponent implements OnInit{
  displayedColumns: string[] = ['id', 'tradeName', 'tid','phoneNumber', 'email','website', 'address','country','anualRevenue','lastEditedDate','options',];
  dataSource = new MatTableDataSource<Provider>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private providersService: ProvidersService, private dialog: MatDialog) {
    
  }
  ngOnInit(): void {
    this.loadProviders();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sort({ id: 'lastEditedDate', start: 'desc', disableClear: true });
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadProviders() {
    this.providersService.getProviders().subscribe({
      next: (data: Provider[]) => {
        this.dataSource.data = data;
        console.log(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => console.error('Error loading providers', err)
    });
  }
  createProvider(){
    const dialogRef = this.dialog.open(CreateProviderDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo proveedor creado:', result);
        this.providersService.registerProvider(result).subscribe(() => {
          this.loadProviders(); 
        });
      }
    });
  }

  editProvider(provider: Provider){
    const dialogRef = this.dialog.open(EditProviderDialogComponent, {
      width: '600px',
      data: { ...provider } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Proveedor editado:', result);
        
        this.providersService.updateProvider(result.id, result).subscribe(() => {
          this.loadProviders();
        });
      }
    });
  }
  deleteProvider(providerId: number) {
    console.log('Eliminando proveedor con ID:', providerId);

    this.providersService.deleteProvider(providerId).subscribe({
      next: () => {
        console.log(`Proveedor con ID ${providerId} eliminado`);
        this.loadProviders();
      },
      error: (err) => console.error('Error eliminando proveedor:', err)
    });
  }
  matchProvider(providerName: string){
    this.dialog.open(ProviderScreeningDialogComponent, {
      data: { entityName: providerName },
      width: '600px'
    });
  }
}
