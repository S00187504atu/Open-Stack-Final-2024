import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/state/cart.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items: any;
  constructor(
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItems();

  }

  getItems() {
    this.items = this.cartService.getItems();
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.id, item.quantity);
      this.getItems();
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.cartService.updateQuantity(item.id, item.quantity);
    this.getItems();

  }

  removeItem(item: any): void {
    this.cartService.removeFromCart(item?._id);
    this.getItems();
  }

  navigateToShopping() {
    this.router.navigateByUrl("/books");
  }

}
