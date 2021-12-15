import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'

interface Person {
  id: number;
  planta: string;
  consumo: number;
  produccion: number;
}

@Component({
  selector: 'app-balance-agua',
  templateUrl: './balance-agua.component.html',
  styleUrls: ['./balance-agua.component.css']
})
export class BalanceAguaComponent implements OnInit {

  listOfData: Person[] = [
    {
      id: 1,
      planta: 'HONDURAS TEXTILES',
      consumo: 250000,
      produccion: 280000
    },
    {
      id: 2,
      planta: 'CHOLOMA TEXTILES',
      consumo: 250000,
      produccion: 280000
    },
    {
      id: 3,
      planta: 'HOSIERY FACTORY',
      consumo: 250000,
      produccion: 280000
    },
    {
      id:4,
      planta: 'SULA TEXTILES',
      consumo: 250000,
      produccion: 280000
    }
  ];

  totalConsumo: number = 0;
  totalProduccion: number = 0;
  totalDiferencia: number = 0;
  chartConsumo: any = [];
  chartProduccion: any = [];

  constructor() { }

  ngOnInit(): void {

    let totalCon = 0, totalProd, totalDif;

    //this.graficoLineal();
    //this.graficoCombinadoBarraLineal();
    this.graficoCircularConsumo();
    this.graficoCircularProduccion();

    for(let item of this.listOfData){

      this.totalConsumo += item.consumo;
      this.totalProduccion += item.produccion;

    }

    this.totalDiferencia = this.totalProduccion - this.totalConsumo;

  }

  // graficoLineal() {
  //   this.chartConsumo = new Chart('canvas', {
  //     type: 'line',
  //     data: {
  //       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: [12, 19, 3, 5, 2, 3],
  //           borderWidth: 3,
  //           fill: false,
  //           backgroundColor: 'rgba(93, 175, 89, 0.1)',
  //           borderColor: '#3e95cd'

  //         },
  //       ],
  //     },
  //   });
  // }

  graficoCircularConsumo() {
    this.chartConsumo = new Chart('canvasConsumo', {
      type: 'doughnut',
      data: {
        labels: this.listOfData.map(item => item.planta),
        datasets: [{
          label: 'My First Dataset',
          data: this.listOfData.map(item => item.consumo),
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)'
          ]
        }]
      },
    });
  }

  graficoCircularProduccion() {
    this.chartProduccion = new Chart('canvasProduccion', {
      type: 'doughnut',
      data: {
        labels: this.listOfData.map(item => item.planta),
        datasets: [{
          label: 'My First Dataset',
          data: this.listOfData.map(item => item.consumo),
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(201, 203, 207)'
          ]
        }]
      },
    });
  }

  // graficoLinealProduccion() {
  //   this.chartProduccion = new Chart('canvasProduccion', {
  //     type: 'line',
  //     data: {
  //       labels: this.listOfData.map(item => item.planta),
  //       datasets: [
  //         {
  //           label: '# of Votes',
  //           data: this.listOfData.map(item => item.consumo),
  //           borderWidth: 3,
  //           fill: false,
  //           backgroundColor: 'rgba(93, 175, 89, 0.1)',
  //           borderColor: '#3e95cd'

  //         },
  //       ],
  //     },
  //   });
  // }

  // graficoCombinadoBarraLineal() {
  //   this.chartConsumo = new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       datasets: [{
  //           type: 'bar',
  //           label: 'Bar Dataset',
  //           data: [10, 20, 30, 40],
  //           borderWidth: 3,
  //           backgroundColor: '#d06058',
  //           borderColor: '#d06058',
  //           order: 2
  //       }, {
  //           type: 'line',
  //           label: 'Line Dataset',
  //           data: [5, 15, 35, 33],
  //           borderWidth: 3,
  //           fill: false,
  //           backgroundColor: 'rgba(93, 175, 89, 0.1)',
  //           borderColor: '#3e95cd',
  //           order: 1
  //       }],
  //       labels: ['January', 'February', 'March', 'April']
  //     },
  //   });
  // }

}
