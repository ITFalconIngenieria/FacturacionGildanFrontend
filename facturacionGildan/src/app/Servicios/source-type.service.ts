import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SourceTypeDTO, SourceTypeModel } from '../models/source-type';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class SourceTypeService {

  constructor(
    private http: HttpClient
  ) { }

  getSourceTypes(){
    return this.http.get<SourceTypeModel>(`${ apiUrl }/source-types`);
  }

  postServidor(sourceType: SourceTypeDTO){
    return new Promise( resolve => {
      this.http.post(`${ apiUrl }/source-types`, sourceType)
        .subscribe( resp => {
          //console.log(resp);
          resolve(true);
        }, err => {
          resolve(false);
        });
    });
  }

  updateServidor(sourceType: SourceTypeDTO, id: number){
    return new Promise( resolve => {
      this.http.put(`${ apiUrl }/source-types/${ id }`, sourceType)
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
      this.http.delete(`${ apiUrl }/source-types/${ id }`)
        .subscribe( resp =>{
          //console.log(resp);
          resolve( true );
        }, error => {
          resolve( false );
        });
    });
  }
}
