import { Pipe, PipeTransform } from '@angular/core';
import { JerarquiaModel } from '../models/jerarquia';

@Pipe({
  name: 'jerarquia'
})
export class JerarquiaPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {

    let jerarquia = args.filter((item: JerarquiaModel) => item.id == value);

    //console.log( value + ' - ' + medidor[0].codigo );

    return jerarquia[0].descripcion;
  }

}
