import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConsumibleDTO, ConsumibleModel } from '../models/consumible';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ConsumibleService {

  constructor(
    private http: HttpClient
  ) { }

  getConsumibles(){
    return this.http.get<ConsumibleModel>(`${ apiUrl }/consumibles`);
  }

  postConsumible(consumible: ConsumibleDTO){
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/consumibles`, consumible)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateConsumible(consumible: ConsumibleDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/consumibles/${ id }`, consumible)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteConsumible(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/consumibles/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }

}
