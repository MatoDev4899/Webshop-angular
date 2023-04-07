import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { StoreService } from 'src/app/core/services/store.service';
import { Product } from 'src/app/shared/models/Product.model';

const ROWS_HEIGHT: { [id: number]: number } = {
  1: 400,
  3: 335,
  4: 350,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products!: Product[] | undefined;
  sort = 'desc';
  limit = '12';
  private $componentDestroyed: Subject<boolean> = new Subject();

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    console.log(this.category);
  }

  getProducts() {
    this.storeService
      .getAllProducts(this.limit, this.sort, this.category)
      .pipe(takeUntil(this.$componentDestroyed))
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  ngOnDestroy(): void {
    this.$componentDestroyed.next(true);
    this.$componentDestroyed.complete();
  }

  onColumnsCountChange(colsNumber: number): void {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }

  onitemsCountChange(newLimit: number): void {
    this.limit = newLimit.toString();
    this.getProducts();
  }

  onItemsSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
}
