import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MedidorModel } from 'src/app/models/medidor';
import { ColumnItem, RollOverDTO, RollOverModel } from 'src/app/models/roll-over';
import { MedidorService } from 'src/app/Servicios/medidor.service';
import { RollOverService } from 'src/app/Servicios/roll-over.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-rollover',
  templateUrl: './rollover.component.html',
  styleUrls: ['./rollover.component.css']
})
export class RolloverComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  rollOverData!: RollOverDTO;
  disableButtom: boolean = false;
  idRollOver!: number;

  listOfRollOver: any = [];
  listOfMedidores: any = [];
  listOfData: RollOverModel[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Fecha',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.fecha.localeCompare(b.fecha),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Medidor',
      sortOrder: null,
      sortFn: (a: any, b: any) => a.medidorId - b.medidorId,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: RollOverModel, b: RollOverModel) => a.descripcion.localeCompare(b.descripcion),
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
    private rollOverService: RollOverService,
    private medidorService: MedidorService,
    private spinner: NgxSpinnerService
  ) { 
  }

  ngOnInit(): void {

    this.spinner.show();
    this.getMedidores();
    this.getRollOver();
    this.limpiarCampos();

  }

  async getRollOver() {
    
    await this.rollOverService.getRollOvers()
        .subscribe( resp => {

          this.disableButtom = false;
          //console.log(resp);
          this.listOfRollOver = resp;
          this.listOfData = [...this.listOfRollOver];

          this.spinner.hide();

        }, error => {

          this.disableButtom = true;
          this.uiService.createMessage('error', error.message);
          this.spinner.hide();
        });
    
  }

  async getMedidores() {

    await this.medidorService.getAllMedidores()
        .subscribe( resp => {

          this.listOfMedidores = resp;

        }, error => {

          this.uiService.createMessage('error', error.message);

        }
    );


  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    
    this.listOfData = this.listOfRollOver.filter((item: RollOverModel) => String(item.fecha).indexOf(this.searchValue) !== -1);

    if(this.listOfData.length == 0) {

      this.listOfData = this.listOfRollOver.filter((item: RollOverModel) => item.descripcion.indexOf(this.searchValue) !== -1);

      if(this.listOfData.length == 0) {

        let medidor = this.listOfMedidores.filter((item: MedidorModel) => item.codigo.indexOf(this.searchValue) !== -1);
        let rollOver;

        for(let i of medidor){

          rollOver = this.listOfRollOver.filter((item: RollOverModel) => item.medidorId == i.id);
          if( rollOver.length != 0){
    
            this.listOfData = this.listOfRollOver.filter((item: RollOverModel) => item.medidorId == i.id);
    
          }
    
        }

      }

    }
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();
    
    const result = await this.rollOverService.deleteRollOver( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getRollOver();

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

  camposForm( rollOver: RollOverDTO, fecha: string, estado: any ){
    
    this.validateForm = this.fb.group({
      fecha: [ fecha, [Validators.required ]],
      descripcion: [ rollOver.descripcion, [Validators.required ]],
      lecturaAnterior: [ rollOver.lecturaAnterior, [Validators.required ]],
      lecturaNueva: [ rollOver.lecturaNueva, [Validators.required ]],
      estado: [ estado, [Validators.required ]],
      medidorId: [ rollOver.medidorId, [Validators.required ]]
    });
  }

  async saveNewRollOver() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.rollOverData = this.obtenerCampos();
      //console.log(this.rollOverData);
      const crear = await this.rollOverService.postRollOver( this.rollOverData );

      if( crear ) {

        this.isVisibleModal = false;
        this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
        await this.getRollOver();
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
    this.camposForm(this.rollOverData = 
      { 
        fecha: undefined, 
        descripcion: '', 
        lecturaAnterior: undefined,
        lecturaNueva: undefined, 
        estado: undefined,
        medidorId: undefined
      }, 
      '',
      undefined
    );
  }

  obtenerCampos(): RollOverDTO {

    return {
      fecha: new Date(moment(this.validateForm.controls.fecha.value).subtract(6,'hours').format()).toISOString(),
      descripcion: this.validateForm.controls.descripcion.value, 
      lecturaAnterior: +this.validateForm.controls.lecturaAnterior.value,
      lecturaNueva: +this.validateForm.controls.lecturaNueva.value,
      estado: JSON.parse( this.validateForm.controls.estado.value ),
      medidorId: this.validateForm.controls.medidorId.value
    };

  }

  selectRollOver( item: any ){

    let estado = item.estado;
    let fecha =  item.fecha;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, new Date(moment(fecha).subtract(-6,'hours').format()).toISOString(), String( estado ) );
    this.idRollOver = item.id;

  }

  async updateRollOver() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.rollOverData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.rollOverService.updateRollOver( this.rollOverData, this.idRollOver );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getRollOver();
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
