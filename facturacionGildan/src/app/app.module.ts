
import {  NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { ChartsModule } from 'ng2-charts';

// Importaciones de componentes ng-zorro
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzStepsModule } from 'ng-zorro-antd/steps';

///////////////////////////////////
import { MenuComponent } from './pages/menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ResumenFacturacionComponent } from './pages/resumenFacturacion/resumenFacturacion.component';
import { ServidorComponent } from './pages/servidor/servidor.component';
import { PlantaComponent } from './pages/planta/planta.component';
import { MedidorComponent } from './pages/medidor/medidor.component';
import { JerarquiaComponent } from './pages/jerarquia/jerarquia.component';
import { CentroCostoComponent } from './pages/centro-costo/centro-costo.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';
import { RolloverComponent } from './pages/rollover/rollover.component';
import { LecturasComponent } from './pages/lecturas/lecturas.component';
import { ConsumibleComponent } from './pages/consumible/consumible.component';
import { MedidorPipe } from './pipes/medidor.pipe';
import { BalanceAguaComponent } from './pages/balance-agua/balance-agua.component';
import { DetalleBalanceAguaComponent } from './pages/detalle-balance-agua/detalle-balance-agua.component';
import { FacturaExampleComponent } from './pages/factura-example/factura-example.component';
import { PlantaPipe } from './pipes/planta.pipe';
import { JerarquiaPipe } from './pipes/jerarquia.pipe';
import { CentroCostosPipe } from './pipes/centro-costos.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    FacturaComponent,
    ResumenFacturacionComponent,
    ServidorComponent,
    PlantaComponent,
    MedidorComponent,
    JerarquiaComponent,
    CentroCostoComponent,
    CuentaComponent,
    RolloverComponent,
    LecturasComponent,
    ConsumibleComponent,
    MedidorPipe,
    BalanceAguaComponent,
    DetalleBalanceAguaComponent,
    FacturaExampleComponent,
    PlantaPipe,
    JerarquiaPipe,
    CentroCostosPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxSpinnerModule,
    /////////////////////////
    // NgZorroAntdModule,
    NzTabsModule,
    NzBadgeModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzTableModule,
    NzMenuModule,
    NzDropDownModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDrawerModule,
    NzRadioModule,
    NzFormModule,
    NzPaginationModule,
    NzSelectModule,
    NzInputNumberModule,
    NzInputModule,
    NzAlertModule,
    NzSwitchModule,
    NzMessageModule,
    NzNotificationModule,
    NzPaginationModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzEmptyModule,
    NzListModule,
    NzStatisticModule,
    NzDividerModule,
    NzSpinModule,
    NzCalendarModule,
    NzToolTipModule,
    NzSkeletonModule,
    NzStepsModule,
    ScrollingModule,
    NzPopconfirmModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    // { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
