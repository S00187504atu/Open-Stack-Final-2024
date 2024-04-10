export interface CartItem {
    id: number;
    _id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
}

export interface CartState {
    items: CartItem[];
}

export const initialCartState: CartState = {
    items: []
};
