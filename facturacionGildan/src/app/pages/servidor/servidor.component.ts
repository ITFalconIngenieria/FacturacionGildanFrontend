import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, ServidorDTO, ServidorModel } from 'src/app/models/servidor';
import { ServidorService } from 'src/app/Servicios/servidor.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';

interface DataItem {
  name: string;
  chinese: number;
  tipo: boolean;
}

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-servidor',
  templateUrl: './servidor.component.html',
  styleUrls: ['./servidor.component.css']
})
export class ServidorComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  servidorData!: ServidorDTO;
  disableButtom: boolean = false;
  idServidor!: number;

  listOfServidor: any = [];
  listOfData: ServidorModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Nombre',
      sortOrder: null,
      sortFn: (a: ServidorModel, b: ServidorModel) => a.nombre.localeCompare(b.nombre),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Base de datos',
      sortOrder: null,
      sortFn: (a: ServidorModel, b: ServidorModel) => a.baseDatos.localeCompare(b.baseDatos),
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
    private servidorService: ServidorService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {
    
    this.spinner.show();
    this.getServidores();
    this.limpiarCampos();
  }

  async getServidores() {
    
    await this.servidorService.getServidores()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfServidor = resp;
          this.listOfData = [...this.listOfServidor];

          this.spinner.hide();

        }, error => {
          //console.log(error);
          this.disableButtom = true;
          this.uiService.createMessage('error', error.message);
          this.spinner.hide();
        });
    
    // this.servidorService.getServidores().toPromise().then(
    //   (data: any) => {
    //     console.log(data);
    //     this.listOfServidor = data;
    //     this.listOfData = [...this.listOfServidor];
    //   }
    // );
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfServidor.filter((item: ServidorModel) => item.nombre.indexOf(this.searchValue) !== -1);

    if(this.listOfData.length == 0) {
      //console.log('Entro al IF');
      this.listOfData = this.listOfServidor.filter((item: ServidorModel) => item.baseDatos.indexOf(this.searchValue) !== -1);
    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.servidorService.deleteServidor( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getServidores();

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

  camposForm( servidor: ServidorDTO, estado: any ){

    this.validateForm = this.fb.group({
      nombre: [ servidor.nombre, [Validators.required ]],
      baseDatos: [ servidor.baseDatos, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewServidor() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.servidorData = this.obtenerCampos();
      const crear = await this.servidorService.postServidor( this.servidorData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getServidores();
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
    this.camposForm(this.servidorData = 
      { 
        nombre: '', 
        baseDatos: '', 
        estado: undefined 
      }, 
      undefined
    );
  }

  obtenerCampos(): ServidorDTO {

    return {
      nombre: this.validateForm.controls.nombre.value,
      baseDatos: this.validateForm.controls.baseDatos.value, 
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  selectServidor( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idServidor = item.id;

  }

  async updateServidor() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.servidorData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.servidorService.updateServidor( this.servidorData, this.idServidor );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getServidores();
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
