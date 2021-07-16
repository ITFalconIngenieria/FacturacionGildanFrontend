import { Component, OnInit, NgZone } from '@angular/core';
import { MedidorService } from '../../Servicios/medidor.service';
import { PlantasService } from '../../Servicios/plantas.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  ChartLabels: any;
  ChartType: any
  ChartLegend: any
  ChartData: any
  ChartOptions: any

  preciokwh: number = 0;
  preciokw: number = 0;
  alumbrado: number = 0;
  otro: number = 0;
  bch: number = 0;
  gildan: number = 0;
  planta: number = 0;
  medidor: number = 0;
  tiempo: string = '';
  fecha1: any = new Date;
  fecha2: any = new Date;

  medidores: any[] = [];
  platas: any[] = [];


  constructor(
    private servicePlanta: PlantasService,
    private serviceMedidor: MedidorService
  ) { }


  ngOnInit() {

    this.serviceMedidor.getMedidor()
      .toPromise()
      .then((data: any) => {
        this.medidores = [...data]

        this.servicePlanta.getPlanta()
          .toPromise()
          .then((datos: any) => this.platas = datos)
      });


    this.ChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    this.ChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.ChartType = 'line';
    this.ChartLegend = true;
    this.ChartData = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];
  }

  mostrar() {
    console.log('mostrar');

  }

  excel() {
    console.log('excel');

  }

  imprimir() {
    console.log('imprimir');

  }

}
