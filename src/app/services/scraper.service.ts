import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScraperService {
  scraperPath: string = environment.scraperPath ;
  constructor(private http: HttpClient) { 
  }
  scrapeProviders(provider: string, database: number): Observable<any[]>{
    return this.http.get<any[]>(
      `${this.scraperPath}?entityName=${provider}&databaseName=${database}`
    );
  }
}
