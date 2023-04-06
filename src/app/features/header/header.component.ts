import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart.mode';
import { CartItem } from 'src/app/shared/models/CartItem.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = new Cart([]);
  itemsQuantity = 0;

  @Input()
  get cart() {
    return this._cart;
  }

  set cart(cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}

  getTotal(cartItems: CartItem[]): number {
    return this.cartService.getTotal(cartItems);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
