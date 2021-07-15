import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {

    this.doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
    this.doughnutChartData = [120, 150, 180, 90];
    this.doughnutChartType = 'doughnut';
  }

}
