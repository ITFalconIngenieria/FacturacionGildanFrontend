import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, CuentaDTO, CuentaModel } from 'src/app/models/cuenta';
import { CuentaService } from 'src/app/Servicios/cuenta.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  cuentaData!: CuentaDTO;
  disableButtom: boolean = false;
  idCuenta!: number;

  listOfCuentas: any = [];
  listOfData: CuentaModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: CuentaModel, b: CuentaModel) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.codigo - b.codigo,
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
    private cuentaService: CuentaService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {

    this.spinner.show();
    this.getCuentas();
    this.limpiarCampos();

  }

  async getCuentas() {
    
    await this.cuentaService.getCuentas()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfCuentas = resp;
          this.listOfData = [...this.listOfCuentas];

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
    this.listOfData = this.listOfCuentas.filter((item: CuentaModel) => item.codigo == +this.searchValue);

    if(this.listOfData.length == 0) {
      //console.log('Entro al IF');
      this.listOfData = this.listOfCuentas.filter((item: CuentaModel) => item.descripcion.indexOf(this.searchValue) !== -1);
    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.cuentaService.deleteCuenta( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getCuentas();

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

  camposForm( cuenta: CuentaDTO, estado: any ){

    this.validateForm = this.fb.group({
      descripcion: [ cuenta.descripcion, [Validators.required ]],
      codigo: [ cuenta.codigo, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewCuenta() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.cuentaData = this.obtenerCampos();
      const crear = await this.cuentaService.postCuenta( this.cuentaData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getCuentas();
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
    this.camposForm(this.cuentaData = 
      { 
        descripcion: '',
        codigo: undefined,
        estado: undefined
      }, 
      undefined
    );
  }

  obtenerCampos(): CuentaDTO {

    return {
      descripcion: this.validateForm.controls.descripcion.value,
      codigo: +this.validateForm.controls.codigo.value, 
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectCuenta( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idCuenta = item.id;

  }

  async updateCuenta() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.cuentaData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.cuentaService.updateCuenta( this.cuentaData, this.idCuenta );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getCuentas();
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
