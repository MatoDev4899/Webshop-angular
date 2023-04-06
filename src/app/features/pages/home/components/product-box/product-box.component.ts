import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/models/Product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = new Product(
    1,
    'sneakers',
    150,
    'shoes',
    'Description',
    'https://via.placeholder.com/150'
  );
  @Output() addToCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
