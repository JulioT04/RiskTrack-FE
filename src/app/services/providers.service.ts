import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  providersPath: string = environment.providersPath ;
  constructor(private http: HttpClient ) { }
    getProviders(): Observable<Provider[]>{
      return this.http.get<Provider[]>(`${this.providersPath}Providers`);
    }
    getProviderById(id: string){
      return this.http.get(this.providersPath + '/Providers/' + id);
    }
    registerProvider(provider : Provider){
      return this.http.post<Provider>(`${this.providersPath}Providers`,provider);
    } 
    updateProvider(id:any,provider : Provider){
      return this.http.put<Provider>(`${this.providersPath}Providers/${id}`,provider);
    }
    deleteProvider(id: any){
      return this.http.delete(`${this.providersPath}Providers/${id}`);
    }
}
