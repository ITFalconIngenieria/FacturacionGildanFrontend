import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServidorDTO, ServidorModel } from '../models/servidor';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(
    private http: HttpClient
  ) { }

  getServidores(){
    return this.http.get<ServidorModel>(`${ apiUrl }/servidors`);
  }

  postServidor(servidor: ServidorDTO){
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/servidors`, servidor)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateServidor(servidor: ServidorDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/servidors/${ id }`, servidor)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteServidor(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/servidors/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }
}
