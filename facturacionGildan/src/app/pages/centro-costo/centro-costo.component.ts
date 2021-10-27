import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CentroCostosDTO, CentroCostosModel, ColumnItem } from 'src/app/models/centro-costos';
import { CentroCostosService } from 'src/app/Servicios/centro-costos.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

@Component({
  selector: 'app-centro-costo',
  templateUrl: './centro-costo.component.html',
  styleUrls: ['./centro-costo.component.css']
})
export class CentroCostoComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  centroCostosData!: CentroCostosDTO;
  disableButtom: boolean = false;
  idCentroCostos!: number;

  listOfCentroCostos: any = [];
  listOfData: CentroCostosModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: CentroCostosModel, b: CentroCostosModel) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Estado',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.estado - b.estado,
      sortDirections: ['ascend', 'descend', null],
    }
  ];

  constructor(
    private fb: FormBuilder,
    private uiService: UiServiceService,
    private centroCostosService: CentroCostosService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.getCentroCostos();
    this.limpiarCampos();

  }

  async getCentroCostos() {
    
    await this.centroCostosService.getCentroCostos()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfCentroCostos = resp;
          this.listOfData = [...this.listOfCentroCostos];

          this.spinner.hide();

        }, error => {
          //console.log(error);
          this.disableButtom = true;
          this.uiService.createMessage('error', error.message);
          this.spinner.hide();
        });
    
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfCentroCostos.filter((item: CentroCostosModel) => item.descripcion.indexOf(this.searchValue) !== -1);
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.centroCostosService.deleteCentroCostos( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getCentroCostos();

    } else {

      this.uiService.createMessage('error', 'El registro no pudo ser eliminado.');

    }

    this.spinner.hide();
    
  }

  showModal(): void {
    this.isVisibleModal = true;
  }

  handleOkModal(): void {
    //console.log('Button ok clicked!');
    this.isVisibleModal = false;
  }

  handleCancelModal(): void {
    //console.log('Button cancel clicked!');
    this.isVisibleModal = false;
    this.limpiarCampos();
    this.update = false;
  }

  camposForm( centroCostos: CentroCostosDTO, estado: any ){

    this.validateForm = this.fb.group({
      descripcion: [ centroCostos.descripcion, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewCentroCostos() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.centroCostosData = this.obtenerCampos();
      const crear = await this.centroCostosService.postCentroCostos( this.centroCostosData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getCentroCostos();
        this.limpiarCampos();

      } else {

        this.uiService.createNotification('error', 'Error', 'Los datos No fueron guardados correctamente, validar su conexion al servidor.');

      }
    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, llene la informacion requerida.');

    }

    this.spinner.hide();
  }

  limpiarCampos() {
    this.camposForm(this.centroCostosData = 
      { 
        descripcion: '', 
        estado: undefined 
      }, 
      undefined
    );
  }

  obtenerCampos(): CentroCostosDTO {

    return {
      descripcion: this.validateForm.controls.descripcion.value,
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectCentroCostos( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idCentroCostos = item.id;

  }

  async updateCentroCostos() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.centroCostosData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.centroCostosService.updateCentroCostos( this.centroCostosData, this.idCentroCostos );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getCentroCostos();
         this.limpiarCampos();
         this.update = false;
      
      } else {

        this.uiService.createNotification('error', 'Error', 'Los datos No fueron actualizados correctamente, validar su conexion al servidor.');

      }
    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, llene la informacion requerida.');

    }

    this.spinner.hide();
  }

  validarCampos(): string {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    //console.log(this.validateForm.controls.estado.value);
    //console.log(this.validateForm.controls.descripcion.value);
    return this.validateForm.status;
  }

}
