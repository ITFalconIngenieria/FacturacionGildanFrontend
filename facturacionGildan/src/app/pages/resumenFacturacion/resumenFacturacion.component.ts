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
  preciokwh: number = 2.95905;
  preciokw: number = 252.462;
  alumbrado: number = 9319.15;
  otro: number = 25103.42;
  bch: number = 24.0940;
  gildan: number = 0;
  tiempo: string = '';
  fecha1: any = new Date;
  fecha2: any = new Date;
  fechas: any = null;
  habilitarfecha: boolean = true;
  dataExport: any[] = [];
  energiaConsumida: any[] = [];
  energiaSumistrada: any[] = [];
  rateDemanda: number = 0;
  rateEnergia: number = 0;
  rateOtrosCargos: number = 0;
  totalesEnergia: any[] = [];
  totalEneBECO: number = 0;
  totalDemBECO: number = 0;
  costoTotalEnergiaSuministrada: number = 0.00;
  costoEnergiaBeco: number = 0.00;
  costoDemandaBeco: number = 0.00;
  costoEnergiaEnee: number = 0.00;
  costoDemandaEnee: number = 0.00;
  costoOtrosCargos: number = 0.00;
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
    let totalCostoEnergia: number = 0.00;
    let totalPerdidaLps: number = 0.00;
    let totalCostoMasPerdidaLps: number = 0.00;

    if ((this.fechas == null && this.tiempo == '11') || this.tiempo == '') {
      //this.createNotification();
      alert('Por favor, ingrese los parametros solicitados');
      this.spinner.hide();

    } else {

      switch (this.tiempo) {
        // case '1': {
        //   console.log(moment().startOf('day').format('YYYY-MM-DD HH:mm'), moment().format('YYYY-MM-DD HH:mm'));
        //   this.fecha1 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
        //   this.fecha2 = moment().format('YYYY-MM-DD HH:mm');
  
        //   break;
        // }
        // case '2': {
        //   console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm'));
        //   this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
        //   this.fecha2 = moment().add(-1, 'day').endOf('day').format('YYYY-MM-DD HH:mm');
  
        //   break;
        // }
        case '1': {
          console.log(moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'), moment().startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment().add(-1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment().startOf('day').format('YYYY-MM-DD HH:mm')
          break;
        }
        case '2': {
          console.log(moment(moment().startOf('week')).format('YYYY-MM-DD HH:mm'), moment().startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment(moment().startOf('week')).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '3': {
          console.log(moment().startOf('year').format('YYYY-MM-DD HH:mm'), moment().startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment().startOf('year').format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '4': {
          console.log(moment(moment().startOf('week').subtract(1, 'week')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment(moment().startOf('week').subtract(1, 'week')).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '5': {
          console.log(moment(moment().startOf('week').subtract(2, 'week')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment(moment().startOf('week').subtract(2, 'week')).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(moment().endOf('week').subtract(1, 'week')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '6': {
          console.log(moment().startOf('month').format('YYYY-MM-DD HH:mm'), moment().startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment().startOf('month').format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment().startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '7': {
          console.log(moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('month').subtract(1, 'month')).add(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment(moment().startOf('month').subtract(1, 'month')).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(moment().endOf('month').subtract(1, 'month')).add(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '8': {
          console.log(moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm'));
          console.log(moment(moment().endOf('year').subtract(1, 'year')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm'));
          this.fecha1 = moment(moment().startOf('year').subtract(1, 'year')).format('YYYY-MM-DD HH:mm');
          this.fecha2 = moment(moment().endOf('year').subtract(1, 'year')).add(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm');
          break;
        }
        case '9': {
          this.fecha1 = this.fechas[0];
          this.fecha2 = this.fechas[1];

          break;
        }
        default: {
          this.fecha1 = this.fechas[0];
          this.fecha2 = this.fechas[1];

          break;
        }
      }
  
      this.serviceResumen.getDetalleResumen(
        new Date(moment(this.fecha1).subtract(6,'hours').format()).toISOString(),
        new Date(moment(this.fecha2).subtract(6,'hours').format()).toISOString(),
        this.preciokwh, this.preciokw, this.alumbrado, this.otro, this.bch, this.gildan
      )
        .toPromise()
        .then((data: any) => {
  
          //console.log(data);
          this.energiaConsumida = [...data[0].energiaConsumida];
          this.energiaSumistrada = [...data[0].energiaSuministrada];
          this.rateEnergia = data[0].rateEnergiaCalculado;
          this.rateDemanda = data[0].rateDemandaCalculado;
          this.rateOtrosCargos = data[0].rateOtrosCargosCalculado;
  
          this.costoEnergiaBeco = ( this.energiaSumistrada[0].energia * ( ( ( this.preciokwh / this.bch )  - 0.005 ) * this.bch ) );
          this.costoEnergiaEnee = ( this.energiaSumistrada[1].energia * this.preciokwh );
  
          this.costoDemandaBeco = ( this.energiaSumistrada[0].demanda * this.preciokw );
          this.costoDemandaEnee = ( this.energiaSumistrada[1].demanda * this.preciokw );
  
          this.costoOtrosCargos = this.energiaSumistrada[2].otrosCargos;
  
          this.costoTotalEnergiaSuministrada = this.costoEnergiaBeco + this.costoEnergiaEnee + this.costoDemandaBeco + this.costoDemandaEnee + this.costoOtrosCargos;
  
          this.energiaConsumida.forEach(y => {
            totEnergia += y.energiaConsumida;
            totPerdidas += y.perdidas;
            difEnerPerd += (y.energiaConsumida + y.perdidas);
            totalCostoEnergia += y.energiaConsumida * ( this.rateEnergia + this.rateDemanda + this.rateOtrosCargos );
            totalPerdidaLps += y.perdidas * ( this.rateEnergia + this.rateDemanda + this.rateOtrosCargos );
            totalCostoMasPerdidaLps += (y.energiaConsumida + y.perdidas) * ( this.rateEnergia + this.rateDemanda + this.rateOtrosCargos );
  
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
            'COSTO ENERGÍA (Lps)': this.formatearNumber(totalCostoEnergia),
            'PERDIDAD (Lps)': this.formatearNumber(totalPerdidaLps),
            'COSTO + PERDIDAD (Lps)': this.formatearNumber(totalCostoMasPerdidaLps)
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
            totalCostoEnergia,
            totalPerdidaLps,
            totalCostoMasPerdidaLps,
          ];
  
          this.rellenarGrafico();
  
          this.visible = true;
          this.spinner.hide();
  
        },
          (error) => {
            console.log(error);
  
            this.visible = false;
            this.spinner.hide();
          });

    }

    
  }

  rellenarGrafico(): void {
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];

    this.energiaConsumida.forEach( item => {
      //Se obtiene el valor del costo + perdida en Lempiras por plantas.
      let costoMasPerdidasLps: number = 0;
      costoMasPerdidasLps = ( item.energiaConsumida + item.perdidas ) * ( this.rateEnergia + this.rateDemanda + this.rateOtrosCargos );

      this.doughnutChartLabels.push(item.nombrePlanta);
      this.doughnutChartData.push(costoMasPerdidasLps);
    });
    
    this.doughnutChartType = 'doughnut';

    this.colors = [
      '#d06058',
      '#366647',
      '#f53794',
      '#537bc4',
      '#712b3f',
      '#008c9c',
      '#72312a',
      '#66365d',
      '#6f4a2d',
      '#40326a',
      '#244a78',
      '#712b3f',
      '#6b5e31',
      '#00779c',
      '#712b3f',
    ];
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

  changeFecha(event: any) {
    //console.log('Entro Resumen.')
    this.habilitarfecha = (event == 9) ? false : true;
  }

}
