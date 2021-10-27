import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, ConsumibleDTO, ConsumibleModel } from 'src/app/models/consumible';
import { ConsumibleService } from 'src/app/Servicios/consumible.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

@Component({
  selector: 'app-consumible',
  templateUrl: './consumible.component.html',
  styleUrls: ['./consumible.component.css']
})
export class ConsumibleComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  consumibleData!: ConsumibleDTO;
  disableButtom: boolean = false;
  idConsumible!: number;

  listOfConsumibles: any = [];
  listOfData: ConsumibleModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: ConsumibleModel, b: ConsumibleModel) => a.nombre.localeCompare(b.nombre),
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
    private consumibleService: ConsumibleService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.getConsumibles();
    this.limpiarCampos();

  }

  async getConsumibles() {
    
    await this.consumibleService.getConsumibles()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfConsumibles = resp;
          this.listOfData = [...this.listOfConsumibles];

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
    this.listOfData = this.listOfConsumibles.filter((item: ConsumibleModel) => item.nombre.indexOf(this.searchValue) !== -1);
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.consumibleService.deleteConsumible( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getConsumibles();

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

  camposForm( consumible: ConsumibleDTO, estado: any ){

    this.validateForm = this.fb.group({
      nombre: [ consumible.nombre, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewConsumible() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.consumibleData = this.obtenerCampos();
      const crear = await this.consumibleService.postConsumible( this.consumibleData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getConsumibles();
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
    this.camposForm(this.consumibleData = 
      { 
        nombre: '', 
        estado: undefined 
      }, 
      undefined
    );
  }

  obtenerCampos(): ConsumibleDTO {

    return {
      nombre: this.validateForm.controls.nombre.value,
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectConsumible( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idConsumible = item.id;

  }

  async updateConsumible() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.consumibleData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.consumibleService.updateConsumible( this.consumibleData, this.idConsumible );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getConsumibles();
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
