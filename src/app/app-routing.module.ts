import { PaymentResponseComponent } from './pages/payment-response/payment-response.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:PaymentComponent
  },
  {
    path:'success',
    component:PaymentResponseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
