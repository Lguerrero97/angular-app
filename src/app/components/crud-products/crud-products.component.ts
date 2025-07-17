import { Component } from '@angular/core';
import { IProducts } from 'src/app/models/products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { base64 } from 'src/assets/img/img.base65';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-products',
  templateUrl: './crud-products.component.html',
  styleUrls: ['./crud-products.component.css']
})
export class CrudProductsComponent {
  products: IProducts[] = [];

  constructor(private productService: ProductServiceService) {
    this.getProducts();
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).then(deleted => {
      if (deleted) {
        this.showMsg(true, 'Registro Eliminado correctamente');
        this.getProducts();
      } else {
        this.showMsg(false, 'Error al eliminar el registro');
      }
    });
  }

  getProducts() {
    this.productService.getProducts()
      .then(productsResponse => {
        this.products = productsResponse;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }


  showMsg(success: boolean, msj: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    if (success) {
      Toast.fire({
        icon: "success",
        title: msj
      });
    } else {
      Toast.fire({
        icon: "error",
        title: msj
      });
    }
  }
}
