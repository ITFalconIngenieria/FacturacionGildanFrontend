import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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

  postMedidor(medidor: any) {
    return this.http.post(`${apiUrl}/medidors/`, medidor);
  }

  putMedidor(medidor: any, id: any) {
    return this.http.put(`${apiUrl}/medidors/${id}`, medidor);
  }

  deleteMedidor(medidor: any, id: any) {
    return this.http.patch(`${apiUrl}/medidors/${id}`, medidor);
  }

  getAllMedidores(){
    return this.http.get(`${ apiUrl }/medidors`);
  }

}
