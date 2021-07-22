import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forkJoin, Observable } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  getDetalleConsumo(fechai: any, fechaf: any, medidores: any[]) {
    return this.http.post(`${apiUrl}/detalleConsumoEnergia/?fechai=${fechai}&fechaf=${fechaf}`, medidores);
  }

  getCalculoConsumo(fechai: any, fechaf: any, medidores: any[]) {
    return this.http.post(`${apiUrl}/calculoConsumoEnergia/?fechai=${fechai}&fechaf=${fechaf}`, medidores);
  }

  getDatosFactura(fechai: any, fechaf: any, medidores: any[]): Observable<any>{    
    return forkJoin (
      this.http.post(`${apiUrl}/detalleConsumoEnergia/?fechai=${fechai}&fechaf=${fechaf}`, medidores),
      this.http.post(`${apiUrl}/calculoConsumoEnergia/?fechai=${fechai}&fechaf=${fechaf}`, medidores),
      this.http.post(`${apiUrl}/historicoConsumoDemanda/?fechai=${fechai}&fechaf=${fechaf}`, medidores)

    );
  }

}
