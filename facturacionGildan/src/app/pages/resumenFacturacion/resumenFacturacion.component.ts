import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../Servicios/medidor.service';
import { PlantasService } from './../../Servicios/plantas.service';

interface medidorPlanta {
  id: number;
  nombre: string;
  codigo: string;
  estado: boolean;
  detalleMedidors?: DetalleMedidor[];
}

interface DetalleMedidor {
  id: number;
  operacion: boolean;
  unidad: string;
  unidadConversion: number;
  porcentaje: number;
  biomasa: number;
  fechaInicial: string;
  fechaFinal: string;
  estado: boolean;
  medidorId: number;
  jerarquiaId: number;
  plantaId: number;
  consumibleId: number;
  centroCostosId: number;
  medidor: Medidor;
}

interface Medidor {
  id: number;
  codigo: string;
  referenciaId: number;
  descripcion: string;
  ubicacion: string;
  multiplicador: number;
  formula: string;
  estado: boolean;
  servidorId: number;
  sourceTypeId: number;
}

@Component({
  selector: 'app-resumenFacturacion',
  templateUrl: './resumenFacturacion.component.html',
  styleUrls: ['./resumenFacturacion.component.css']
})
export class ResumenFacturacionComponent implements OnInit {
  doughnutChartLabels: any;
  doughnutChartData: any;
  doughnutChartType: any;
  colors: any[] = [];
  preciokwh: number = 0;
  preciokw: number = 0;
  alumbrado: number = 0;
  otro: number = 0;
  bch: number = 0;
  gildan: number = 0;
  plantas: any[] = [];
  medidores: any[] = [];
  tiempo: string = '';
  fecha1: Date = new Date;
  fecha2: Date = new Date;

  listMedidores: any[] = [];
  medidoresPlanta: medidorPlanta[] = [];
  plantasOP: any[] = [];
  listPlantas: any[] = [];

  constructor(
    private servicePlanta: PlantasService,
    private serviceMedidor: MedidorService
  ) { }

  ngOnInit() {

    this.serviceMedidor.getMedidor()
      .toPromise()
      .then((data: any) => {
        this.listMedidores = [...data]

        this.servicePlanta.getPlanta()
          .toPromise()
          .then((datos: any) => {
            this.listPlantas = [...datos]
          })
      });



    this.doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    this.doughnutChartData = [120, 150, 180, 90];
    this.doughnutChartType = 'doughnut';

    this.colors = [
      '#d06058',
      '#d06058',
      '#f53794',
      '#537bc4'
    ];
  }

  mostrar() {
    console.log('mostrar');
    console.log(this.fecha1.toISOString(), this.fecha2.toISOString(), this.medidores);
    

    // switch (this.tiempo) {
    //   case '1': {



    //     break;
    //   }
    //   case '2': {

    //     break;
    //   }
    //   case '3': {

    //     break;
    //   }
    //   case '4': {

    //     break;
    //   }
    //   case '5': {

    //     break;
    //   }
    //   case '6': {

    //     break;
    //   }
    //   case '7': {

    //     break;
    //   }
    //   case '8': {

    //     break;
    //   }
    //   case '9': {

    //     break;
    //   }
    //   default:
    //     break;
    // }

  }

  excel() {
    console.log('excel');

  }

  imprimir() {
    console.log('imprimir');

  }

  changeMedidores(event: any[]) {
    console.log(event);
    this.medidoresPlanta = [];
    event.forEach(id => {
      this.plantasOP.push(...this.listPlantas.filter(x => x.id === id));
      this.medidoresPlanta.push(...this.listMedidores.filter(y => y.id === id));

    });
    console.log(this.medidoresPlanta);


  }

}
