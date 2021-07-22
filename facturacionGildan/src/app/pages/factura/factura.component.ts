import { Component, OnInit } from '@angular/core';
import { MedidorService } from '../../Servicios/medidor.service';
import { PlantasService } from './../../Servicios/plantas.service';
import { FacturaService } from '../../Servicios/factura.service';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';

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
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  ChartLabels: any;
  ChartType: any
  ChartLegend: any
  ChartData: any;
  ChartData2: any;
  ChartOptions: any
  fechaDia: Date = new Date();
  diasPeriodo: any;
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
  visible: boolean = false;
  detalleConsumo: any[] = [];
  historicoConsumo: any[] = [];
  calculoConsumo: any[] = [];
  totalApagar: number = 0;
  totalConsumo: number = 0;
  constructor(
    private servicePlanta: PlantasService,
    private serviceMedidor: MedidorService,
    private serviceFactura: FacturaService,
    private spinner: NgxSpinnerService
  ) { }


  ngOnInit() {

    this.serviceMedidor.getMedidor()
      .toPromise()
      .then((data: any) => {
        this.listMedidores = [...data];
        console.log(this.listMedidores);


        this.servicePlanta.getPlanta()
          .toPromise()
          .then((datos: any) => {
            this.listPlantas = [...datos]
          })
      });

    this.ChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'HISTORICO DE CONSUMO/DEMANDA'
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          }
        }
      }
    };

    this.ChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    this.ChartType = 'bar';
    this.ChartLegend = true;

    this.ChartData = [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'kWh',
        type: 'bar',
        backgroundColor: ['#0289e259', '#0289e259', '#0289e259', '#0289e259', '#0289e259', '#0289e259', '#fa4646'],
        borderColor: '#0289e259'
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'kW',
        type: 'line',
        backgroundColor: '#ffcfcfb6',
        borderColor: '#f50b0b'
      }
    ];

  }

  mostrar() {
    this.spinner.show();

    this.serviceFactura.getDatosFactura(
      this.fecha1.toISOString(),
      this.fecha2.toISOString(),
      this.medidores
    )
      .toPromise()
      .then((data: any) => {
        this.diasPeriodo = moment(this.fecha2).diff(moment(this.fecha1), 'days')

        console.log(data);
        this.detalleConsumo = data[0];
        this.calculoConsumo = data[1];
        this.historicoConsumo = { ...data[2] };


        this.detalleConsumo.forEach(y => {
          this.totalConsumo += y.consumo;
        })

        this.totalApagar = (this.totalConsumo * this.calculoConsumo[0].rateConsumoEnergia) + this.calculoConsumo[0].totalOtrosCargos + this.calculoConsumo[0].totalDemanda
        this.visible = true;
        this.spinner.hide();

      },
        (error) => {
          console.log(error);

          this.visible = false;
          this.spinner.hide();
        })
  }

  excel() {
    console.log('excel');

  }

  imprimir() {
    console.log('imprimir');

  }

  changeMedidores(event: any[]) {
    this.medidoresPlanta = [];
    this.plantasOP = [];
    event.forEach(id => {
      this.plantasOP.push(...this.listPlantas.filter(x => x.id === id));
      this.medidoresPlanta.push(...this.listMedidores.filter(y => y.id === id));
      console.log();

    });
    console.log(this.medidoresPlanta, this.plantasOP);


  }

}
