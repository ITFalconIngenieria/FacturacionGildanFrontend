import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lecturas',
  templateUrl: './lecturas.component.html',
  styleUrls: ['./lecturas.component.css']
})
export class LecturasComponent implements OnInit {

  listOfData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
