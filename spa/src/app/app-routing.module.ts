import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HealthComponent } from './sections/health/health.component';
import { OrdersComponent } from './sections/orders/orders.component';
import { SalesComponent } from './sections/sales/sales.component';

const routes: Routes = [
  {path: 'sales' , component: SalesComponent},
  {path: 'orders' , component: OrdersComponent},
  {path: 'health' , component: HealthComponent},

  {path: '', redirectTo: '/sales', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
