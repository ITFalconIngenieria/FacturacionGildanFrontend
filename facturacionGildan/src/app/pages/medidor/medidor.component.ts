import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ColumnItem, DetalleMedidorDTO, MedidorDetalle, MedidorDTO, MedidorModel } from 'src/app/models/medidor';
import { CentroCostosService } from 'src/app/Servicios/centro-costos.service';
import { ConsumibleService } from 'src/app/Servicios/consumible.service';
import { JerarquiaService } from 'src/app/Servicios/jerarquia.service';
import { MedidorService } from 'src/app/Servicios/medidor.service';
import { PlantasService } from 'src/app/Servicios/plantas.service';
import { ServidorService } from 'src/app/Servicios/servidor.service';
import { SourceTypeService } from 'src/app/Servicios/source-type.service';
import { UiServiceService } from 'src/app/Servicios/ui-service.service';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-medidor',
  templateUrl: './medidor.component.html',
  styleUrls: ['./medidor.component.css']
})
export class MedidorComponent implements OnInit {

  visible = false;
  searchValue = '';
  isVisibleModal = false;
  update: boolean = false;
  validateForm!: FormGroup;
  validateFormDetalle!: FormGroup;
  medidorData!: MedidorDTO;
  medidorDetalleData!: DetalleMedidorDTO;
  disableButtom: boolean = false;
  idMedidor!: number;
  idDetalleMedidor!: number;
  medidorInfo!: any;

  listOfMedidores: any = [];
  listOfServidores: any = [];
  listOfSourceType: any = [];
  listOfPlantas: any = [];
  listOfJerarquias: any = [];
  listOfCentroCostos: any = [];
  listOfConsumibles: any = [];
  listOfData: MedidorDetalle[] = [];

  listOfDetalleMedidor: any = [];
  listOfDataDetalleMedidor: MedidorDetalle[] = [];

  listOfColumns: ColumnItem[] = [
    {
      name: 'Codigo',
      sortOrder: null,
      sortFn: (a: MedidorModel, b: MedidorModel) => a.codigo.localeCompare(b.codigo),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Descripcion',
      sortOrder: null,
      sortFn: (a: MedidorModel, b: MedidorModel) => a.descripcion.localeCompare(b.descripcion),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Ubicacion',
      sortOrder: null,
      sortFn: (a: MedidorModel, b: MedidorModel) => a.ubicacion.localeCompare(b.ubicacion),
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
    private medidorService: MedidorService,
    private spinner: NgxSpinnerService,
    private servidorService: ServidorService,
    private sourceTypeService: SourceTypeService,
    private jerarquiaService: JerarquiaService,
    private plantasService: PlantasService,
    private consumibleService: ConsumibleService,
    private centroCostosService: CentroCostosService
  ) { }

  ngOnInit(): void {

    this.spinner.show();
    this.getMedidores();
    this.getServidores();
    this.getSourceType();
    this.getPlantas();
    this.getJerarquias();
    this.getCentroCostos();
    this.getConsumibles();
    this.limpiarCampos();
    this.limpiarCamposDetalle(0);

  }

  async getMedidores() {
    
    await this.medidorService.getAllMedidoresConDetalle()
        .subscribe( resp => {

          this.disableButtom = false;
          this.listOfMedidores = resp;
          this.listOfData = [...this.listOfMedidores];

          for( let i of this.listOfData ) {
            i.expand = false;
          }

          //console.log( this.listOfData );

          this.spinner.hide();

        }, error => {
          //console.log(error);
          this.disableButtom = true;
          this.uiService.createMessage('error', error.message);
          this.spinner.hide();
        });
    
  }

  async getServidores() {
    
    await this.servidorService.getServidores()
        .subscribe( resp => {

          this.listOfServidores = resp;

        }, error => {
          //console.log(error);
          this.uiService.createMessage('error', error.message);
        });
  }

  async getPlantas() {
    
    await this.plantasService.getPlanta()
        .subscribe( resp => {

          this.listOfPlantas = resp;

        }, error => {
          //console.log(error);
          this.uiService.createMessage('error', error.message);
        });
  }

  async getJerarquias() {
    
    await this.jerarquiaService.getJerarquias()
        .subscribe( resp => {

          this.listOfJerarquias = resp;

        }, error => {
          //console.log(error);
          this.uiService.createMessage('error', error.message);
        });
  }


  async getCentroCostos() {
    
    await this.centroCostosService.getCentroCostos()
        .subscribe( resp => {

          this.listOfCentroCostos = resp;

        }, error => {
          //console.log(error);
          this.uiService.createMessage('error', error.message);
        });
  }

  async getConsumibles() {
    
    await this.consumibleService.getConsumibles()
        .subscribe( resp => {

          this.listOfConsumibles = resp;

        }, error => {

          this.uiService.createMessage('error', error.message);

        });
    
  }


  async getSourceType() {
    
    await this.sourceTypeService.getSourceTypes()
        .subscribe( resp => {

          this.listOfSourceType = resp;

        }, error => {
          //console.log(error);
          this.uiService.createMessage('error', error.message);
        });
  }

  desplegarDetalle(id: any) {

    this.listOfDataDetalleMedidor = this.listOfMedidores.filter((item: MedidorDetalle) => item.id == id);

    this.listOfDetalleMedidor = this.listOfDataDetalleMedidor[0].detalle

    //console.log(this.listOfDetalleMedidor);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfMedidores.filter((item: MedidorModel) => item.codigo.indexOf(this.searchValue) !== -1);
  }

  cancelDeleteItem(): void {
    this.uiService.createMessage('info', 'Su registro sigue activo.');
  }

  async confirmDeleteItem(id: number) {

    this.spinner.show();

    let detalle = this.listOfMedidores.filter((item: MedidorDetalle) => item.id == id);

    for( let item of detalle[0].detalle ) {
      //console.log( item.id );
      const resultDetalle = await this.medidorService.deleteDetalleMedidor( item.id );

      if( !resultDetalle ){

        this.uiService.createMessage('error', 'El registro no pudo ser eliminado.');
        return;
  
      }

    }
    
    const result = await this.medidorService.deleteMedidor( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getMedidores();

    } else {

      this.uiService.createMessage('error', 'El registro no pudo ser eliminado.');

    }

    this.spinner.hide();
    
  }

  async confirmDeleteDetalleMedidor(id: number) {

    this.spinner.show();
    
    const result = await this.medidorService.deleteDetalleMedidor( id );

    if( result ){

      this.uiService.createMessage('success', 'El registro fue eliminado con éxito.');
      await this.getMedidores();

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

  camposForm( medidor: MedidorDTO, estado: any ){

    this.validateForm = this.fb.group({
      codigo: [ medidor.codigo, [Validators.required ]],
      referenciaId: [ medidor.referenciaId, [Validators.required ]],
      descripcion: [ medidor.descripcion, [Validators.required ]],
      ubicacion: [ medidor.ubicacion, [Validators.required ]],
      multiplicador: [ medidor.multiplicador, [Validators.required ]],
      formula: [ medidor.formula, [Validators.required ]],
      servidorId: [ medidor.servidorId, [Validators.required ]],
      sourceTypeId: [ medidor.sourceTypeId, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  camposFormDetalle( detalle: DetalleMedidorDTO, estado: any, operacion: any, lectura: any, fechaI: string, fechaF: string ){

    this.validateFormDetalle = this.fb.group({
      medidorId: [ detalle.medidorId, [Validators.required ]],
      plantaId: [ detalle.plantaId, [Validators.required ]],
      unidad: [ detalle.unidad, [Validators.required ]],
      unidadConversion: [ detalle.unidadConversion, [Validators.required ]],
      jerarquiaId: [ detalle.jerarquiaId, [Validators.required ]],
      consumibleId: [ detalle.consumibleId, [Validators.required ]],
      centroCostoId: [ detalle.centroCostosId, [Validators.required ]],
      porcentaje: [ detalle.porcentaje, [Validators.required ]],
      biomasa: [ detalle.biomasa, [Validators.required ]],
      fechaI: [ fechaI, [Validators.required ]],
      fechaF: [ fechaF, [Validators.required ]],
      lectura: [ lectura, [Validators.required ]],
      operacion: [ operacion, [Validators.required ]],
      estado: [ estado, [Validators.required ]]
    });
  }

  async saveNewMedidor() {

    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {

      this.medidorData = this.obtenerCampos();

      await this.medidorService.postMedidor( this.medidorData )
        .subscribe( resp => {

          this.medidorInfo = resp

          this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
          this.getMedidores();
          this.limpiarCampos();
          this.current += 1;
          this.limpiarCamposDetalle( this.medidorInfo.id );

        }, error => {
          
          this.uiService.createMessage('error', error.message);
          //this.uiService.createNotification('error', 'Error', 'Los datos No fueron guardados correctamente, validar su conexion al servidor.');

        }
      );

    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, llene la informacion requerida.');

    }

    this.spinner.hide();
  }

  async saveNewDetalleMedidor() {

    this.spinner.show();

    if(this.validarCamposDetalle() == 'VALID') 
    {
      this.medidorDetalleData = this.obtenerCamposDetalle();

      await this.medidorService.postDetalleMedidor( this.medidorDetalleData )
        .subscribe( resp => {

          this.isVisibleModal = false;
          this.uiService.createNotification('success', 'Éxito', 'Los datos fueron guardados correctamente.');
          this.getMedidores();
          this.current -= 1;
          this.limpiarCamposDetalle( 0 );

        }, error => {
          
          this.uiService.createMessage('error', error.message);
          //this.uiService.createNotification('error', 'Error', 'Los datos No fueron guardados correctamente, validar su conexion al servidor.');

        }
      );
      
    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, llene la informacion requerida.');

    }

    this.spinner.hide();
  }

  async addNewDetalleMedidor( item: any ) {

    this.isVisibleModal = true;
    this.update = false;
    this.idMedidor = item.id;
    this.current = 1;
    this.limpiarCamposDetalle( this.idMedidor );

  }

  limpiarCampos() {
    this.camposForm(this.medidorData = 
      { 
        codigo: '', 
        referenciaId: undefined,
        descripcion: '',
        ubicacion: '',
        multiplicador: undefined,
        formula: 'NULL',
        estado: undefined,
        servidorId: undefined,
        sourceTypeId: undefined
      }, 
      undefined
    );
  }

  limpiarCamposDetalle( medidorId: any ) {

    if( medidorId == 0 ) { medidorId = undefined; }

    this.camposFormDetalle(this.medidorDetalleData = 
      { 
        medidorId: medidorId, 
        plantaId: undefined,
        unidad: '',
        unidadConversion: undefined,
        jerarquiaId: undefined,
        consumibleId: undefined,
        centroCostosId: undefined,
        porcentaje: undefined,
        biomasa: undefined,
        fechaInicial: undefined,
        fechaFinal: undefined,
        lectura: undefined,
        operacion: undefined,
        estado: undefined
      }, 
      undefined,
      undefined,
      undefined,
      '',
      ''
    );
  }

  obtenerCampos(): MedidorDTO {

    return {
      codigo: this.validateForm.controls.codigo.value,
      referenciaId: +this.validateForm.controls.referenciaId.value,
      descripcion: this.validateForm.controls.descripcion.value,
      ubicacion: this.validateForm.controls.ubicacion.value,
      multiplicador: +this.validateForm.controls.multiplicador.value,
      formula: this.validateForm.controls.formula.value,
      servidorId: +this.validateForm.controls.servidorId.value,
      sourceTypeId: +this.validateForm.controls.sourceTypeId.value,
      estado: JSON.parse( this.validateForm.controls.estado.value )
    };

  }

  obtenerCamposDetalle(): DetalleMedidorDTO {

    return {
      medidorId: +this.validateFormDetalle.controls.medidorId.value,
      plantaId: +this.validateFormDetalle.controls.plantaId.value,
      unidad: this.validateFormDetalle.controls.unidad.value,
      unidadConversion: +this.validateFormDetalle.controls.unidadConversion.value,
      jerarquiaId: +this.validateFormDetalle.controls.jerarquiaId.value,
      consumibleId: +this.validateFormDetalle.controls.consumibleId.value,
      centroCostosId: +this.validateFormDetalle.controls.centroCostoId.value,
      porcentaje: +this.validateFormDetalle.controls.porcentaje.value,
      biomasa: +this.validateFormDetalle.controls.biomasa.value,
      fechaInicial: new Date(moment(this.validateFormDetalle.controls.fechaI.value).subtract(6,'hours').format()).toISOString(),
      fechaFinal: new Date(moment(this.validateFormDetalle.controls.fechaF.value).subtract(6,'hours').format()).toISOString(),
      lectura: JSON.parse( this.validateFormDetalle.controls.lectura.value ),
      operacion: JSON.parse( this.validateFormDetalle.controls.operacion.value ),
      estado: JSON.parse( this.validateFormDetalle.controls.estado.value )
    };

  }

  selectMedidor( item: any ){

    let estado = item.estado;
    this.isVisibleModal = true;
    this.update = true;
    this.camposForm( item, String( estado ) );
    this.idMedidor = item.id;
    this.current = 0;

  }

  selectDetalleMedidor( item: any ){

    let estado = item.estado;
    let operacion = item.operacion;
    let lectura = item.lectura;
    let fechaI = item.fechaInicial;
    let fechaF = item.fechaFinal;
    this.isVisibleModal = true;
    this.update = true;
    this.camposFormDetalle( item, String( estado ), String( operacion ), String( lectura ), 
                            new Date(moment(fechaI).subtract(-6,'hours').format()).toISOString(), new Date(moment(fechaF).subtract(-6,'hours').format()).toISOString() );
    this.idDetalleMedidor = item.id;
    this.current = 1;

  }

  async updateMedidor() {
    this.spinner.show();

    if(this.validarCampos() == 'VALID') 
    {
      this.medidorData = this.obtenerCampos();
      //console.log( this.servidorData );
      const result = await this.medidorService.updateMedidor( this.medidorData, this.idMedidor );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getMedidores();
         this.limpiarCampos();
         this.update = false;
         this.current = 0;
      
      } else {

        this.uiService.createNotification('error', 'Error', 'Los datos No fueron actualizados correctamente, validar su conexion al servidor.');

      }
    } else {

      this.uiService.createNotification('warning', 'Advertencia', 'Por favor, llene la informacion requerida.');

    }

    this.spinner.hide();
  }

  async updateDetalleMedidor() {
    this.spinner.show();

    if(this.validarCamposDetalle() == 'VALID') 
    {
      this.medidorDetalleData = this.obtenerCamposDetalle();
      //console.log( this.medidorDetalleData );
      const result = await this.medidorService.updateDetalleMedidor( this.medidorDetalleData, this.idDetalleMedidor );

      if( result ) {

         this.isVisibleModal = false;
         this.uiService.createNotification('success', 'Éxito', 'Los datos fueron actualizados correctamente.');
         await this.getMedidores();
         this.limpiarCamposDetalle( 0 );
         this.update = false;
         this.current = 0;
      
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

  validarCamposDetalle(): string {
    for (const i in this.validateFormDetalle.controls) {
      this.validateFormDetalle.controls[i].markAsDirty();
      this.validateFormDetalle.controls[i].updateValueAndValidity();
    }
    //console.log(this.validateForm.controls.estado.value);
    //console.log(this.validateForm.controls.descripcion.value);
    return this.validateFormDetalle.status;
  }

  current = 0;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.current += 1;
  }

}
