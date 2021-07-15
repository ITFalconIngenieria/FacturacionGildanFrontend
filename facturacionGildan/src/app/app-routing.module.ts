import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ResumenFacturacionComponent } from './pages/resumenFacturacion/resumenFacturacion.component';

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


    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
