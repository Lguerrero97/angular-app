import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LoginProductsComponent } from "./components/login-products/login-products.component";
import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from "./app-routing.module";
import { CrudProductsComponent } from "./components/crud-products/crud-products.component";
import {MatCardModule} from '@angular/material/card';
import { UrbanStyleDirective } from './directives/urban-style.directive';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { HttpClientModule } from "@angular/common/http";
import { DetailProdcutsComponent } from "./components/detail-prodcuts/detail-prodcuts.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginProductsComponent,
    CrudProductsComponent,
    UrbanStyleDirective,
    AddProductsComponent,
    DetailProdcutsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatTabsModule,
    MatCardModule, 
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
