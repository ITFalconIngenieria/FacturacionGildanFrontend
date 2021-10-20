import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(
    private nzMessageService: NzMessageService,
    private nzNotificationService: NzNotificationService
  ) { }

  createMessage(tipoMensaje: string, mensaje: string): void {
    this.nzMessageService.create(tipoMensaje, mensaje);
  }

  createNotification(type: string, titulo: string, mensaje: string): void {
    this.nzNotificationService.create(
      type,
      titulo,
      mensaje
    );
  }
}
