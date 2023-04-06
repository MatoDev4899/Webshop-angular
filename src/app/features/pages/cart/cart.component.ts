import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart.mode';
import { CartItem } from 'src/app/shared/models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart([
    {
      product: 'https://via.placeholder.com/150',
      name: 'adidas',
      price: 120,
      quantity: 1,
      id: 21,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'adidas',
      price: 120,
      quantity: 1,
      id: 21,
    },
  ]);
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(cartItems: CartItem[]): number {
    return this.cartService.getTotal(cartItems);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }
}
