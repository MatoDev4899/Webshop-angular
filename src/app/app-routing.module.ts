import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './features/pages/cart/cart.component';
import { HomeComponent } from './features/pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
