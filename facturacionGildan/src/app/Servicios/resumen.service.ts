import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forkJoin, Observable } from 'rxjs';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  constructor(private http: HttpClient) { }

  getDetalleResumen(fechai: any, fechaf: any) {
    return this.http.post(`${apiUrl}/detalleResumen/?fechai=${fechai}&fechaf=${fechaf}`, []);
  }

}
