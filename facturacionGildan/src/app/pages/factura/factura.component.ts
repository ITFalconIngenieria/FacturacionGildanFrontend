import { Component, OnInit, NgZone } from '@angular/core';

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
  inputValue: string = ' ';
  constructor() { }


  ngOnInit() {

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

}
