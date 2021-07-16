import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../Servicios/medidor.service';
import { PlantasService } from './../../Servicios/plantas.service';

@Component({
  selector: 'app-resumenFacturacion',
  templateUrl: './resumenFacturacion.component.html',
  styleUrls: ['./resumenFacturacion.component.css']
})
export class ResumenFacturacionComponent implements OnInit {
  inputValue = '';
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
  planta: any[]=[];
  medidor: number = 0;
  tiempo: string = '';
  fecha1: any = new Date;
  fecha2: any = new Date;

  medidores: any[] = [];
  plantas: Array<{
    id: 0;
    nombre: string;
    codigo: string;
    estado: true
  }> = [];

  listOfOption: any[] = [];
  singleValue = 'a10';
  multipleValue = ['a10', 'c12'];
  tagValue = ['a10', 'c12', 'tag'];

  constructor(
    private servicePlanta: PlantasService,
    private serviceMedidor: MedidorService
  ) { }

  ngOnInit() {

    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;

    this.plantas = [];
    this.serviceMedidor.getMedidor()
      .toPromise()
      .then((data: any) => {
        this.medidores = [...data]

        this.servicePlanta.getPlanta()
          .toPromise()
          .then((datos: any) => {
            console.log(datos);
            
            this.plantas = [...datos]
            console.log(this.plantas, this.medidores);


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

    switch (this.tiempo) {
      case '1': {



        break;
      }
      case '2': {

        break;
      }
      case '3': {

        break;
      }
      case '4': {

        break;
      }
      case '5': {

        break;
      }
      case '6': {

        break;
      }
      case '7': {

        break;
      }
      case '8': {

        break;
      }
      case '9': {

        break;
      }
      default:
        break;
    }

  }

  excel() {
    console.log('excel');

  }

  imprimir() {
    console.log('imprimir');

  }



}
