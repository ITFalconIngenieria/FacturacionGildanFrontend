import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, PlantaDTO, PlantaModel } from 'src/app/models/planta';
import { PlantasService } from 'src/app/Servicios/plantas.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

@Component({
  selector: 'app-planta',
  templateUrl: './planta.component.html',
  styleUrls: ['./planta.component.css']
})
export class PlantaComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  plantaData!: PlantaDTO;
  disableButtom: boolean = false;
  idPlanta!: number;

  listOfPlantas: any = [];
  listOfData: PlantaModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: PlantaModel, b: PlantaModel) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: PlantaModel, b: PlantaModel) => a.codigo.localeCompare(b.codigo),
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
    private plantasService: PlantasService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.getPlantas();
    this.limpiarCampos();

  }

  async getPlantas() {
    
    await this.plantasService.getPlanta()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfPlantas = resp;
          this.listOfData = [...this.listOfPlantas];

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
    this.listOfData = this.listOfPlantas.filter((item: PlantaModel) => item.nombre.indexOf(this.searchValue) !== -1);

    if(this.listOfData.length == 0) {
      //console.log('Entro al IF');
      this.listOfData = this.listOfPlantas.filter((item: PlantaModel) => item.codigo.indexOf(this.searchValue) !== -1);
    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.plantasService.deletePlanta( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getPlantas();

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

  camposForm( planta: PlantaDTO, estado: any ){

    this.validateForm = this.fb.group({
      nombre: [ planta.nombre, [Validators.required ]],
      codigo: [ planta.codigo, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewPlanta() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.plantaData = this.obtenerCampos();
      const crear = await this.plantasService.postPlanta( this.plantaData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getPlantas();
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
    this.camposForm(this.plantaData = 
      { 
        nombre: '', 
        codigo: '', 
        estado: undefined 
      }, 
      undefined
    );
  }

  obtenerCampos(): PlantaDTO {

    return {
      nombre: this.validateForm.controls.nombre.value,
      codigo: this.validateForm.controls.codigo.value, 
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectPlanta( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idPlanta = item.id;

  }

  async updatePlanta() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.plantaData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.plantasService.updatePlanta( this.plantaData, this.idPlanta );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getPlantas();
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
