import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CentroCostosDTO, CentroCostosModel } from '../models/centro-costos';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CentroCostosService {

  constructor(
    private http: HttpClient
  ) { }

  getCentroCostos(){
    return this.http.get<CentroCostosModel>(`${ apiUrl }/centro-costos`);
  }

  postCentroCostos(centroCostos: CentroCostosDTO){
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/centro-costos`, centroCostos)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateCentroCostos(centroCostos: CentroCostosDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/centro-costos/${ id }`, centroCostos)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteCentroCostos(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/centro-costos/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }

}
