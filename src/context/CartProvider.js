import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
    showCart: false
};

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            showCart: state.showCart
        };
    }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
            showCart: state.showCart
        };
    }

    if (action.type === 'TOGGLE') {
        return {
            ...state,
            showCart: !state.showCart

        };
    }

    if (action.type === 'RESET') {
        return {
            ...state,
            items: [],
            showCart: false,
            totalAmount: 0
        };
    }


    return defaultCartState;
};



const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    );

    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
    };


    const toggleShowCart = () => {
        dispatchCartAction({ type: 'TOGGLE' });
    };

    const resetCart = () => {
        dispatchCartAction({ type: 'RESET' });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        showCart: cartState.showCart,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        resetCart,
        toggleCart: toggleShowCart
    };

    
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
