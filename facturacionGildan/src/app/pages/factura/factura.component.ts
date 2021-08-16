import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MedidorService } from '../../Servicios/medidor.service';
import { PlantasService } from './../../Servicios/plantas.service';
import { FacturaService } from '../../Servicios/factura.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
moment.locale('es');
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface MedidorPlanta {
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
  @ViewChild('content', { static: true }) content!: ElementRef;

  ChartLabels: any[] = [];
  ChartType: any;
  ChartLegend: any;
  ChartData: any;
  ChartData2: any;
  ChartOptions: any;
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
  listMedidores: any[] = [];
  medidoresPlanta: MedidorPlanta[] = [];
  plantasOP: any[] = [];
  listPlantas: any[] = [];
  visible: boolean = false;
  detalleConsumo: any[] = [];
  historicoConsumo: any[] = [];
  calculoConsumo: any[] = [];
  totalApagar: number = 0;
  totalConsumo: number = 0;
  dataExport: any[] = [];
  habilitarfecha: boolean = true;
  fechaInicio: any;
  fechaFin: any;
  fechas: any = null;

  constructor(
    private servicePlanta: PlantasService,
    private serviceMedidor: MedidorService,
    private serviceFactura: FacturaService,
    private spinner: NgxSpinnerService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  createMessage(): void {
    this.message.create('error', `No se puedo extraer los datos para factura`);
  }

  ngOnInit(): void {

    this.serviceMedidor.getMedidor()
      .toPromise()
      .then((data: any) => {
        this.listMedidores = [...data];
        this.servicePlanta.getPlanta()
          .toPromise()
          .then((datos: any) => {
            this.listPlantas = [...datos];
          });
      });

    this.ChartType = 'bar';
    this.ChartLegend = true;

    this.ChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'HISTORICO DE CONSUMO/DEMANDA'
      },
      scales: {
        xAxes: [{
          barPercentage: 0.8,
          gridLines: {
            display: false,
          },
          ticks: {
            minRotation: 0,
            maxRotation: 0,
            autoSkip: true
          }
        }],
        yAxes: [{
          id: 'A',
          type: 'linear',
          position: 'left',
          ticks: {
            beginAtZero: true,
            callback: (label: any, index: any, labels: any) => {
              return Intl.NumberFormat().format(label);
            }
          }
        }, {
          id: 'B',
          type: 'linear',
          position: 'right',
          ticks: {
            beginAtZero: true,
            callback: (label: any, index: any, labels: any) => {
              return Intl.NumberFormat().format(label);
            }
          }
        }]
      },
      legend: {
        display: true
      },
      tooltips: {
        enabled: true
      }
    };

  }

  createNotification(): void {
    this.notification.create(
      'warning',
      'Falla en generación de datos',
      'Debe seleccionar todos los parámetros requeridos'
    );

  }

  mostrar(): void {
    this.spinner.show();
    this.dataExport = [];
    console.log(this.tiempo);
    

    if ((this.fechas == null && this.tiempo == '11') || this.medidores.length == 0 || this.tiempo == '') {
      this.createNotification();
      this.spinner.hide();

    } else {

      switch (this.tiempo) {
        case '1': {
          console.log(moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment().startOf('day').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().format('YYYY-MM-DD HH:mm');

          break;
        }
        case '2': {
          console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm');

          break;
        }
        case '3': {
          console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().format('YYYY-MM-DD HH:mm')
          break;
        }
        case '4': {
          console.log(moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().format('YYYY-MM-DD HH:mm');
          break;
        }
        case '5': {
          console.log(moment().startOf('year').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment().startOf('year').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().format('YYYY-MM-DD HH:mm');
          break;
        }
        case '6': {
          console.log(moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
          this.fechaFin = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
          break;
        }
        case '7': {
          console.log(moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '8': {
          console.log(moment().startOf('month').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment().startOf('month').format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment().format('YYYY-MM-DD HH:mm');
          break;
        }
        case '9': {
          console.log(moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
          break;
        }
        case '10': {
          console.log(moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
          this.fechaInicio = moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
          this.fechaFin = moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
          break;
        }
        case '11': {
          this.fechaInicio = this.fechas[0];
          this.fechaFin = this.fechas[1];

          break;
        }
        default: {
          this.fechaInicio = this.fechas[0];
          this.fechaFin = this.fechas[1];

          break;
        }
      }

      this.serviceFactura.getDatosFactura(
        new Date(moment(this.fechaInicio).subtract(12,'hours').format()).toISOString(),
        new Date(moment(this.fechaFin).subtract(12,'hours').format()).toISOString(),
        this.medidores
      )
        .toPromise()
        .then((data: any) => {

          console.log(data);

          this.diasPeriodo = moment(this.fechaFin).diff(moment(this.fechaInicio), 'days');

          this.detalleConsumo = data[0];
          this.calculoConsumo = data[1];
          this.historicoConsumo = [...data[2]];

          this.detalleConsumo.forEach(y => {
            this.totalConsumo += y.consumo;
          });

          this.ChartLabels = [...this.historicoConsumo.map(m => moment(m.fecha).format('MMMM'))].reverse();
          this.ChartData = [
            {
              data: [...this.historicoConsumo.map(v => v.energiaActiva)].reverse(),
              label: 'kWh',
              type: 'bar',
              backgroundColor: ['#4799dc', '#4799dc', '#4799dc', '#4799dc', '#4799dc', '#4799dc', '#fa4646'],
              borderColor: '#003d6f',
              yAxisID: 'A'
            },
            {
              data: [...this.historicoConsumo.map(v => v.demanda)].reverse(),
              label: 'kW',
              type: 'line',
              backgroundColor: '#ffcfcfb6',
              borderColor: '#f50b0b',
              yAxisID: 'B',
            }
          ];

          // tslint:disable-next-line: max-line-length
          this.totalApagar = (this.totalConsumo * this.calculoConsumo[0].rateConsumoEnergia) + this.calculoConsumo[0].totalOtrosCargos + this.calculoConsumo[0].totalDemanda;
          this.dataExport = [
            {
              ' ': 'Medidor',
              'LECTURA ACTUAL': moment(this.fechas[0]).format('YYYY-MM-DD HH:mm a'),
              'LECTURA ANTERIOR': moment(this.fechas[1]).format('YYYY-MM-DD HH:mm a'),
              '  ': 'Diferencia',
              '   ': 'Consumo',
            }];

          this.detalleConsumo.forEach(m => {
            this.dataExport = [...this.dataExport,
            {
              ' ': m.medidor,
              // tslint:disable-next-line: max-line-length
              'LECTURA ACTUAL': this.formatearNumber(m.lecturaActual),
              // tslint:disable-next-line: max-line-length
              'LECTURA ANTERIOR': this.formatearNumber(m.lecturaAnterior),
              '  ': this.formatearNumber(m.diferencia),
              '   ': this.formatearNumber(m.consumo),
            }];
          });

          this.dataExport = [...this.dataExport,
          {
            ' ': '',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': '',
            '  ': 'TOTAL ENERGIA ACTIVA',
            '   ': this.formatearNumber(this.totalConsumo),
          },
          {
            ' ': '',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': '',
            '  ': 'TOTAL ENERGIA ACTIVA',
            '   ': this.formatearNumber(1234),
          },
          {
            ' ': '',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': '',
            '  ': '',
            '   ': '',
          },
          {
            ' ': 'CARGO',
            'LECTURA ACTUAL': 'RATE (L.)',
            'LECTURA ANTERIOR': 'CONSUMO (KwH)',
            '  ': 'TOTAL (L.)',
            '   ': '',
          },
          {
            ' ': 'ENERGÍA ACTIVA',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': this.formatearNumber(this.totalConsumo),
            '  ': '',
            '   ': '',
          },
          {
            ' ': 'PERDIDAS',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': this.formatearNumber(this.calculoConsumo[0].perdidas),
            '  ': '',
            '   ': '',
          },
          {
            ' ': 'COSTO ENERGIA',
            // tslint:disable-next-line: max-line-length
            'LECTURA ACTUAL': new Intl.NumberFormat('en-us', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(this.calculoConsumo[0].rateConsumoEnergia),
            'LECTURA ANTERIOR': '',
            '  ': this.formatearNumber(this.calculoConsumo[0].rateConsumoEnergia * this.totalConsumo),
            '   ': '',
          },
          {
            ' ': 'DEMANDA',
            // tslint:disable-next-line: max-line-length
            'LECTURA ACTUAL': new Intl.NumberFormat('en-us', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(this.calculoConsumo[0].rateDemanda),
            'LECTURA ANTERIOR': '',
            '  ': this.formatearNumber(this.calculoConsumo[0].totalDemanda),
            '   ': '',
          },
          {
            ' ': 'OTROS CARGOS/CRÉDITOS',
            // tslint:disable-next-line: max-line-length
            'LECTURA ACTUAL': new Intl.NumberFormat('en-us', { minimumFractionDigits: 4, maximumFractionDigits: 4 }).format(this.calculoConsumo[0].rateOtrosCargos),
            'LECTURA ANTERIOR': '',
            '  ': this.formatearNumber(this.calculoConsumo[0].totalOtrosCargos),
            '   ': ''
          },
          {
            ' ': 'TOTAL A PAGAR',
            'LECTURA ACTUAL': '',
            'LECTURA ANTERIOR': this.formatearNumber(this.totalConsumo + this.calculoConsumo[0]?.perdidas),
            '  ': this.formatearNumber(this.totalApagar),
            '   ': ''
          },
          ];

          this.visible = true;
          this.spinner.hide();

        },
          (error) => {
            console.log(error);
            this.createMessage();
            this.visible = false;
            this.spinner.hide();
          });

    }

  }

  formatearNumber(numero: number) {
    return new Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numero);
  }

  excel(): void {
    console.log('excel');
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataExport);

      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `Factura ${moment(this.fechaDia).format('YYYY-MM-DD')}`);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION);
    });
  }


  imprimir(): void {
    this.spinner.show();
    console.log('imprimir');
    const div: any = document.getElementById('content');

    const options = {
      background: 'white',
      scale: 3
    };

    // const divs: any[] = [div, anexo];
    const doc = new jsPDF('p', 'mm', 'a4', true);

    html2canvas(div, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      // Add image Canvas to PDF
      const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      (doc as any).addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');

      return doc;
    }).then((doc) => {
      doc.save(`factura.pdf`);
      this.spinner.hide();
    });

  }

  changeMedidores(event: any[]): void {
    this.medidoresPlanta = [];
    this.plantasOP = [];
    event.forEach(id => {
      this.plantasOP.push(...this.listPlantas.filter(x => x.id === id));
      this.medidoresPlanta.push(...this.listMedidores.filter(y => y.id === id));
    });
  }

  changeFecha(event: any) {
    this.habilitarfecha = (event == 11) ? false : true;
  }

}
