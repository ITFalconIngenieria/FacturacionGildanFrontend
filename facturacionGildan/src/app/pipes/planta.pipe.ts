import { Pipe, PipeTransform } from '@angular/core';
import { PlantaModel } from '../models/planta';

@Pipe({
  name: 'planta'
})
export class PlantaPipe implements PipeTransform {

  transform(value: any, args?: any): unknown {

    let planta = args.filter((item: PlantaModel) => item.id == value);

    //console.log( value + ' - ' + medidor[0].codigo );

    return planta[0].codigo + ' - ' + planta[0].nombre;
  }

}
