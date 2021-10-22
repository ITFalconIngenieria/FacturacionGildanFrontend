import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, JerarquiaDTO, JerarquiaModel } from 'src/app/models/jerarquia';
import { JerarquiaService } from 'src/app/Servicios/jerarquia.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  jerarquiaData!: JerarquiaDTO;
  disableButtom: boolean = false;
  idJerarquia!: number;

  listOfJerarquia: any = [];
  listOfData: JerarquiaModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nivel',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.nivel - b.nivel,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: JerarquiaModel, b: JerarquiaModel) => a.descripcion.localeCompare(b.descripcion),
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
    private jerarquiaService: JerarquiaService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {

    this.spinner.show();
    this.getJerarquia();
    this.limpiarCampos();

  }

  async getJerarquia() {
    
    await this.jerarquiaService.getJerarquias()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfJerarquia = resp;
          this.listOfData = [...this.listOfJerarquia];

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
    //let nivel: number = +this.searchValue;
    this.listOfData = this.listOfJerarquia.filter((item: JerarquiaModel) => item.nivel == +this.searchValue);

    if(this.listOfData.length == 0) {
      //console.log('Entro al IF');
      this.listOfData = this.listOfJerarquia.filter((item: JerarquiaModel) => item.descripcion.indexOf(this.searchValue) !== -1);
    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.jerarquiaService.deleteJerarquia( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getJerarquia();

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

  camposForm( servidor: JerarquiaDTO, estado: any ){

    this.validateForm = this.fb.group({
      nivel: [ servidor.nivel, [Validators.required ]],
      descripcion: [ servidor.descripcion, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewJerarquia() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.jerarquiaData = this.obtenerCampos();
      const crear = await this.jerarquiaService.postJerarquia( this.jerarquiaData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getJerarquia();
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
    this.camposForm(this.jerarquiaData = 
      { 
        nivel: undefined, 
        descripcion: '', 
        estado: undefined 
      }, 
      undefined
    );
  }

  obtenerCampos(): JerarquiaDTO {

    return {
      nivel: +this.validateForm.controls.nivel.value,
      descripcion: this.validateForm.controls.descripcion.value, 
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectJerarquia( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idJerarquia = item.id;

  }

  async updateJerarquia() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.jerarquiaData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.jerarquiaService.updateJerarquia( this.jerarquiaData, this.idJerarquia );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getJerarquia();
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
