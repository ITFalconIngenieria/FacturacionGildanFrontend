import { Pipe, PipeTransform } from '@angular/core';
import { MedidorModel } from '../models/medidor';

@Pipe({
  name: 'medidor'
})
export class MedidorPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {

    let medidor = args.filter((item: MedidorModel) => item.id == value);

    //console.log( value + ' - ' + medidor[0].codigo );

    return medidor[0].codigo;
  }

}
