import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.state';

export const addToCart = createAction('[Cart] Add to Cart', props<{ item: CartItem }>());
export const removeFromCart = createAction('[Cart] Remove from Cart', props<{ id: number }>());
export const updateCartItem = createAction('[Cart] Update Cart Item', props<{ id: number, quantity: number }>());
