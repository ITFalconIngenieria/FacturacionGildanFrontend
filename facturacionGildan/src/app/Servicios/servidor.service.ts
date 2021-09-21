import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ServidorModel } from '../models/servidor';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ServidorService {

  constructor(
    private http: HttpClient
  ) { }

  getServidores(){
    return this.http.get(`${ apiUrl }/servidors`);
  }

  postServidor(servidor: ServidorModel){
    return this.http.post(`${ apiUrl }/servidors`, servidor);
  }
}
