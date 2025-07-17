import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IProducts } from 'src/app/models/products';
import { ProductServiceService } from 'src/app/services/product-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  isAdd: boolean = true;
  base64Image: string = '';
  formProducts: FormGroup;
  submitted: boolean = false;
  loading: boolean = true;
  id: number = 0;
  constructor(private fb: FormBuilder, private productService: ProductServiceService, private route: ActivatedRoute
  ) {
    this.formProducts = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
  async ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAdd = !this.id;
    if (!this.isAdd) {
      const product = await this.productService.getProduct(this.id);
      if (product) {
        this.formProducts.patchValue(product);
        this.base64Image = this.formProducts.get('image')?.value
      }
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;

        // Almacenar el base64 en el FormControl
        this.formProducts.patchValue({
          image: this.base64Image
        });

        // Si usas validaciones o detección de cambios
        this.formProducts.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onSubmit() {
    this.submitted = true;
    if (this.formProducts.invalid) {
      return;
    }
    this.loading = true;
    if (this.isAdd) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  createUser() {
    const objectProduct: IProducts = {
      description: this.formProducts.get('description')?.value,
      id: 0,
      price: this.formProducts.get('price')?.value,
      name: this.formProducts.get('name')?.value,
      image: this.formProducts.get('image')?.value
    }
    this.productService.createProduct(objectProduct).subscribe(result => {
      result.id = Math.random();
      //ALMACENO LA RESPUESTA DEL SERVICIO EN EL LOCALSTORAGE DESPUES DE QUE SE MANDO LLAMAR EL SERVICIO, ESTO SOLO SE IMPLEMENTO PARA IMPLEMENTAR UNA API EXTERNA
      const existProducts = localStorage.getItem('productsList');
      let products: IProducts[] = [];
      if (existProducts) {
        products = JSON.parse(existProducts);
      }
      products.push(result);
      localStorage.setItem('productsList', JSON.stringify(products));
      this.formProducts.reset();
      this.base64Image = '';
      this.showMsg(true, 'Registro Creado con exito')
    });
  }

  updateUser() {
    this.productService.updateProduct(this.id, this.formProducts.value)
      .then(updated => {
        this.showMsg(true, 'Registro Actualizado');
        console.log(updated);
      })
      .catch(error => {
        this.showMsg(false, 'Error al actualizar');
        console.log(error);
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
