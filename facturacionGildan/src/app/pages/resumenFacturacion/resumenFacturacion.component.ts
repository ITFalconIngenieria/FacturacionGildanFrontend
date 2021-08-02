import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResumenService } from '../../Servicios/resumen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
moment.locale('es');
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resumenFacturacion',
  templateUrl: './resumenFacturacion.component.html',
  styleUrls: ['./resumenFacturacion.component.css']
})
export class ResumenFacturacionComponent implements OnInit {
  @ViewChild('content', { static: true }) content!: ElementRef;

  visible: boolean = false;
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
  tiempo: string = '';
  fecha1: any = new Date;
  fecha2: any = new Date;
  dataExport: any[] = [];
  energiaConsumida: any[] = [];
  energiaSumistrada: any[] = [];
  rateDemanda: number = 0;
  rateEnergia: number = 0;
  rateOtrosCargos: number = 0;
  totalesEnergia: any[] = [];
  totalEneBECO: number = 0;
  totalDemBECO: number = 0;
  constructor(
    private serviceResumen: ResumenService,
    private spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {


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

  formatearNumber(numero: number) {
    return new Intl.NumberFormat('en-us', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numero);
  }

  mostrar(): void {
    this.spinner.show();
    this.dataExport = [];
    let totEnergia: number = 0;
    let totPerdidas: number = 0;
    let difEnerPerd: number = 0;

    switch (this.tiempo) {
      case '1': {
        console.log(moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');

        break;
      }
      case '2': {
        console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm');

        break;
      }
      case '3': {
        console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm')
        break;
      }
      case '4': {
        console.log(moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '5': {
        console.log(moment().startOf('year').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('year').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '6': {
        console.log(moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm')
        break;
      }
      case '7': {
        console.log(moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('week').subtract(2, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').format('YYYY-MM-DD HH:mm');
        break;
      }
      case '8': {
        console.log(moment().startOf('month').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment().startOf('month').format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
        break;
      }
      case '9': {
        console.log(moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
        break;
      }
      case '10': {
        console.log(moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
        console.log(moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
        this.fecha1 = moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        this.fecha2 = moment(moment().endOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
        break;
      }
      default:
        break;
    }

    this.serviceResumen.getDetalleResumen(
      this.fecha1.toISOString(),
      this.fecha2.toISOString()
    )
      .toPromise()
      .then((data: any) => {

        console.log(data);
        this.energiaConsumida = [...data[0].energiaConsumida];
        this.energiaSumistrada = [...data[0].energiaSuministrada];
        this.rateEnergia = data[0].rateEnergiaCalculado;
        this.rateDemanda = data[0].rateDemandaCalculad;
        this.rateOtrosCargos = data[0].rateOtrosCargosCalculad;

        this.energiaConsumida.forEach(y => {
          totEnergia += y.energiaConsumida;
          totPerdidas += y.perdidas;
          difEnerPerd += (y.energiaConsumida + y.perdidas);


          this.dataExport = [...this.dataExport,
          {
            PLANTA: y.nombrePlanta,
            'ENERGÍA (kWh)': this.formatearNumber(y.energiaConsumida),
            'PERDIDAD (kWh)': this.formatearNumber(y.perdidas),
            'ENERGÍA + PERDIDAD (kWh)': this.formatearNumber((y.energiaConsumida + y.perdidas)),
            'COSTO ENERGÍA (Lps)': 0,
            'PERDIDAD (Lps)': 0,
            'COSTO + PERDIDAD (Lps)': 0
          }
          ];

        });

        this.totalEneBECO = this.energiaSumistrada[0].energia + this.energiaSumistrada[1].energia;
        this.totalDemBECO = this.energiaSumistrada[0].demanda + this.energiaSumistrada[1].demanda;

        this.dataExport = [...this.dataExport,
        {
          PLANTA: 'TOTAL ENERGIA ACTIVA',
          'ENERGÍA (kWh)': this.formatearNumber(totEnergia),
          'PERDIDAD (kWh)': this.formatearNumber(totPerdidas),
          'ENERGÍA + PERDIDAD (kWh)': this.formatearNumber(difEnerPerd),
          'COSTO ENERGÍA (Lps)': 0,
          'PERDIDAD (Lps)': 0,
          'COSTO + PERDIDAD (Lps)': 0
        }, {
          PLANTA: '',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': '',
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'BECO',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': '',
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'Energia',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': this.formatearNumber(this.energiaSumistrada[0].energia),
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'Demanda',
          'ENERGÍA (kWh)': this.formatearNumber(this.energiaSumistrada[0].demanda),
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'GILDAN',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': '',
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'Energia',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': this.formatearNumber(this.energiaSumistrada[1].energia),
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'Demanda',
          'ENERGÍA (kWh)': this.formatearNumber(this.energiaSumistrada[1].demanda),
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'Otros cargos',
          'ENERGÍA (kWh)': '',
          'PERDIDAD (kWh)': '',
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }, {
          PLANTA: 'TOTAL',
          'ENERGÍA (kWh)': this.formatearNumber(this.totalDemBECO),
          'PERDIDAD (kWh)':  this.formatearNumber(this.totalEneBECO),
          'ENERGÍA + PERDIDAD (kWh)': 0,
          'COSTO ENERGÍA (Lps)': '',
          'PERDIDAD (Lps)': '',
          'COSTO + PERDIDAD (Lps)': ''
        }
        ];

        this.totalesEnergia = [
          totEnergia,
          totPerdidas,
          difEnerPerd,
          0.00,
          0.00,
          0.00,
        ];

        this.visible = true;
        this.spinner.hide();

      },
        (error) => {
          console.log(error);

          this.visible = false;
          this.spinner.hide();
        });
  }

  excel(): void {
    console.log('excel');
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.dataExport);

      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, `Resumen-Factura ${moment().format('YYYY-MM-DD')}`);
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
      doc.save(`ResumenFactura.pdf`);
      this.spinner.hide();
    });

  }

}
