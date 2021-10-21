import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PlantaDTO } from '../models/planta';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(
    private http: HttpClient
  ) { }

  getPlanta() {
    return this.http.get(`${apiUrl}/plantas/`);
  }

  postPlanta(planta: PlantaDTO){
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/plantas`, planta)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updatePlanta(planta: PlantaDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/plantas/${ id }`, planta)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deletePlanta(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/plantas/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }

  // postPlanta(planta: any) {
  //   return this.http.post(`${apiUrl}/plantas/`, planta);
  // }

  // putPlanta(planta: any, id: any) {
  //   return this.http.put(`${apiUrl}/plantas/${id}`, planta);
  // }

  // deletePlanta(planta: any, id: any) {
  //   return this.http.patch(`${apiUrl}/plantas/${id}`, planta);
  // }

}
