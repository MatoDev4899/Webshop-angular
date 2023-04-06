import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart.mode';
import { CartItem } from 'src/app/shared/models/CartItem.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>(new Cart([]));

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open('1 item added to cart', 'Ok', { duration: 2000 });
    console.log(this.cart.value);
  }

  getTotal(cartItems: CartItem[]): number {
    return cartItems
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  clearCart(): void {
    this.cart.next(new Cart([]));
    this._snackBar.open('Cart is cleared', 'Ok', { duration: 2000 });
  }

  removeFromCart(item: CartItem, update: boolean = true) {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );
    if (update) {
      this.cart.next(new Cart(filteredItems));
      this._snackBar.open('Item removed from the cart.', 'Ok', {
        duration: 2000,
      });
    }
    return filteredItems;
  }

  removeQuantity(item: CartItem) {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }
      return _item;
    });
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval);
    }
    this.cart.next(new Cart(filteredItems));
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 20000 });
  }
}
