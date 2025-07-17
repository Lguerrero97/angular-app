import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginProductsComponent } from './components/login-products/login-products.component';
import { CrudProductsComponent } from './components/crud-products/crud-products.component';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { DetailProdcutsComponent } from './components/detail-prodcuts/detail-prodcuts.component';

const routes: Routes = [
  { path: '', component: LoginProductsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginProductsComponent },
  { path: 'crud-products', component: CrudProductsComponent },
  { path: 'add', component: AddProductsComponent },
  { path: 'edit/:id', component: AddProductsComponent },
  { path: 'detail/:id', component: DetailProdcutsComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
