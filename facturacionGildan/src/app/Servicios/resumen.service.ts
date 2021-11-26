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

  getDetalleResumen(fechai: any, fechaf: any, kwh: number, kw: number, alumbrado: number, otros: number, bch: number, gildan: number) {

    //console.log(`${apiUrl}/detalleResumen/?fechai=${fechai}&fechaf=${fechaf}&kwh=${kwh}&kw=${kw}&alumbrado=${alumbrado}&otros=${otros}&bch=${bch}&gildan=${gildan}`);

    return this.http.post(`${apiUrl}/detalleResumen/?fechai=${fechai}&fechaf=${fechaf}&kwh=${kwh}&kw=${kw}&alumbrado=${alumbrado}&otros=${otros}&bch=${bch}&gildan=${gildan}`, []);
  }

}
