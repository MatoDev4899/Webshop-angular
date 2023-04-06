import { Component, OnInit } from '@angular/core';
import { CartService } from './core/services/cart.service';
import { Cart } from './shared/models/Cart.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cart: Cart = new Cart([]);

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
