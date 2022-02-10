import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DetalleMedidorDTO, MedidorDetalle, MedidorDTO, MedidorModel } from '../models/medidor';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MedidorService {

  constructor(private http: HttpClient) { }

  getMedidor() {
    return this.http.get(`${apiUrl}/plantas?filter={ 
      "include": [
        {
          "relation": "detalleMedidors",
          "scope": {
            "where":{"estado":true},     
            "include": [
              {
                "relation":"medidor",
                "scope": {
                  "where":{"estado":true}
                }
              }
            ]
          }
        }
      ]
    }`);
  }

  // postMedidor(medidor: any) {
  //   return this.http.post(`${apiUrl}/medidors/`, medidor);
  // }

  // putMedidor(medidor: any, id: any) {
  //   return this.http.put(`${apiUrl}/medidors/${id}`, medidor);
  // }

  // deleteMedidor(medidor: any, id: any) {
  //   return this.http.patch(`${apiUrl}/medidors/${id}`, medidor);
  // }

  getAllMedidores(){
    return this.http.get(`${ apiUrl }/medidors`);
  }

  getMedidores(){
    return this.http.get<MedidorModel>(`${ apiUrl }/medidors`);
  }

  getAllMedidoresConDetalle(){
    return this.http.get<MedidorDetalle>(`${ apiUrl }/medidoresConDetalle`);
  }

  postMedidor(medidor: MedidorDTO){

    return this.http.post(`${ apiUrl }/medidors`, medidor);
    // return new Promise( resolve => {
    //   this.http.post(`${ apiUrl }/medidors`, medidor)
    //     .subscribe( resp => {
    //       //console.log(resp);
    //       resolve(true);
    //     }, err => {
    //       resolve(false);
    //     });
    // });
  }

  updateMedidor(medidor: MedidorDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/medidors/${ id }`, medidor)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteMedidor(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/medidors/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }

  postDetalleMedidor(detalleMedidor: DetalleMedidorDTO){

    //console.log(detalleMedidor);

    return this.http.post(`${ apiUrl }/detalle-medidors`, detalleMedidor);

  }

  updateDetalleMedidor(detalleMedidor: DetalleMedidorDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/detalle-medidors/${ id }`, detalleMedidor)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteDetalleMedidor(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/detalle-medidors/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }

}
