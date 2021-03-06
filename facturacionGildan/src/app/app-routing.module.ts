import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
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
import { BalanceAguaComponent } from './pages/balance-agua/balance-agua.component';
import { DetalleBalanceAguaComponent } from './pages/detalle-balance-agua/detalle-balance-agua.component';
import { FacturaExampleComponent } from './pages/factura-example/factura-example.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MenuComponent,
    // canActivate: [LoginGuard],
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'factura', component: FacturaComponent },
      { path: 'resumen', component: ResumenFacturacionComponent },
      { path: 'servidor', component: ServidorComponent },
      { path: 'plantas', component: PlantaComponent },
      { path: 'medidores', component: MedidorComponent },
      { path: 'jerarquia', component: JerarquiaComponent },
      { path: 'consumible', component: ConsumibleComponent },
      { path: 'centro-costos', component: CentroCostoComponent },
      { path: 'cuentas', component: CuentaComponent },
      { path: 'rollOver', component: RolloverComponent },
      { path: 'lecturas', component: LecturasComponent },
      { path: 'balanceAgua', component: BalanceAguaComponent },
      { path: 'detalleBalanceAgua', component: DetalleBalanceAguaComponent },
      { path: 'exampleFactura', component: FacturaExampleComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
