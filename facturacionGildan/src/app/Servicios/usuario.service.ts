import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginDTO } from '../models/Usuario';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: LoginDTO){

    return this.http.post(`${ apiUrl }/users/login`, user);

  }

  loginAD(user: LoginDTO){

    return this.http.post(`${ apiUrl }/users/loginAD`, user);

  }


}
