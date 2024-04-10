import { createReducer, on } from '@ngrx/store';
import { CartItem, initialCartState } from './cart.state';
import * as CartActions from './cart.actions';

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.addToCart, (state, { item }) => ({
        ...state,
        items: [...state.items, item]
    })),
    on(CartActions.removeFromCart, (state, { id }) => ({
        ...state,
        items: state.items.filter(item => item.id !== id)
    })),
    on(CartActions.updateCartItem, (state, { id, quantity }) => ({
        ...state,
        items: state.items.map(item => item.id === id ? { ...item, quantity } : item)
    }))
);
