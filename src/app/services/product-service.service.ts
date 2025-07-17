import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';
  STORAGE_KEY = 'productsList';
  constructor(private http: HttpClient) { }


  getProducts(): Promise<IProducts[]> {
    return new Promise((resolve, reject) => {
      try {
        const data = localStorage.getItem(this.STORAGE_KEY);
        const products: IProducts[] = data ? JSON.parse(data) : [];
        resolve(products);
      } catch (error) {
        reject('Error al obtener productos del localStorage');
      }
    });
  }

  getProduct(id: number): Promise<IProducts | undefined> {
    return this.getProducts().then(products => {
      return products.find(p => Number(p.id) === Number(id));
    });
  }

  createProduct(product: IProducts): Observable<IProducts> {
    return this.http.post<IProducts>(`${this.baseUrl}/posts`, product);
  }

  updateProduct(id: number, updated: IProducts): Promise<IProducts> {
    return this.getProducts().then(products => {
      const index = products.findIndex(p => Number(p.id) === Number(id));
      if (index === -1) throw new Error('Producto no encontrado');

      products[index] = { ...updated, id };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
      return products[index];
    });
  }


  deleteProduct(id: number): Promise<boolean> {
    return this.getProducts().then(products => {
      const filtered = products.filter(p => p.id !== id);
      const deleted = filtered.length < products.length;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      return deleted;
    });
  }
}
