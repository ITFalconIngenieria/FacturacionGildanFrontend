import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JerarquiaDTO, JerarquiaModel } from '../models/jerarquia';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class JerarquiaService {

  constructor(
    private http: HttpClient
  ) { }

  getJerarquias(){
    return this.http.get<JerarquiaModel>(`${ apiUrl }/jerarquias`);
  }

  postJerarquia(jerarquia: JerarquiaDTO){
    //console.log(jerarquia);
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/jerarquias`, jerarquia)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateJerarquia(jerarquia: JerarquiaDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/jerarquias/${ id }`, jerarquia)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteJerarquia(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/jerarquias/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }
}
