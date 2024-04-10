import { Injectable } from '@angular/core';
import { CartItem } from '../state/cart.state';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'cart';
  private items: CartItem[];

  constructor() {
    // Load cart data from local storage when the service is initialized
    this.items = JSON.parse(localStorage.getItem(this.cartKey)) || [];
  }

  addToCart(item: CartItem): void {
    const existingItem = this.items.find(i => i._id === item._id);
    if (existingItem) {

      // If item already exists, update its quantity
      existingItem.quantity += item.quantity;
    } else {
      // Otherwise, add the new item to the cart with quantity set to 1
      item.quantity = 1; // Initialize quantity as 1
      this.items.push(item);
    }
    this.saveCart();
  }

  removeFromCart(itemId: number): void {
    this.items = this.items.filter(item => item?._id !== itemId);
    this.saveCart();
  }

  updateQuantity(itemId: number, quantity: number): void {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity = quantity;
      this.saveCart();
    }
  }
  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    // Save updated cart data to local storage
    this.saveCart();
  }

  // Save cart data to local storage
  private saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  public getTotal(): number {
    return this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
