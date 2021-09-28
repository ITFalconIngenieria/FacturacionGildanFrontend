import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private nzMessageService: NzMessageService
  ) { }

  createMessage(tipoMensaje: string, mensaje: string): void {
    this.nzMessageService.create(tipoMensaje, mensaje);
  }
}
