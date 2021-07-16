import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PlantasService {

  constructor(private http: HttpClient) { }

  getPlanta() {
    console.log(`${apiUrl}/plantas/`);
    
    return this.http.get(`${apiUrl}/plantas/`);
  }

  postPlanta(planta: any) {
    return this.http.post(`${apiUrl}/plantas/`, planta);
  }

  putPlanta(planta: any, id: any) {
    return this.http.put(`${apiUrl}/plantas/${id}`, planta);
  }

  deletePlanta(planta: any, id: any) {
    return this.http.patch(`${apiUrl}/plantas/${id}`, planta);
  }

}
