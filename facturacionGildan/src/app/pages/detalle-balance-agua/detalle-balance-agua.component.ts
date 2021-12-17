import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

interface Person {
  id: number;
  planta: string;
  consumo: number;
  produccion: number;
}

@Component({
  selector: 'app-detalle-balance-agua',
  templateUrl: './detalle-balance-agua.component.html',
  styleUrls: ['./detalle-balance-agua.component.css']
})
export class DetalleBalanceAguaComponent implements OnInit {

  listOfData: Person[] = [
    {
      id: 1,
      planta: 'R1.R1.MM.001',
      consumo: 250000,
      produccion: 280000
    },
    {
      id: 2,
      planta: 'R2.R2.MM.001',
      consumo: 250000,
      produccion: 280000
    },
    {
      id: 3,
      planta: 'R2.R2.MM.002',
      consumo: 250000,
      produccion: 280000
    },
    {
      id:4,
      planta: 'R3.R3.MM.001',
      consumo: 250000,
      produccion: 280000
    }
  ];

  totalConsumo: number = 0;
  totalProduccion: number = 0;
  totalDiferencia: number = 0;
  chartHistoricoBalanceAgua: any = [];
  chartHistoricoDemanda: any = [];

  constructor() { }

  ngOnInit(): void {

    this.graficoCombinadoBarraLineal();
    this.graficoLineal();

    for(let item of this.listOfData){

      this.totalConsumo += item.consumo;
      this.totalProduccion += item.produccion;

    }

    this.totalDiferencia = this.totalProduccion - this.totalConsumo;

  }


   graficoCombinadoBarraLineal() {
    this.chartHistoricoBalanceAgua = new Chart('canvasHistoricoDetalleBalanceAgua', {
      type: 'bar',
      data: {
        datasets: [{
            type: 'bar',
            label: 'Consumo',
            data: [10, 20, 30, 40],
            borderWidth: 3,
            backgroundColor: '#d06058',
            borderColor: '#d06058',
            order: 2
        }, {
            type: 'line',
            label: 'Produccion',
            data: [5, 15, 35, 33],
            borderWidth: 3,
            fill: false,
            backgroundColor: 'rgba(93, 175, 89, 0.1)',
            borderColor: '#3e95cd',
            order: 1
        }],
        labels: ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
    });
  }

  graficoLineal() {
    this.chartHistoricoDemanda = new Chart('canvasHistoricoDemanda', {
      type: 'line',
      data: {
        labels: ['Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Demanda',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          //tension: 0.1
        }]
      },
    });
  }

}
