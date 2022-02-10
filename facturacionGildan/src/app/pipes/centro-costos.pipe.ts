import { Pipe, PipeTransform } from '@angular/core';
import { CentroCostosModel } from '../models/centro-costos';

@Pipe({
  name: 'centroCostos'
})
export class CentroCostosPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {

    let centroCosto = args.filter((item: CentroCostosModel) => item.id == value);

    //console.log( value + ' - ' + medidor[0].codigo );

    return centroCosto[0].descripcion;
  }

}
