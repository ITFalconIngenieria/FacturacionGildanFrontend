import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuentaDTO, CuentaModel } from '../models/cuenta';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(
    private http: HttpClient
  ) { }

  getCuentas(){
    return this.http.get<CuentaModel>(`${ apiUrl }/cuentas`);
  }

  postCuenta(cuenta: CuentaDTO){
    //console.log(jerarquia);
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/cuentas`, cuenta)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateCuenta(cuenta: CuentaDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/cuentas/${ id }`, cuenta)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteCuenta(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/cuentas/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }
}
