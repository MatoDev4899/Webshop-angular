import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart.mode';
import { CartItem } from 'src/app/shared/models/CartItem.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart([]);
  dataSource: CartItem[] = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService, private http: HttpClient) {}

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

  onCheckout() {
    this.http
      .post('http://localhost:4242/checkout', new Cart(this.cart.items))
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51MuZ1iIht2QILFgeKyc6nPIm3M7cuG6O7CUBxD6XCO1F4ogQnw8fzkFfa8DGzSR5J1r3VCyOGfMXLIt5qkGquRIW00hkQB625m'
        );
        stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      });
  }
}
