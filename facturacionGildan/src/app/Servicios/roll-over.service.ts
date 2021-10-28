import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RollOverDTO, RollOverModel } from '../models/roll-over';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RollOverService {

  constructor(
    private http: HttpClient
  ) { }

  getRollOvers(){
    return this.http.get<RollOverModel>(`${ apiUrl }/roll-over-logs`);
  }

  postRollOver(rollOver: RollOverDTO){
    //console.log(jerarquia);
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/roll-over-logs`, rollOver)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateRollOver(rollOver: RollOverDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/roll-over-logs/${ id }`, rollOver)
        .subscribe( resp => {
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve(false);
        });
    });
  }

  deleteRollOver(id: number){
    return new Promise( resolve => {
      this.http.delete(`${ apiUrl }/roll-over-logs/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }
}
