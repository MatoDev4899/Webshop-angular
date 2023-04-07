import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  baseUrl = 'https://fakestoreapi.com';
  constructor(private http: HttpClient) {}

  getAllProducts(
    limit = '12',
    sort = 'desc',
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Array<Product>>(
      `${this.baseUrl}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}&limit=${limit}`
    );
  }

  getCategories(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/categories`);
  }
}
